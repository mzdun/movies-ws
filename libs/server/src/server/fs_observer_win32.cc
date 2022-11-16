// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX
#include <Windows.h>
#include <tchar.h>
#include <server/fs_observer.hh>

namespace movies {
	namespace {
		class Win32Handle {
		public:
			bool open(std::filesystem::path const& path) {
				static constexpr auto FILE_NOTIFY =
				    FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_DIR_NAME |
				    FILE_NOTIFY_CHANGE_LAST_WRITE | FILE_NOTIFY_CHANGE_CREATION;
				handle_ = FindFirstChangeNotificationW(path.c_str(), TRUE,
				                                       FILE_NOTIFY);

				if (handle_ == INVALID_HANDLE_VALUE) {
					printf(
					    "\n ERROR: FindNextChangeNotification function "
					    "failed.\n");
					return false;
				}

				if (handle_ == NULL) {
					printf(
					    "\n ERROR: Unexpected NULL from "
					    "FindFirstChangeNotification.\n");
					return false;
				}

				return true;
			}

			watch watch_for(std::chrono::milliseconds ms) {
				auto const dwWaitStatus = WaitForMultipleObjects(
				    1, &handle_, FALSE, static_cast<DWORD>(ms.count()));

				switch (dwWaitStatus) {
					case WAIT_OBJECT_0:
						if (FindNextChangeNotification(handle_) == FALSE) {
							printf(
							    "\n ERROR: FindNextChangeNotification "
							    "function "
							    "failed (%08x).\n",
							    GetLastError());
							return watch::error;
						}
						return watch::active;

					case WAIT_TIMEOUT:
						break;

					default:
						printf("\n ERROR: Unhandled dwWaitStatus.\n");
						return watch::error;
				}

				return watch::idle;
			}

		private:
			HANDLE handle_{INVALID_HANDLE_VALUE};
		};
	}  // namespace

	observer_callback::~observer_callback() = default;

	void observer::observe(observer_callback& cb,
	                       std::filesystem::path const& path) {
		observe_impl<Win32Handle>(cb, path);
	}

}  // namespace movies
