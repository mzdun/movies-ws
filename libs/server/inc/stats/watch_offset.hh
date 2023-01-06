// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <optional>
#include <stats/sqlite.hh>

namespace movies {
	struct watch_offset {
		std::optional<uint32_t> offset{};
		std::optional<int64_t> timestamp{};

		explicit operator bool() const noexcept {
			return !(!offset && !timestamp);
		}
	};

	class watch_db final : sqlite {
	public:
		explicit watch_db(std::filesystem::path const& path) : sqlite{path, 1} {
			check_schema();
		}

		watch_offset get_watch_time(std::string const& movie);
		void set_watch_time(std::string const& movie,
		                    watch_offset const& offset);

	private:
		bool update_schema(unsigned prev_version) override;
		void remove_offset(int64_t id);
		void insert_or_update(uint32_t offset,
		                      std::optional<int64_t> const& timestamp,
		                      int64_t id) {
			if (update_offset(offset, timestamp, id)) return;
			insert_offset(offset, timestamp, id);
		}
		int offset_stmt(uint32_t offset,
		                std::optional<int64_t> const& timestamp,
		                int64_t id,
		                const char* sql);
		bool update_offset(uint32_t offset,
		                   std::optional<int64_t> const& timestamp,
		                   int64_t id);
		void insert_offset(uint32_t offset,
		                   std::optional<int64_t> const& timestamp,
		                   int64_t id);
		uint64_t get_histo(int64_t id, uint32_t offset);
		void set_histo(int64_t id, uint32_t offset, uint64_t counter);
	};
}  // namespace movies
