// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <server/plugin.hh>

namespace movies {
	class imdb_plugin : public page_link_plugin<> {
	public:
		imdb_plugin();

		link current_url(string const& id) const;
	};
}
