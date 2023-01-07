// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <optional>
#include <stats/sqlite.hh>
#include <vector>

namespace movies {
#define MARKER_TYPE_X(X)           \
	X(other, Other)                \
	X(recap, Recap)                \
	X(credits, Credits)            \
	X(credits_scene, CreditsScene) \
	X(chapter, Chapter)

	struct marker {
		enum class type {
#define MARKER_TYPE_X_DECL_TYPE(NAME, _) NAME,
			MARKER_TYPE_X(MARKER_TYPE_X_DECL_TYPE)
#undef MARKER_TYPE_X_DECL_TYPE
		};

		type kind{type::other};
		std::optional<uint32_t> start{};
		std::optional<uint32_t> stop{};
		std::optional<std::string> comment{};

		bool operator==(marker const&) const noexcept = default;
		auto operator<=>(marker const& rhs) const noexcept {
			if (auto comp = start <=> rhs.start; comp != 0) return comp;
			if (auto comp = stop <=> rhs.stop; comp != 0) return comp;
			if (auto comp = kind <=> rhs.kind; comp != 0) return comp;
			return comment <=> rhs.comment;
		}

		explicit operator bool() const noexcept {
			return !(!start && !comment && (!comment || comment->empty()));
		}
	};

	struct video_info {
		std::optional<uint32_t> credits{};
		std::optional<uint32_t> end_of_watch{};
		std::vector<marker> markers{};

		explicit operator bool() const noexcept {
			return !(!credits && !end_of_watch && !has_a_valid_marker());
		}

		bool has_a_valid_marker() const noexcept {
			for (auto const& marker : markers) {
				if (marker) return true;
			}
			return false;
		}
	};

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
		std::vector<marker> get_markers(int64_t);
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
		void set_markers(int64_t id, std::vector<marker> const& markers);
	};
}  // namespace movies
