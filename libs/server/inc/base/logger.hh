// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <fmt/format.h>
#include <source_location>

namespace movies {
	class base_logger {
	public:
		void print(std::string_view prefix,
		           std::string_view postfix,
		           fmt::string_view fmt,
		           fmt::format_args args);
	};

	class logger_t : private base_logger {
	public:
		explicit logger_t(
		    std::source_location loc = std::source_location::current())
		    : loc_{loc} {}

		enum class lvl {
			info,
			warn,
		};

#define ADD_LEVEL(LEVEL)                                         \
	template <typename... T>                                     \
	void LEVEL(fmt::format_string<T...> fmt, T&&... args) {      \
		v##LEVEL(fmt, fmt::make_format_args(args...));           \
	}                                                            \
	void v##LEVEL(fmt::string_view fmt, fmt::format_args args) { \
		vmsg(lvl::LEVEL, fmt, args);                             \
	}
		ADD_LEVEL(info);
		ADD_LEVEL(warn);

	private:
		void vmsg(lvl, fmt::string_view, fmt::format_args);
		std::source_location loc_;
	};

	inline logger_t logger(
	    std::source_location loc = std::source_location::current()) {
		return logger_t{loc};
	}
}  // namespace movies
