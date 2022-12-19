// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <vector>

namespace movies {
	struct link {
		string href;
		std::optional<string> icon;
		std::optional<string> label;
		std::optional<string> alt;
		std::optional<string> rel;

		bool valid() const noexcept {
			return !href.empty() && (icon || label) &&
			       ((icon && !icon->empty()) || (label && !label->empty()));
		}

		static constexpr auto noreferrer = u8"noreferrer"sv;
		inline static string str(std::u8string_view v) {
			return {v.data(), v.size()};
		}
	};

	struct plugin {
		using ptr = std::unique_ptr<plugin>;
		using list = std::vector<ptr>;

		virtual ~plugin();
		virtual std::vector<link> page_links(extended_info const&) const = 0;

		static plugin::list load_plugins();
		static std::vector<link> page_links(plugin::list const&,
		                                    extended_info const&);
	};

	struct page_link_plugin_impl {
		virtual ~page_link_plugin_impl();
		page_link_plugin_impl(string&& prefix);

		std::vector<link> page_links_impl(extended_info const&) const;
		virtual link current_url(string const& id) const = 0;

	private:
		string prefix_;
	};

	template <typename Base = plugin>
	struct page_link_plugin : page_link_plugin_impl, Base {
		template <typename... Args>
		page_link_plugin(string&& prefix, Args&&... args)
		    : page_link_plugin_impl{std::move(prefix)}
		    , Base{std::forward<Args>(args)...} {}

		std::vector<link> page_links(extended_info const& data) const override {
			return page_links_impl(data);
		}
	};
}  // namespace movies
