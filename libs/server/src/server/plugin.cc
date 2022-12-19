// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <server/plugin.hh>

namespace movies {
	plugin::~plugin() = default;

	std::vector<link> plugin::page_links(plugin::list const& plugins,
	                                     extended_info const& data) {
		std::vector<link> result{};
		for (auto const& plugin : plugins) {
			if (!plugin) continue;
			auto links = plugin->page_links(data);
			result.insert(result.end(), links.begin(), links.end());
		}
		return result;
	}

	page_link_plugin_impl::~page_link_plugin_impl() = default;

	page_link_plugin_impl::page_link_plugin_impl(string&& prefix)
	    : prefix_{std::move(prefix)} {}

	std::vector<link> page_link_plugin_impl::page_links_impl(
	    extended_info const& data) const {
		std::vector<link> result{};
		for (auto const& ref : data.refs) {
			if (ref.length() > prefix_.length() && ref.starts_with(prefix_) &&
			    ref[prefix_.length()] == ':') {
				auto id = ref.substr(prefix_.length() + 1);
				auto link = current_url(id);
				if (link.valid()) result.push_back(std::move(link));
			}
		};
		return result;
	}

}  // namespace movies
