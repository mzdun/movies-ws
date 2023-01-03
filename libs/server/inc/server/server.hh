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
		                      std::span<std::string const> langs,
		                      cover_size = cover_normal);
	};

	struct group {
		std::string id{};
		std::string title{};
		std::vector<reference> items;
	};

	class session_info {
	public:
		using ptr = std::shared_ptr<session_info>;

		explicit session_info(std::filesystem::path const& base);

		bool lang_change(std::vector<std::string> const& langs);
		std::vector<std::string> const& langs() const noexcept {
			return langs_;
		}
		std::string const& lang_id() const noexcept { return lang_id_; }
		Strings const& tr() const noexcept { return tr_; }

		void lock_shared() { tr_access_.lock_shared(); }
		void unlock_shared() { tr_access_.unlock_shared(); }

		static std::vector<std::string> expand(std::span<std::string> langs);

	private:
		mutable std::shared_mutex tr_access_{};
		Strings tr_{};
		std::vector<std::string> langs_{};
		std::string lang_id_{};
	};

	class server : private observer_callback {
	public:
		explicit server(std::string const& title) : title_{title} {}
		void load(std::filesystem::path const& database);
		std::string const& title() const noexcept { return title_; }
		extended_info find_movie_copy(std::string_view id) const;
		std::optional<std::filesystem::path> get_video_path(
		    std::string_view id) const;
		std::vector<reference> get_episodes(
		    std::vector<string> const& episodes,
		    std::span<std::string const> langs) const;
		std::vector<link> links_for(extended_info const&,
		                            Strings const& tr) const;
		std::vector<group> listing(std::string const& search,
		                           filter::list const& filters,
		                           sort::list const& sort,
		                           bool group_items,
		                           bool hide_episodes,
		                           Strings const& tr,
		                           std::span<std::string const> langs) const;
		std::optional<std::string> filter_title(
		    filter* filter,
		    std::string const& term,
		    app::Strings const& tr,
		    region::Strings const& region) const;
		std::vector<description::filter> const& current_filters()
		    const noexcept {
			return current_filters_;
		}
		std::filesystem::path const& database() const noexcept {
			return database_;
		}
		void set_on_db_update(
		    std::function<void(bool, std::span<std::string> const&)> const& cb);

	private:
		struct loader {
			movie_db db{};
			std::vector<description::filter> current_filters{};
			std::map<string, std::string> ref2id{};
			std::string load_async(std::filesystem::path const& database);
		};
		void load_async(bool notify);
		std::vector<std::string> filtered_locked(std::string const& search,
		                                         filter::list const& filters,
		                                         bool hide_episodes) const;
		void sorted_locked(std::vector<std::string>& keys,
		                   sort::list const& sort,
		                   std::span<std::string const> langs) const;
		std::vector<group> inflate_locked(
		    std::vector<std::string> const& keys,
		    sort const& grouping,
		    Strings const& tr,
		    std::span<std::string const> langs) const;
		std::vector<group> quick_inflate_locked(
		    std::vector<std::string> const& keys,
		    std::span<std::string const> langs) const;

		// observer_callback
		void on_files_changed();

		mutable std::shared_mutex db_access_{};
		std::function<void(bool, std::span<std::string> const&)>
		    on_db_update_{};
		movie_db movies_{};
		std::filesystem::path database_{};
		std::vector<description::filter> current_filters_{};
		full_text::engine engine_{};
		std::map<string, std::string> ref2id_{};
		plugin::list plugins_{};
		observer db_observer_{};
		std::string title_{};
	};
}  // namespace movies
