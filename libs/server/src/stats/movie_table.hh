// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <sqlite3.h>
#include <stats/sqlite.hh>

using namespace std::literals;

namespace movies::v1 {
	static constexpr std::string_view movie_columns[] = {
	    "id INTEGER PRIMARY KEY NOT NULL"sv,
	    "movie TEXT UNIQUE NOT NULL"sv,
	};
}