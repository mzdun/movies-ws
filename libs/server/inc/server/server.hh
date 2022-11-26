// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <base/lngs.hh>
#include <filters/filter.hh>
#include <full_text/engine.hh>
#include <server/fs_observer.hh>
#include <server/lngs.hh>
#include <server/plugin.hh>
#include <shared_mutex>
#include <sorting/sort.hh>
#include <span>

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
		                      std::string_view langid,
		                      cover_size = cover_normal);
	};

	struct group {
		std::string id{};
		std::string title{};
		std::vector<reference> items;
	};

	class server : private observer_callback {
	public:
		explicit server(std::filesystem::path const& base);

		void load(std::filesystem::path const& database);
		extended_info find_movie_copy(std::string_view id) const;
		std::vector<reference> get_episodes(
		    std::vector<string> const& episodes) const;
		std::vector<link> links_for(extended_info const&) const;
		std::vector<group> listing(std::string const& search,
		                           filter::list const& filters,
		                           sort::list const& sort,
		                           bool group_items,
		                           bool hide_episodes) const;
		std::vector<description::filter> const& current_filters()
		    const noexcept {
			return current_filters_;
		}
		bool lang_change(std::vector<std::string> const& langs);
		Strings const& tr() const noexcept { return tr_; }
		std::string const& lang_id() const noexcept { return lang_id_; }
		std::filesystem::path const& database() const noexcept {
			return database_;
		}
		void set_on_db_update(
		    std::function<void(bool, std::span<std::string> const&)> const& cb);

	private:
		struct loader {
			movie_db movies{};
			std::vector<description::filter> current_filters{};
			std::map<string, std::string> ref2id{};
			std::string load_async(std::filesystem::path const& database);
		};
		void load_async(bool notify);
		std::vector<std::string> filtered_locked(std::string const& search,
		                                         filter::list const& filters,
		                                         bool hide_episodes) const;
		void sorted_locked(std::vector<std::string>& keys,
		                   sort::list const& sort) const;
		std::vector<group> inflate_locked(std::vector<std::string> const& keys,
		                                  sort const& grouping) const;
		std::vector<group> quick_inflate_locked(
		    std::vector<std::string> const& keys) const;

		// observer_callback
		void on_files_changed();

		mutable std::shared_mutex db_access_{};
		std::function<void(bool, std::span<std::string> const&)>
		    on_db_update_{};
		Strings tr_{};
		movie_db movies_{};
		std::string lang_id_{};
		std::filesystem::path database_{};
		std::vector<description::filter> current_filters_{};
		full_text::engine engine_{};
		std::map<string, std::string> ref2id_{};
		plugin::list plugins_{};
		observer db_observer_{};
	};
}  // namespace movies
