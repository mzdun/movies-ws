// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <full_text/engine.hh>

#include <SQLiteCpp/Transaction.h>
#include <base/str.hh>
#include <set>
#include <tangle/browser/html_split.hpp>
#include <tangle/str.hpp>
#include <utf/utf.hh>

namespace movies::full_text {
	namespace {
		bool isspace(char32_t c) {
			if (c < 127 && std::isspace(static_cast<unsigned char>(c)))
				return true;
			switch (c) {
				case 0x00A0:
				case 0x1680:
				case 0x2000:
				case 0x2001:
				case 0x2002:
				case 0x2003:
				case 0x2004:
				case 0x2005:
				case 0x2006:
				case 0x2007:
				case 0x2008:
				case 0x2009:
				case 0x200A:
				case 0x200B:
				case 0x202F:
				case 0x205F:
				case 0x3000:
					return true;
			}
			return false;
			// c == '\xA0';
		}

		std::string strip_tags(std::string_view html) {
			std::string result{};
			result.reserve(html.length());
			bool inside_tag{false};
			bool inside_string{false};
			char string_start = '\0';
			for (auto c : html) {
				if (inside_tag) {
					if (inside_string) {
						if (string_start == c) inside_string = false;
						continue;
					}
					switch (c) {
						case '"':
						case '\'':
							inside_string = true;
							string_start = c;
							break;
						case '>':
							inside_tag = false;
							break;
					}
					continue;
				}
				if (c == '<') {
					inside_tag = true;
					continue;
				}
				result.push_back(c);
			}
			return result;
		}

		std::string strip_html(std::u8string_view html) {
			auto const tags_stripped = strip_tags(as_sv(html));
			auto const entities_decoded =
			    tangle::browser::attr_decode(tags_stripped);
			auto const utf = ::utf::as_u32(entities_decoded);
			std::u32string ws{};
			ws.reserve(utf.size());

			for (auto c : utf) {
				if (isspace(c)) {
					if (!ws.empty() && ws.back() != ' ') ws.push_back(' ');
					continue;
				}
				ws.push_back(c);
			}

			if (!ws.empty() && ws.back() == ' ') ws.pop_back();
			return ::utf::as_str8(ws);
		}
	}  // namespace

	snippet snippet::from(SQLite::Column const& col) {
		snippet result{};
		auto const length = col.getBytes();
		auto const ptr = col.getBlob();
		if (length <= 0 || !ptr) return result;
		auto view = std::string_view{static_cast<char const*>(ptr),
		                             static_cast<size_t>(length)};
		if (view.front() == bookend) {
			result.startCut = true;
			view = view.substr(1);
		}
		if (!view.empty() && view.back() == bookend) {
			result.endCut = true;
			view = view.substr(0, view.length() - 1);
		}
		auto split = tangle::split_sv(marker, view);
		result.text = as_u8s(tangle::join({}, split));
		if (split.size() == 3) {
			result.highlight.start = split[0].length();
			result.highlight.stop = split[1].length() + result.highlight.start;
		}
		return result;
	}

	engine::engine()
	    : db_{"moovies.db", SQLite::OPEN_READWRITE | SQLite::OPEN_MEMORY} {}

	void engine::rebuild(movie_db const& data) {
		recreate();
		propagate(data);
	}

	void engine::recreate() {
		SQLite::Transaction tr{db_};
		db_.exec("DROP TABLE IF EXISTS summary"s);
		db_.exec("DROP TABLE IF EXISTS person"s);
		db_.exec("DROP TABLE IF EXISTS title"s);
		db_.exec("DROP TABLE IF EXISTS orig_title"s);
		db_.exec("CREATE VIRTUAL TABLE orig_title USING fts5(id, text)"s);
		db_.exec("CREATE VIRTUAL TABLE title USING fts5(id, text)"s);
		db_.exec("CREATE VIRTUAL TABLE person USING fts5(id, text)"s);
		db_.exec("CREATE VIRTUAL TABLE summary USING fts5(id, text)"s);
		tr.commit();
	}

