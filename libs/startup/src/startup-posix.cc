// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <signal.h>  // NOLINT(modernize-deprecated-headers)
#include <cstring>
#include "startup.hh"

std::filesystem::path exec_path() {
	using namespace std::literals;
	std::error_code ec;
	static constexpr std::array self_links = {
	    "/proc/self/exe"sv,
	    "/proc/curproc/file"sv,
	    "/proc/curproc/exe"sv,
	    "/proc/self/path/a.out"sv,
	};
	for (auto path : self_links) {
		auto link = std::filesystem::read_symlink(path, ec);
		if (!ec) return link;
	}
	[[unlikely]];  // GCOV_EXCL_LINE[POSIX]
	return {};     // GCOV_EXCL_LINE[POSIX]
}

static std::function<void()> stop_handler;

void install(int sig, void signal_handler(int)) {
	struct sigaction handler;  // NOLINT(cppcoreguidelines-pro-type-member-init)
	memset(&handler, 0, sizeof(handler));
	handler.sa_handler =  // NOLINT(cppcoreguidelines-pro-type-union-access)
	    signal_handler;
	sigfillset(&handler.sa_mask);
	::sigaction(sig, &handler, nullptr);
}

void setup_breaks(std::function<void()> const& handler) {
	stop_handler = handler;
	auto const c_handler = +[](int) { stop_handler(); };
	install(SIGINT, c_handler);   // ^C
	install(SIGTERM, c_handler);  // docker stop
}
