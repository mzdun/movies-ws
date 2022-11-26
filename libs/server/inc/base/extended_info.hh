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

		bool operator==(title_category const&) const noexcept = default;

		void init(title_info const&, icu::Normalizer2 const*);
	};

	struct extended_info : movie_data {
		bool is_episode{false};
		bool episodes_have_videos{false};
		std::string series_id{};
		dates_info::opt_seconds arrival{};
		translatable<title_category> title_cat{};

		struct link {
			std::string id{};
			translatable<string> title{};

			bool operator==(link const&) const noexcept = default;
		} prev, next;
		enum link_flags_t {
			has_none,
			has_prev,
			has_next,
			has_both,
		} link_flags{has_none};

		bool operator==(extended_info const&) const noexcept = default;
	};

	using movie_db = std::map<std::string, extended_info, std::less<>>;
}  // namespace movies
