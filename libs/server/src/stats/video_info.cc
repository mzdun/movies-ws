// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <SQLiteCpp/Transaction.h>
#include <sqlite3.h>
#include <base/str.hh>
#include <stats/video_info.hh>
#include "movie_table.hh"

namespace movies {
	namespace {
		std::optional<uint32_t> opt_uint(SQLite::Column const& col) {
			if (col.isNull()) return std::nullopt;
			return col.getUInt();
		}

		std::optional<std::u8string> opt_u8string(SQLite::Column const& col) {
			if (col.isNull()) return std::nullopt;
			auto const str = col.getString();
			auto const view = as_u8v(str);
			return std::u8string{view.data(), view.length()};
		}

		template <typename Payload>
		void bind(SQLite::Statement& stmt,
		          int index,
		          std::optional<Payload> const& value) {
			if (value)
				stmt.bind(index, *value);
			else
				stmt.bind(index);
		}

		template <typename... Args>
		void bind(
		    SQLite::Statement& stmt,
		    int index,
		    std::optional<std::basic_string<char8_t, Args...>> const& value) {
			if (value)
				stmt.bind(index, as_sv(*value).data());
			else
				stmt.bind(index);
		}
	}  // namespace

	namespace v1 {
		static constexpr std::string_view marker_type_columns[] = {
		    "id INTEGER PRIMARY KEY NOT NULL"sv,
		    "name TEXT UNIQUE NOT NULL"sv,
		};

		static constexpr std::string_view info_columns[] = {
		    "id INTEGER NOT NULL REFERENCES movie ON UPDATE CASCADE"sv,
		    "credits_offset INTEGER"sv,
		    "end_of_watch_offset INTEGER"sv,
		};

		static constexpr std::string_view marker_columns[] = {
		    "id INTEGER NOT NULL REFERENCES movie ON UPDATE CASCADE"sv,
		    "type INTEGER NOT NULL REFERENCES type (id) ON UPDATE CASCADE"sv,
		    "start INTEGER"sv,
		    "stop INTEGER"sv,
		    "comment TEXT"sv,
		};

		static constexpr table_def tables[] = {
		    {"movie"sv, movie_columns},
		    {"marker_type"sv, marker_type_columns},
		    {"info"sv, info_columns},
		    {"marker"sv, marker_columns},
		};

		struct marker_type_str {
			marker_type type;
			std::string_view name;
		};
#define MARKER_TYPE(NAME) \
	{ marker_type::NAME, #NAME##sv }
		static constexpr marker_type_str marker_types[] = {
		    MARKER_TYPE(bookmark), MARKER_TYPE(recap),
		    MARKER_TYPE(credits),  MARKER_TYPE(credits_scene),
		    MARKER_TYPE(chapter),
		};
	}  // namespace v1

	namespace {
		consteval bool has_key_for(marker_type kind) {
			for (auto const& [type, _] : v1::marker_types) {
				if (type == kind) return true;
			}
			// future: for type in v2::marker_type...
			return false;
		}

#define X_HAS_KEY_FOR(TYPE) has_key_for(marker_type::TYPE)&&
		static_assert(VIDEO_MARKER_TYPE_X(X_HAS_KEY_FOR) true,
		              "a key is missing from marker_types");
#undef X_HAS_KEY_FOR
	}  // namespace

	bool video_info_db::update_schema(unsigned prev_version) {
		try {
			if (prev_version < 1) {
				create_tables(v1::tables);

				SQLite::Statement types{
				    conn(), "INSERT INTO marker_type(id, name) VALUES (?, ?)"};

				for (auto const [id, name] : v1::marker_types) {
					types.reset();
					types.bind(1, std::to_underlying(id));
					types.bind(2, name.data());
					types.exec();
				}
			}
			return true;
		} catch (std::exception const& ex) {
			std::fprintf(stderr, "skip_markers_db: exception: %s\n", ex.what());
			return false;
		}
	}

