// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <server/plugin.hh>

namespace movies {
	class tmdb_plugin : public page_link_plugin<> {
	public:
		tmdb_plugin();

		link current_url(string const& id) const;
	};
}  // namespace movies
