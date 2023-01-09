// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <SQLiteCpp/Transaction.h>
#include <sqlite3.h>
#include <stats/watch_offset.hh>
#include "movie_table.hh"

namespace movies {
	namespace v1 {
		static constexpr std::string_view offset_columns[] = {
		    "id INTEGER NOT NULL REFERENCES movie ON UPDATE CASCADE"sv,
		    "offset INTEGER NOT NULL"sv,
		    "timestamp INTEGER"sv,
		};

		static constexpr std::string_view histogram_columns[] = {
		    "id INTEGER NOT NULL REFERENCES movie ON UPDATE CASCADE"sv,
		    "offset INTEGER NOT NULL"sv,
		    "counter INTEGER NOT NULL"sv,
		    "PRIMARY KEY (id, offset)"sv,
		};

		static constexpr table_def tables[] = {
		    {"movie"sv, movie_columns},
		    {"offset"sv, offset_columns},
		    {"histogram"sv, histogram_columns},
		};
	}  // namespace v1

	bool watch_db::update_schema(unsigned prev_version) {
		try {
			if (prev_version < 1) create_tables(v1::tables);
			return true;
		} catch (std::exception const& ex) {
			std::fprintf(stderr, "watch_db: exception: %s\n", ex.what());
			return false;
		}
	}

	watch_offset watch_db::get_watch_time(std::string const& movie) {
		std::shared_lock lock{mutex()};
		SQLite::Transaction trans{conn()};

		SQLite::Statement cursor{
		    conn(),
		    "SELECT offset, timestamp FROM movie INNER JOIN offset ON "
		    "movie.id=offset.id WHERE movie=?"};
		cursor.bind(1, movie);
		if (!cursor.executeStep()) {
			trans.commit();
			return {};
		}
		auto const offset = cursor.getColumn(0).getUInt();
		auto const timestamp =
		    cursor.getColumn(1).isNull()
		        ? std::nullopt
		        : std::optional{cursor.getColumn(1).getInt64()};
		trans.commit();
		return {
		    .offset = offset,
		    .timestamp = timestamp,
		};
	}

	void watch_db::set_watch_time(std::string const& movie,
	                              watch_offset const& offset) {
		std::lock_guard lock{mutex()};
		SQLite::Transaction trans{conn()};
		// offset
		auto const id = movie_id(movie);

		if (!offset.offset) {
			remove_offset(id);
		} else {
			auto const off = *offset.offset;
			insert_or_update(off, offset.timestamp, id);
			auto const histo = get_histo(id, off) + 1;
			set_histo(id, off, histo);
		}
		trans.commit();
	}

	void watch_db::remove_offset(int64_t id) {
		SQLite::Statement erase{conn(), "DELETE FROM offset WHERE id=?"};
		erase.bind(1, id);
		erase.tryExecuteStep();
	}

	int watch_db::offset_stmt(uint32_t offset,
	                          std::optional<int64_t> const& timestamp,
	                          int64_t id,
	                          const char* sql) {
		SQLite::Statement stmt{conn(), sql};
		stmt.bind(1, offset);
		if (timestamp)
			stmt.bind(2, *timestamp);
		else
			stmt.bind(2);
		stmt.bind(3, id);
		return stmt.exec();
	}

	void watch_db::insert_offset(uint32_t offset,
	                             std::optional<int64_t> const& timestamp,
	                             int64_t id) {
		offset_stmt(offset, timestamp, id,
		            "INSERT OR IGNORE INTO offset (offset, timestamp, id) "
		            "VALUES (?, ?, ?)");
	}

	bool watch_db::update_offset(uint32_t offset,
	                             std::optional<int64_t> const& timestamp,
	                             int64_t id) {
		return offset_stmt(offset, timestamp, id,
		                   "UPDATE OR FAIL offset SET offset=?, timestamp=? "
		                   "WHERE id=?") > 0;
	}

	uint64_t watch_db::get_histo(int64_t id, uint32_t offset) {
		SQLite::Statement stmt{
		    conn(), "SELECT counter FROM histogram WHERE id=? AND offset=?"};
		stmt.bind(1, id);
		stmt.bind(2, offset);
		if (stmt.executeStep()) {
			return std::bit_cast<uint64_t>(stmt.getColumn(0).getInt64());
		}
		return 0;
	}

	void watch_db::set_histo(int64_t id, uint32_t offset, uint64_t counter) {
		auto const sql = counter == 1
		                     ? "INSERT OR IGNORE INTO histogram ("
		                       "offset, counter, id) VALUES (?, ?, ?)"
		                     : "UPDATE OR IGNORE histogram SET offset=?, "
		                       "counter=? WHERE id=?";
		SQLite::Statement stmt{conn(), sql};
		stmt.bind(1, offset);
		stmt.bind(2, std::bit_cast<int64_t>(counter));
		stmt.bind(3, id);
		stmt.exec();
	}
}  // namespace movies