	video_info video_info_db::get_video_info(std::string const& movie) {
		std::shared_lock lock{mutex()};
		SQLite::Transaction trans{conn()};

		auto opt = check_movie_id(movie);
		if (!opt) {
			trans.commit();
			return {};
		}

		auto const id = *opt;
		auto result = get_info(id);
		result.markers = get_markers(id);

		trans.commit();
		return result;
	}

	void video_info_db::set_video_info(std::string const& movie,
	                                   video_info const& info) {
		std::shared_lock lock{mutex()};
		SQLite::Transaction trans{conn()};

		auto const id = movie_id(movie);
		insert_or_update(info.credits, info.end_of_watch, id);
		set_markers(id, info.markers);

		trans.commit();
	}

	video_info video_info_db::get_info(int64_t id) {
		SQLite::Statement cursor{
		    conn(),
		    "SELECT credits_offset, end_of_watch_offset FROM info WHERE id=?"};
		cursor.bind(1, id);
		if (!cursor.executeStep()) return {};

		return {
		    .credits = opt_uint(cursor.getColumn(0)),
		    .end_of_watch = opt_uint(cursor.getColumn(1)),
		};
	}

	std::vector<video_marker> video_info_db::get_markers(int64_t id) {
		SQLite::Statement cursor{
		    conn(), "SELECT type, start, stop, comment FROM marker WHERE id=?"};
		cursor.bind(1, id);

		size_t count{};
		while (cursor.executeStep())
			++count;

		std::vector<video_marker> result{};
		result.reserve(count);

		cursor.reset();
		while (cursor.executeStep()) {
			auto const start = opt_uint(cursor.getColumn(1));
			if (!start) continue;
			result.push_back({
			    .type = static_cast<marker_type>(cursor.getColumn(0).getInt()),
			    .start = *start,
			    .stop = opt_uint(cursor.getColumn(2)),
			    .comment = opt_u8string(cursor.getColumn(3)),
			});
		}
		std::sort(result.begin(), result.end());

		return result;
	}

	void video_info_db::remove_offsets(int64_t id) {
		SQLite::Statement erase{conn(), "DELETE FROM info WHERE id=?"};
		erase.bind(1, id);
		erase.exec();
	}

	int video_info_db::offsets_stmt(std::optional<uint32_t> const& credits,
	                                std::optional<uint32_t> const& end_of_watch,
	                                int64_t id,
	                                const char* sql) {
		SQLite::Statement stmt{conn(), sql};
		bind(stmt, 1, credits);
		bind(stmt, 2, end_of_watch);
		stmt.bind(3, id);
		return stmt.exec();
	}

	bool video_info_db::update_offsets(
	    std::optional<uint32_t> const& credits,
	    std::optional<uint32_t> const& end_of_watch,
	    int64_t id) {
		return offsets_stmt(credits, end_of_watch, id,
		                    "UPDATE OR FAIL info SET credits_offset=?, "
		                    "end_of_watch_offset=? WHERE id=?") > 0;
	}

	void video_info_db::insert_offsets(
	    std::optional<uint32_t> const& credits,
	    std::optional<uint32_t> const& end_of_watch,
	    int64_t id) {
		offsets_stmt(credits, end_of_watch, id,
		             "INSERT OR IGNORE INTO info (credits_offset, "
		             "end_of_watch_offset, id) VALUES (?, ?, ?)");
	}

	void video_info_db::set_markers(int64_t id,
	                                std::vector<video_marker> const& markers) {
		{
			SQLite::Statement erase{conn(), "DELETE FROM marker WHERE id=?"};
			erase.bind(1, id);
			erase.exec();
		}

		SQLite::Statement types{conn(),
		                        "INSERT INTO marker(id, type, start, stop, "
		                        "comment) VALUES (?, ?, ?, ?, ?)"};

		for (auto const& [type, start, stop, comment] : markers) {
			types.reset();
			types.bind(1, id);
			types.bind(2, std::to_underlying(type));
			types.bind(3, start);
			bind(types, 4, stop);
			bind(types, 5, comment);
			types.exec();
		}
	}
}  // namespace movies