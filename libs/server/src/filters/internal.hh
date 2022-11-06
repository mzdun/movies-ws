// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <date/date.h>

#define RANGE_FILTER(X)         \
	X(year, .info, unsigned)    \
	X(runtime, .info, unsigned) \
	X(rating, .info, unsigned)  \
	X(arrival, , date::sys_seconds)

#define TAGS_FILTER(X) \
	X(genres)          \
	X(countries)       \
	X(age)             \
	X(tags)

#define ON_OFF_FILTER(X) \
	X(available)         \
	X(has_video)         \
	X(has_info)          \
	X(has_imdb)

namespace movies {
	inline unsigned value_of(unsigned v) noexcept {
		return v;
	}

	inline unsigned value_of(date::sys_seconds v) noexcept {
		auto const with_sign = v.time_since_epoch().count();
		if (with_sign < 0) return 0u;
		return static_cast<unsigned>(with_sign);
	}

	template <typename Value>
	struct tag {};

	inline unsigned copy_value(unsigned v, tag<unsigned>) noexcept {
		return v;
	}

	inline date::sys_seconds copy_value(unsigned v,
	                                    tag<date::sys_seconds>) noexcept {
		return date::sys_seconds{std::chrono::seconds{v}};
	}
}  // namespace movies
