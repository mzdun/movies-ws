// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <fmt/format.h>
#include <ranges>
#include <stats/sqlite.hh>

namespace movies {
	bool sqlite::check_schema() {
		auto const prev = get_version();
		if (prev != version_) {
			if (!update_schema(prev)) return false;
			set_version(version_);
		}
		return true;
	}

	unsigned sqlite::get_version() {
		auto const version = conn().execAndGet("PRAGMA user_version").getInt();
		return std::bit_cast<unsigned>(static_cast<int>(version));
	}

	void sqlite::set_version(unsigned ver) {
		conn().exec(fmt::format("PRAGMA user_version={}", ver));
	}

	void sqlite::create_tables(std::span<table_def const> tables) {
		for (auto const& table : tables | std::views::reverse) {
			conn().exec(fmt::format("DROP TABLE IF EXISTS {}", table.name));
		}

		for (auto const& table : tables) {
			auto const sql =
			    fmt::format("CREATE TABLE {} ({})", table.name,
			                fmt::join(table.columns_and_constraints, ", "));
			conn().exec(sql);
		}
	}

	SQLite::Database sqlite::open(std::filesystem::path const& path) {
		std::error_code ignore{};
		std::filesystem::create_directories(path.parent_path(), ignore);
		return {path, SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE};
	}
}  // namespace movies