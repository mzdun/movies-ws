// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <memory>
#include <server/lngs.hh>

namespace movies {
	namespace description {
		struct range_filter {
			std::string field;
			app::lng label;
			std::optional<std::string> icon;
			unsigned low, high;
			bool is_optional;
			std::variant<unsigned, std::vector<unsigned>> steps;

			bool operator==(range_filter const&) const noexcept = default;
		};

		struct tokens_filter {
			std::string field;
			app::lng label;
			std::optional<std::string> icon;
			std::vector<std::string> values;

			bool operator==(tokens_filter const&) const noexcept = default;
		};

		struct on_off_filter {
			std::string field;
			app::lng label;
			app::lng opposite_label;
			std::optional<std::string> icon;
			bool defaultValue;

			bool operator==(on_off_filter const&) const noexcept = default;
		};

		using filter = std::variant<range_filter, tokens_filter, on_off_filter>;
	}  // namespace description

	class filter {
	public:
		using ptr = std::unique_ptr<filter>;
		using list = std::vector<ptr>;

		virtual ~filter();
		virtual bool matches(extended_info const&) const noexcept = 0;

		static std::vector<description::filter> gather_from_db(movie_db const&);

		static ptr make_term(std::string_view cat, std::string_view term);
		static ptr make_range(std::string_view field,
		                      unsigned low,
		                      unsigned high,
		                      bool include_missing);
		static ptr make_tokens(std::string_view field,
		                       std::vector<std::string>&& tokens);
		static ptr make_on_off(std::string_view field, bool on);

		static bool matches_all(list const&, extended_info const&) noexcept;
	};
}  // namespace movies
