// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <date/date.h>
#include <server/lngs.hh>

#define RANGE_FILTER(X)                                    \
	X(year, unsigned, lng::FILTER_LABEL_YEAR)       \
	X(runtime, unsigned, lng::FILTER_LABEL_RUNTIME) \
	X(rating, unsigned, lng::FILTER_LABEL_RATING)   \
	X(arrival, date::sys_seconds, lng::FILTER_LABEL_ARRIVAL)

#define TOKEN_FILTER(X)                       \
	X(genres, lng::FILTER_LABEL_GENRES)       \
	X(countries, lng::FILTER_LABEL_COUNTRIES) \
	X(age, lng::FILTER_LABEL_AGE)             \
	X(tags, lng::FILTER_LABEL_TAGS)

#define ON_OFF_FILTER(X)                      \
	X(available, lng::FILTER_LABEL_AVAILABLE) \
	X(is_series, lng::FILTER_LABEL_IS_SERIES) \
	X(has_video, lng::FILTER_LABEL_HAS_VIDEO) \
	X(has_info, lng::FILTER_LABEL_HAS_INFO)   \
	X(has_imdb, lng::FILTER_LABEL_HAS_IMDB)

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
