// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <unicode/normalizer2.h>
#include <unicode/unistr.h>
#include <movies/movie_info.hpp>

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

	struct extended_info : loaded_movie {
		bool is_episode{false};
		bool is_extra{false};
		bool episodes_have_videos{false};
		bool extras_have_videos{false};
		std::string parent_id{};
		std::optional<date::sys_seconds> arrival{};
		translatable<title_category> title_cat{};
		std::vector<std::string> local_people_refs{};

		struct link {
			std::string id{};
			translatable<string_type> title{};

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

	struct movie_info_refs {
		string_type name;
		std::vector<string_type> external_ids;
		std::vector<std::string> movies;

		auto operator<=>(movie_info_refs const&) const noexcept = default;
	};

	struct movie_db {
		std::map<std::string, extended_info, std::less<>> movies;
		std::map<std::string, movie_info_refs> people;
		bool operator==(movie_db const&) const noexcept = default;
	};
}  // namespace movies
