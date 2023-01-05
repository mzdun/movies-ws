// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
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

	std::vector<link> plugin::ref_links(plugin::list const& plugins,
	                                    std::vector<string> const& refs) {
		std::vector<link> result{};
		for (auto const& plugin : plugins) {
			if (!plugin) continue;
			auto links = plugin->ref_links(refs);
			result.insert(result.end(), links.begin(), links.end());
		}
		return result;
	}

	bool plugin::eq(plugin::list const& lhs, plugin::list const& rhs) {
		if (lhs.size() != rhs.size()) return false;
		auto rhs_it = rhs.begin();
		for (auto const& lhs_plugin : lhs) {
			auto const& rhs_plugin = *rhs_it++;
			if (!lhs_plugin->eq(*rhs_plugin)) return false;
		}
		return true;
	}

	page_link_plugin_impl::~page_link_plugin_impl() = default;

	page_link_plugin_impl::page_link_plugin_impl(string&& prefix)
	    : prefix_{std::move(prefix)} {}

	std::vector<link> page_link_plugin_impl::page_links_impl(
	    extended_info const& data) const {
		return ref_links_impl(data.refs);
	}

	std::vector<link> page_link_plugin_impl::ref_links_impl(
	    std::vector<string> const& refs) const {
		std::vector<link> result{};
		for (auto const& ref : refs) {
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
