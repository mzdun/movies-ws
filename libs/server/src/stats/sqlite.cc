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

	std::optional<int64_t> sqlite::check_movie_id(std::string const& movie) {
		SQLite::Statement stmt{conn(), "SELECT id FROM movie WHERE movie=?"};
		stmt.bind(1, movie);
		if (stmt.executeStep()) {
			return stmt.getColumn(0).getInt64();
		}

		return std::nullopt;
	}

	int64_t sqlite::movie_id(std::string const& movie) {
		auto opt = check_movie_id(movie);
		if (opt) return *opt;

		SQLite::Statement stmt{conn(),
		                       "INSERT OR FAIL INTO movie (movie) VALUES (?)"};
		stmt.bind(1, movie);
		stmt.exec();
		return conn().getLastInsertRowid();
	}

	SQLite::Database sqlite::open(std::filesystem::path const& path) {
		std::error_code ignore{};
		std::filesystem::create_directories(path.parent_path(), ignore);
		return {path, SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE};
	}
}  // namespace movies