// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <SQLiteCpp/Database.h>
#include <base/extended_info.hh>

using namespace std::literals;

namespace movies::full_text {
	struct highlight {
		size_t start{}, stop{};
	};

	struct snippet {
		static constexpr char marker = '\xFE';
		static constexpr char bookend = '\xFF';

		static constexpr std::string_view sql[] = {
		    "SELECT id, snippet("sv,
		    ", 1, '\xFE', '\xFE', '\xFF', 10), bm25("sv,
		    ") FROM ",
		    "(?)"sv,
		};
		static constexpr size_t sql_length = [] {
			size_t common_length = 0;
			for (auto chunk : sql)
				common_length += chunk.length();
			return common_length;
		}();

		static std::string make_statement(std::string_view table) {
			std::string stmt_text{};
			stmt_text.reserve(table.length() * (std::size(sql) - 1) +
			                  sql_length);
			bool first{true};
			for (auto chunk : sql) {
				if (first)
					first = false;
				else
					stmt_text.append(table);
				stmt_text.append(chunk);
			}
			return stmt_text;
		}

		string text{};
		full_text::highlight highlight{};
		bool startCut{false};
		bool endCut{false};

		static snippet from(SQLite::Column const& col);
	};

	struct lookup_result {
		enum class src { summary, title, orig, person };
		std::string id;
		full_text::snippet snippet;
		double bm25{};
		src source{src::summary};
	};

	class engine {
	public:
		explicit engine();

		void rebuild(movie_db const&);

		std::vector<lookup_result> lookup(std::string const& phrase) const;

	private:
		void recreate();
		void propagate(movie_db const& data);
		std::optional<lookup_result> result_from(SQLite::Statement& cursor,
		                                         lookup_result::src) const;
		SQLite::Database db_;
		std::map<long long, std::string> ids_{};
	};
}  // namespace movies::full_text