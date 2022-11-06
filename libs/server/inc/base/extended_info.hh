// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <unicode/normalizer2.h>
#include <unicode/unistr.h>
#include <movies/loader.hpp>

namespace movies {
	enum class char_class {
		digit,
		letter,
		other,
	};

	struct title_category {
		icu::UnicodeString sortable{};
		char_class grouping{char_class::other};
		UChar32 upper{};

		void init(title_info const&, icu::Normalizer2 const*);
	};

	struct extended_info : movie_data {
		bool is_episode{false};
		bool episodes_have_videos{false};
		std::string series_id{};
		dates_info::opt_seconds arrival{};
		title_category title{};
	};

	using movie_db = std::map<std::string, extended_info, std::less<>>;
}  // namespace movies
