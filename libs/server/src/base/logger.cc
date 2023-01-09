// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <fmt/chrono.h>
#include <base/logger.hh>
#include <base/logger_dir.hh>

#ifdef _WIN32
#define NOMINMAX
#include <Windows.h>
using pid_t = DWORD;
inline pid_t gettid() noexcept {
	return GetCurrentThreadId();
}
#else
#include <sys/types.h>
#include <unistd.h>
#endif

namespace movies {
	static consteval int width_from(auto value) {
		if (!value) return 0;
		int result = 0;
		while (value) {
			result++;
			value /= 10;
		}
		return result - 1;
	}

	void base_logger::print(std::string_view prefix,
	                        std::string_view postfix,
	                        fmt::string_view fmt,
	                        fmt::format_args args) {
		fmt::memory_buffer buffer;
		auto it = std::back_inserter(buffer);

		using namespace std::chrono;
		auto const now = floor<milliseconds>(system_clock::now());
		using period = decltype(now)::duration::period;
		auto const subseconds = now.time_since_epoch().count() % period::den;
		static constexpr auto width = width_from(period::den);

		it = fmt::format_to(it, "{:%Y-%m-%d %H:%M:%S}.{:0{}} (thread {}) {} ",
		                    now, subseconds, width, gettid(), prefix);
		it = fmt::vformat_to(it, fmt, args);
		it = fmt::format_to(it, "{}\n", postfix);
		*it++ = '\0';

		std::fputs(buffer.data(), stdout);
		std::fflush(stdout);
	}

	void logger_t::vmsg(lvl level,
	                    fmt::string_view fmt,
	                    fmt::format_args args) {
		char level_name = ' ';
		switch (level) {
			case lvl::info:
				level_name = 'I';
				break;
			case lvl::warn:
				level_name = 'W';
				break;
		}
		print(fmt::format("{}: [{}:{}]", level_name,
		                  loc_.file_name() + src_dir.length(), loc_.line()),
		      {}, fmt, args);
	}
}  // namespace movies
