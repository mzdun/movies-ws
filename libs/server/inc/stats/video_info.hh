// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <optional>
#include <stats/sqlite.hh>
#include <vector>
#include <movies/movie_info.hpp>

namespace movies {
	class video_info_db final : sqlite {
	public:
		explicit video_info_db(std::filesystem::path const& path)
		    : sqlite{path, 1} {
			check_schema();
		}

		video_info get_video_info(std::string const& movie);
		void set_video_info(std::string const& movie, video_info const& info);

	private:
		bool update_schema(unsigned prev_version) override;
		video_info get_info(int64_t);
		std::vector<video_marker> get_markers(int64_t);
		void insert_or_update(std::optional<uint32_t> const& credits,
		                      std::optional<uint32_t> const& end_of_watch,
		                      int64_t id) {
			if (!credits && !end_of_watch) {
				remove_offsets(id);
				return;
			}
			if (update_offsets(credits, end_of_watch, id)) return;
			insert_offsets(credits, end_of_watch, id);
		}
		int offsets_stmt(std::optional<uint32_t> const& credits,
		                 std::optional<uint32_t> const& end_of_watch,
		                 int64_t id,
		                 const char* sql);
		void remove_offsets(int64_t id);
		bool update_offsets(std::optional<uint32_t> const& credits,
		                    std::optional<uint32_t> const& end_of_watch,
		                    int64_t id);
		void insert_offsets(std::optional<uint32_t> const& credits,
		                    std::optional<uint32_t> const& end_of_watch,
		                    int64_t id);
		void set_markers(int64_t id, std::vector<video_marker> const& markers);
	};
}  // namespace movies
