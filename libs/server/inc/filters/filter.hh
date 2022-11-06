// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <memory>

namespace movies {
	namespace description {
		struct range_filter {
			enum format { num, year, minute_time, rating };
			std::string field;
			std::string label;
			std::optional<std::string> icon;
			format type;
			unsigned low, high;
			bool is_optional;
			std::variant<unsigned, std::vector<unsigned>> steps;
		};

		struct tokens_filter {
			enum format { str, country, tags };
			std::string field;
			std::string label;
			std::optional<std::string> icon;
			format type;
			std::vector<std::string> values;
		};

		struct on_off_filter {
			std::string field;
			std::string label;
			std::optional<std::string> icon;
			bool defaultValue;
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

		static ptr make_range(std::string_view field,
		                      unsigned low,
		                      unsigned high,
		                      bool include_missing);
		static ptr make_on_off(std::string_view field, bool on);

		static bool matches_all(list const&, extended_info const&) noexcept;
	};
}  // namespace movies