	void engine::propagate(movie_db const& data) {
		ids_.clear();

		SQLite::Transaction tr{db_};
		SQLite::Statement title_stmt{db_, "INSERT INTO title VALUES(?, ?)"};
		SQLite::Statement orig_stmt{db_, "INSERT INTO orig_title VALUES(?, ?)"};
		SQLite::Statement person_stmt{db_, "INSERT INTO person VALUES(?, ?)"};
		SQLite::Statement summary_stmt{db_, "INSERT INTO summary VALUES(?, ?)"};
		long long rowid{0};
		for (auto const& [id, info] : data) {
			if (!info.info_file && !info.video_file) continue;
			++rowid;
			ids_[rowid] = id;

			auto& title = info.info.title;
			if (title.local) {
				title_stmt.bind(1, rowid);
				title_stmt.bind(2, as_sv(*title.local).data());
				title_stmt.exec();
				title_stmt.reset();
			}
			if (title.orig) {
				orig_stmt.bind(1, rowid);
				orig_stmt.bind(2, as_sv(*title.orig).data());
				orig_stmt.exec();
				orig_stmt.reset();
			}

			std::set<movies::string> names;
			auto const& people = info.info.people;
			auto const& crew = info.info.crew;
			for (auto ptr : {&crew.cast, &crew.directors, &crew.writers}) {
				for (auto const& [key, descr] : *ptr) {
					if (people.count(key) == 0) names.insert(key);
				}
			}
			for (auto const& [key, name] : people) {
				names.insert(name);
			}

			for (auto const& name : names) {
				person_stmt.bind(1, rowid);
				person_stmt.bind(2, as_sv(name).data());
				person_stmt.exec();
				person_stmt.reset();
			}

			if (info.info.summary && info.info.summary->length()) {
				summary_stmt.bind(1, rowid);
				summary_stmt.bind(2, strip_html(*info.info.summary).data());
				summary_stmt.exec();
				summary_stmt.reset();
			}
		}
		tr.commit();
	}

	std::vector<lookup_result> engine::lookup(std::string const& phrase) const
	    try {
		std::vector<lookup_result> results{};
		for (auto [table, source] :
		     {std::pair{"title"sv, lookup_result::src::title},
		      std::pair{"orig_title"sv, lookup_result::src::orig},
		      std::pair{"person"sv, lookup_result::src::person},
		      std::pair{"summary"sv, lookup_result::src::summary}}) {
			SQLite::Statement stmt{db_, snippet::make_statement(table)};
			stmt.bind(1, phrase);
			while (stmt.executeStep()) {
				auto result = result_from(stmt, source);
				if (!result) continue;
				results.push_back(std::move(*result));
			}
		}

		std::stable_sort(results.begin(), results.end(),
		                 [](auto const& lhs, auto const& rhs) -> bool {
			                 if (lhs.id != rhs.id) return lhs.id < rhs.id;
			                 return lhs.bm25 < rhs.bm25;
		                 });

		{
			std::vector<lookup_result> uniq{};
			uniq.reserve(results.size());
			for (auto& result : results) {
				if (uniq.empty() || uniq.back().id != result.id) {
					uniq.push_back(std::move(result));
				}
			}
			results = std::move(uniq);
		}

		std::stable_sort(results.begin(), results.end(),
		                 [](auto const& lhs, auto const& rhs) -> bool {
			                 if (lhs.bm25 != rhs.bm25)
				                 return lhs.bm25 < rhs.bm25;
			                 return lhs.id < rhs.id;
		                 });
		return results;
	} catch (SQLite::Exception&) {
		return {};
	}

	std::optional<lookup_result> engine::result_from(
	    SQLite::Statement& cursor,
	    lookup_result::src source) const {
		auto const rowid = cursor.getColumn(0).getInt64();
		auto snippet = snippet::from(cursor.getColumn(1));
		auto const bm25 = cursor.getColumn(2).getDouble();
		auto id_it = ids_.find(rowid);
		if (id_it == ids_.end()) return std::nullopt;
		return lookup_result{id_it->second, std::move(snippet), bm25, source};
	}
}  // namespace movies::full_text
