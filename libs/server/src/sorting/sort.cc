// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <sorting/sort.hh>

using namespace std::literals;

namespace movies {
	sort::~sort() = default;

	int sort::compare(list const& items,
	                  std::string const& lhs_id,
	                  std::string const& rhs_id,
	                  movie_db const& db,
	                  std::span<std::string const> langs) noexcept {
		auto lhs_it = db.movies.find(lhs_id);
		auto rhs_it = db.movies.find(rhs_id);
		if (lhs_it == db.movies.end()) {
			return rhs_it == db.movies.end() ? 0 : 1;
		}
		if (rhs_it == db.movies.end()) return -1;

		auto const& lhs = lhs_it->second;
		auto const& rhs = rhs_it->second;

		for (auto const& item : items) {
			auto const result = item->compare(lhs, rhs, langs);
			if (result) return result;
		}

		return 0;
	}
}  // namespace movies
