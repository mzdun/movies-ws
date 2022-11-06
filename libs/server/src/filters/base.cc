// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <filters/filter.hh>
#include "internal.hh"

namespace movies {
	filter::~filter() = default;

	bool filter::matches_all(list const& filters,
	                         extended_info const& data) noexcept {
		for (auto const& flt : filters) {
			if (flt && !flt->matches(data)) return false;
		}

		return true;
	}
}  // namespace movies
