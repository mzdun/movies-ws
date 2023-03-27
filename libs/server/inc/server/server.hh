// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <base/lngs.hh>
#include <filters/filter.hh>
#include <full_text/engine.hh>
#include <movies/movie_info.hpp>
#include <server/fs_observer.hh>
#include <server/lngs.hh>
#include <server/plugin.hh>
#include <shared_mutex>
#include <sorting/sort.hh>
#include <source_location>
#include <span>
#include <stats/video_info.hh>
#include <stats/watch_offset.hh>

namespace movies {
	struct server_cfg : movies_config {
		std::string prefix;
		std::filesystem::path common_dir;
		std::filesystem::path plugins;
		std::filesystem::path watch_db;
		std::filesystem::path video_info_db;
		void read(std::filesystem::path const& config_filename);
	};
	struct reference {
		enum cover_size {
			cover_normal = true,
			cover_small = false,
		};
		std::string id{};
		string_type title{};
		std::optional<string_type> cover{};
		bool has_video{false};
		std::vector<string_type> tags;
		std::vector<string_type> age_rating;
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

		static std::string invent_id();
		std::string const& client_id() const noexcept { return client_id_; }
		void client_id(std::string const& id) { client_id_ = id; }

	private:
		mutable std::shared_mutex tr_access_{};
		Strings tr_{};
		std::vector<std::string> langs_{};
		std::string lang_id_{};
		std::string client_id_{};
	};

	class server : public std::enable_shared_from_this<server>,
	               private observer_callback {
	public:
		explicit server(server_cfg const& configuration)
		    : configuration_{configuration}
		    , watch_offsets_{configuration.watch_db}
		    , video_info_{configuration.video_info_db} {}
		void load();
		extended_info find_movie_copy(std::string_view id) const;
		std::optional<std::filesystem::path> get_video_resource(
		    std::string_view id) const;
		std::vector<reference> get_episodes(
		    std::vector<string_type> const& episodes,
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
		std::pair<std::optional<std::string>, std::vector<link>> filter_info(
		    filter* filter,
		    std::string const& term,
		    app::Strings const& tr,
		    region::Strings const& region) const;
		std::vector<description::filter> const& current_filters()
		    const noexcept {
			return current_filters_;
		}
		std::string_view title() const noexcept {
			return as_ascii_view(configuration_.title);
		}
		fs::path const& videos_dir() const noexcept {
			return configuration_.dirs.videos;
		}
		void set_on_db_update(
		    std::function<void(bool,
		                       std::span<std::string> const&,
		                       std::source_location const&)> const& cb);
		watch_offset get_watch_time(std::string const& movie);
		void set_watch_time(std::string const& movie,
		                    watch_offset const& offset);
		video_info get_video_info(std::string const& movie);
		void set_video_info(std::string const& movie, video_info const& info);

	private:
		struct loader {
			plugin::list plugins{};
			movie_db db{};
			std::vector<description::filter> current_filters{};
			std::map<string_type, std::string> ref2id{};
			std::string load_async(server_cfg const& configuration);
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
		std::function<void(bool,
		                   std::span<std::string> const&,
		                   std::source_location const&)>
		    on_db_update_{};
		movie_db movies_{};
		server_cfg configuration_{};
		std::vector<description::filter> current_filters_{};
		full_text::engine engine_{};
		std::map<string_type, std::string> ref2id_{};
		plugin::list plugins_{};
		observer db_observer_{};
		watch_db watch_offsets_;
		video_info_db video_info_;
	};
}  // namespace movies
