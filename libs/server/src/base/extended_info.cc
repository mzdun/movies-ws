// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <unicode/schriter.h>
#include <base/extended_info.hh>
#include <base/str.hh>

#include <movies/opt.hpp>

namespace movies {
	void title_category::init(title_info const& title,
	                          icu::Normalizer2 const* norm) {
		sortable =
		    icu::UnicodeString::fromUTF8(as_sv(title.sort || title.text));

		if (norm) {
			UErrorCode ec{};
			auto normalized = norm->normalize(sortable, ec);
			if (U_SUCCESS(ec)) sortable = std::move(normalized);
		}

		if (!sortable.isEmpty()) {
			auto firstChar =
			    icu::StringCharacterIterator{sortable, 1}.first32();
			if (u_isdigit(firstChar)) {
				grouping = char_class::digit;
			} else if (u_isalpha(firstChar)) {
				grouping = char_class::letter;
				upper = u_toupper(firstChar);
			}
		}
	}
}  // namespace movies
