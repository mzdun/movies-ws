// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include "tmdb.hh"

using namespace std::literals;

namespace movies {
	tmdb_plugin::tmdb_plugin() : page_link_plugin<>{u8"tmdb"s} {}

	link tmdb_plugin::current_url(string const& id) const {
		return {
		    .href = u8"https://www.themoviedb.org/" + id + u8"/",
		    .icon = u8"local:tmdb",
		    .alt = u8"TMDb",
		    .rel = link::str(link::noreferrer),
		};
	}

	plugin::ptr plugin_tmdb() { return std::make_unique<tmdb_plugin>(); }
}  // namespace movies
