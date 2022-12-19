// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <server/fs_observer.hh>

#include <fcntl.h>
#include <linux/types.h>
#include <sys/inotify.h>
#include <sys/ioctl.h>
#include <sys/syscall.h>
#include <unistd.h>
#include <deque>
#include <map>
#include <vector>

// define PRINT_CHANGES

namespace fs = std::filesystem;
using namespace std::literals;

namespace movies {
	namespace {
		class InotifyHandle {
		public:
			InotifyHandle() {
#if defined(IN_CLOEXEC)
				fd_ = inotify_init1(IN_CLOEXEC);
#endif
				if (fd_ < 0) {
					fd_ = inotify_init();
					if (fd_ < 0) return;
				}
				fcntl(fd_, F_SETFD, FD_CLOEXEC);
			}
			InotifyHandle(InotifyHandle const&) = delete;
			InotifyHandle(InotifyHandle&&) = delete;
			void operator=(InotifyHandle const&) = delete;
			void operator=(InotifyHandle&&) = delete;

			~InotifyHandle() {
				if (fd_ >= 0) ::close(fd_);
			}

			bool open(fs::path const& path) {
				if (fd_ < 0) return false;

				add_directory(path);
				return true;
			}

			watch watch_for(std::chrono::milliseconds ms) {
				using namespace std::chrono;
				auto const sec = floor<seconds>(ms);
				microseconds us{ms - sec};

				struct  // NOLINT(cppcoreguidelines-pro-type-member-init)
				    timeval read_timeout;
				read_timeout.tv_sec = sec.count();
				read_timeout.tv_usec = us.count();
				fd_set read_fds{};

				FD_ZERO(&read_fds);  // NOLINT(readability-isolate-declaration)
				FD_SET(fd_, &read_fds);
				auto rc =
				    select(fd_ + 1, &read_fds, nullptr, nullptr, &read_timeout);
				if (rc < 0) return watch::error;
				if (rc == 0) return watch::idle;

				unsigned int bytes_to_read{0};
				do {
					rc = ioctl(fd_, FIONREAD, &bytes_to_read);
				} while (!rc && bytes_to_read < sizeof(inotify_event));

				if (rc == -1) {
					return watch::error;
				}

				std::vector<char> buffer(bytes_to_read);
				auto this_bytes = read(fd_, buffer.data(), buffer.size());
				if (this_bytes < 0) return watch::error;
				if (this_bytes == 0) return watch::idle;

				size_t interpreted = 0;
				auto const sized_current = static_cast<size_t>(this_bytes);
				auto idle = true;
				while (interpreted < sized_current) {
					if ((sized_current - interpreted) < sizeof(inotify_event))
						break;
					auto& event = *reinterpret_cast<inotify_event*>(
					    buffer.data() + interpreted);
					if ((sized_current - interpreted - sizeof(inotify_event)) <
					    event.len)
						break;
					interpreted += sizeof(inotify_event) + event.len;

					if (((event.mask & (IN_CREATE | IN_ISDIR)) ==
					     (IN_CREATE | IN_ISDIR)) ||
					    ((event.mask & (IN_MOVED_TO | IN_ISDIR)) ==
					     (IN_MOVED_TO | IN_ISDIR))) {
						add_directory(event.wd, {event.name, event.len});
						idle = false;
					} else if ((event.mask & (IN_MOVED_FROM | IN_ISDIR)) ==
					           (IN_MOVED_FROM | IN_ISDIR)) {
						remove_directory(event.wd, {event.name, event.len});
						idle = false;
					} else if ((event.mask & IN_DELETE_SELF) ==
					           IN_DELETE_SELF) {
						remove_directory(event.wd);
						idle = false;
					} else if ((event.mask & IN_IGNORED) == IN_IGNORED) {
						// pass
					} else {
#if defined(PRINT_CHANGES)
#define TEST(BIT)                                    \
	if (mask & IN_##BIT) {                           \
		if (!mask_s.empty()) mask_s.append(" | "sv); \
		mask_s.append(#BIT##sv);                     \
	}

						std::string mask_s{};
						auto mask = event.mask;

						if (mask == 0) mask_s.assign("0"sv);

						TEST(ACCESS);
						TEST(ATTRIB);
						TEST(CLOSE_WRITE);
						TEST(CLOSE_NOWRITE);
						TEST(CREATE);
						TEST(DELETE);
						TEST(DELETE_SELF);
						TEST(MODIFY);
						TEST(MOVE_SELF);
						TEST(MOVED_FROM);
						TEST(MOVED_TO);
						TEST(OPEN);
						TEST(IGNORED);
						TEST(ISDIR);
						TEST(Q_OVERFLOW);
						TEST(UNMOUNT);

						fprintf(
						    stderr,
						    "bytes:%lu/%u/%zu wd:%d mask:%s cookie:%x len:%u "
						    "%.*s\n",
						    this_bytes, bytes_to_read,
						    sizeof(inotify_event) + event.len, event.wd,
						    mask_s.c_str(), event.cookie, event.len,
						    static_cast<int>(event.len), event.name);
#endif
						idle = false;
					}
				}

				return idle ? watch::idle : watch::active;
			}

		private:
			void add_directory(int wd, std::string_view sub) {
				while (!sub.empty() && sub.back() == 0)
					sub = sub.substr(0, sub.length() - 1);
				if (sub.empty()) return;
				auto it = observed_ids_.find(wd);
				if (it == observed_ids_.end()) return;
				add_directory(it->second / sub);
			}

			void add_directory(fs::path const& path) {
				std::deque<fs::path> directories{path};

				while (!directories.empty()) {
					auto dirname = directories.front();
					directories.pop_front();

					{
						auto it = observed_.find(dirname);
						if (it != observed_.end()) continue;
					}

					{
						std::error_code ec{};
						fs::directory_iterator dir{dirname, ec};
						if (!ec) {
							for (auto const& entry : dir) {
								if (!entry.is_directory()) continue;
								directories.push_back(entry);
							}
						}
					}

					auto const u8path = dirname.generic_u8string();
					auto const wd = inotify_add_watch(
					    fd_, reinterpret_cast<char const*>(u8path.c_str()),
					    IN_ATTRIB | IN_MOVED_FROM | IN_MOVED_TO | IN_CREATE |
					        IN_DELETE | IN_CLOSE_WRITE | IN_DELETE_SELF);

					if (wd < 0) continue;

#if defined(PRINT_CHANGES)
					printf("+++ %d: \"%s\"\n", wd, dirname.string().c_str());
#endif
					observed_ids_[wd] = dirname;
					observed_[dirname] = wd;
				}
			}

			void remove_directory(int wd) {
				auto it = observed_ids_.find(wd);
				if (it == observed_ids_.end()) return;
				remove_directory(it->second);
			}

			void remove_directory(int wd, std::string_view sub) {
				while (!sub.empty() && sub.back() == 0)
					sub = sub.substr(0, sub.length() - 1);
				if (sub.empty()) return;
				auto it = observed_ids_.find(wd);
				if (it == observed_ids_.end()) return;
				remove_directory(it->second / sub);
			}

			void remove_directory(fs::path const& path) {
				std::deque<fs::path> directories{path};

				while (!directories.empty()) {
					auto dirname = directories.front();
					directories.pop_front();

					auto it = observed_.find(dirname);
					if (it == observed_.end()) continue;

#if defined(PRINT_CHANGES)
					printf("--- %d: \"%s\"\n", it->second,
					       dirname.string().c_str());
#endif

					inotify_rm_watch(fd_, it->second);
					observed_ids_.erase(it->second);
					observed_.erase(it);

					for (auto const& [subdir, _] : observed_) {
						if (!subdir.native().starts_with(dirname.native()))
							continue;
						if (subdir.native().length() ==
						    dirname.native().length())
							continue;
						if (subdir.native()[dirname.native().length()] != '/')
							continue;

						directories.push_back(subdir);
					}
				}
			}

			int fd_{-1};
			std::map<int, fs::path> observed_ids_{};
			std::map<fs::path, int> observed_{};
		};
	}  // namespace

	observer_callback::~observer_callback() = default;
	void observer::observe(observer_callback& cb, fs::path const& path) {
		observe_impl<InotifyHandle>(cb, path);
	}
}  // namespace movies
