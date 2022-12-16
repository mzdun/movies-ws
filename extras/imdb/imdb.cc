// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include "imdb.hh"

using namespace std::literals;

#define LINK(CAT, VAR)                                              \
	{                                                               \
		.href = u8"https://www.imdb.com/" #CAT "/" + (VAR) + u8"/", \
		.icon = u8"local:imdb", .alt = u8"IMDb",                    \
		.rel = link::str(link::noreferrer),                         \
	}

namespace movies {
	imdb_plugin::imdb_plugin() : page_link_plugin<>{u8"imdb"s} {}

	link imdb_plugin::current_url(string const& id) const {
		if (id.length() > 2) {
			if (id[0] == 'n' && id[1] == 'm') return LINK(name, id);
			if (id[0] == 't' && id[1] == 't') return LINK(title, id);
		}
		return {};
	}

	plugin::ptr plugin_imdb() { return std::make_unique<imdb_plugin>(); }
}  // namespace movies
