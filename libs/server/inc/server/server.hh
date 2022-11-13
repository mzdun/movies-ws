// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <base/lngs.hh>
#include <filters/filter.hh>
#include <full_text/engine.hh>
#include <server/lngs.hh>
#include <server/plugin.hh>
#include <sorting/sort.hh>

namespace movies {
	struct reference {
		enum cover_size {
			cover_normal = true,
			cover_small = false,
		};
		std::string id{};
		string title{};
		std::optional<string> cover{};
		bool has_video{false};
		vector<string> tags;
		vector<string> age_rating;
		std::string sort_hint;

		static reference from(std::string const&,
		                      extended_info const&,
		                      std::string&& sort_hint,
		                      cover_size = cover_normal);
	};

	struct group {
		std::string id{};
		std::string title{};
		std::vector<reference> items;
	};

	class server {
	public:
		explicit server(std::filesystem::path const& base);

		void load(std::filesystem::path const& database);
		extended_info find_movie_copy(std::string_view id) const;
		std::vector<reference> get_episodes(
		    std::vector<string> const& episodes) const;
		std::vector<link> links_for(extended_info const&) const;
		std::vector<group> listing(std::string const& search,
		                           filter::list const& filters,
		                           sort::list const& sort) const;
		std::vector<description::filter> const& current_filters()
		    const noexcept {
			return current_filters_;
		}
		bool lang_change(std::vector<std::string> const& langs);
		Strings const& tr() const noexcept { return tr_; }
		std::string const& lang_id() const noexcept { return lang_id_; }

	private:
		std::vector<std::string> filtered(std::string const& search,
		                                  filter::list const& filters) const;
		void sorted(std::vector<std::string>& keys,
		            sort::list const& sort) const;
		std::vector<group> inflate(std::vector<std::string> const& keys,
		                           sort const& grouping) const;
		std::vector<group> quick_inflate(
		    std::vector<std::string> const& keys) const;

		Strings tr_{};
		movie_db movies_{};
		std::string lang_id_{};
		std::vector<description::filter> current_filters_{};
		full_text::engine engine_{};
		std::map<string, std::string> ref2id_{};
		plugin::list plugins_{};
	};
}  // namespace movies
