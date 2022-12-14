// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <SQLiteCpp/Transaction.h>
#include <date/date.h>
#include <fmt/chrono.h>
#include <fmt/format.h>
#include <base/str.hh>
#include <iostream>
#include <movies/opt.hpp>
#include <server/server.hh>
#include <set>
#include <span>

using namespace std::literals;

namespace movies {
	template <typename TimePoint>
	auto pre_20_file_time_type(TimePoint const& fs) {
		using namespace std::chrono;
		if constexpr (std::same_as<TimePoint, system_clock::time_point>) {
			return floor<seconds>(fs);
		} else {
			auto wall = time_point_cast<system_clock::duration>(
			    fs - TimePoint::clock::now() + system_clock::now());
			return floor<seconds>(wall);
		}
	}

	inline auto fs2wall(std::filesystem::file_time_type const& fs) {
#if __cpp_lib_chrono > 201907L
		using namespace std::chrono;
		auto const wall = clock_cast<system_clock>(fs);
		return floor<seconds>(wall);
#else
		return pre_20_file_time_type(fs);
#endif
	}

	inline auto file_ref_mtime(file_ref const& ref) { return ref.mtime; }

	std::optional<string> normal_cover(poster_info const& poster) {
		return poster.normal || poster.large || poster.small;
	}
	std::optional<string> small_cover(poster_info const& poster) {
		return poster.small || poster.normal || poster.large;
	}

	reference reference::from(std::string const& key,
	                          extended_info const& data,
	                          std::string&& sort_hint,
	                          std::span<std::string const> langs,
	                          cover_size size) {
		auto const title = data.title.find(langs);
		return {
		    .id = key,
		    .title = title != data.title.end() ? title->second.text
		                                       : std::u8string{},
		    .cover = size == cover_normal ? normal_cover(data.image.poster)
		                                  : small_cover(data.image.poster),
		    .has_video = !!data.video_file || data.episodes_have_videos,
		    .tags = data.tags,
		    .age_rating = data.age,
		    .sort_hint = std::move(sort_hint),
		};
	}

	bool contains(std::span<std::string const> langs, std::string_view token) {
		for (auto const& lang : langs) {
			if (lang == token) return true;
		}
		return false;
	}

	size_t char_count(std::string_view token, char checked) {
		size_t counter{};
		for (auto c : token) {
			if (c == checked) ++counter;
		}
		return counter;
	}

	size_t char_count(std::span<std::string const> langs, char checked) {
		size_t counter{};
		for (auto lang : langs) {
			counter += char_count(lang, checked);
		}
		return counter;
	}

	std::vector<std::string> session_info::expand(
	    std::span<std::string> langs) {
		std::vector<std::string> result{};
		result.reserve(langs.size() + char_count(langs, '-'));
		while (!langs.empty()) {
			auto view = std::string_view{langs.front()};
			langs = langs.subspan(1);

			result.push_back({view.data(), view.size()});
			while (!view.empty()) {
				auto const pos = view.find('-');
				if (pos == std::string::npos) break;

				view = view.substr(0, pos);
				if (contains(result, view) || contains(langs, view)) break;
				result.push_back({view.data(), view.size()});
			}
		}
		return result;
	}

	session_info::session_info(std::filesystem::path const& base) {
		tr_.init(base);
		lang_change(lngs::system_locales());
	}

	bool session_info::lang_change(std::vector<std::string> const& langs) {
		std::lock_guard guard{tr_access_};
		auto next_id = tr_.open_one_of(langs);

		auto changed = false;
		if (langs != langs_) {
			langs_ = langs;
			changed = true;
		}

		if (next_id) {
			changed |= *next_id != lang_id_;
			lang_id_ = std::move(*next_id);
			return changed;
		}

		return false;
	}

	void server::load(std::filesystem::path const& database) {
		plugins_ = plugin::load_plugins();
		database_ = database;
		load_async(false);
		db_observer_.observe(*this, database);
	}

	auto split_refs(std::vector<std::u8string> const& refs) {
		std::map<std::u8string, std::u8string> split{};
		for (auto const& ref : refs) {
			auto const pos = ref.find(u8':');
			if (pos == std::string::npos) continue;
			split[ref.substr(0, pos)] = ref.substr(pos + 1);
		}
		return split;
	}

	struct movie_refs {
		std::string id;
		std::map<std::u8string, std::u8string> external_ids{};
		std::vector<std::string> movies{};

		bool compatible_with(std::map<std::u8string, std::u8string>& incoming) {
			bool compatible = true;
			for (auto const& [key, value] : incoming) {
				auto it = external_ids.find(key);
				if (it != external_ids.end() && it->second != value) {
					compatible = false;
					break;
				}
			}

			if (compatible) external_ids.merge(incoming);
			return compatible;
		}
	};

	std::string server::loader::load_async(
	    std::filesystem::path const& database) {
		using namespace std::chrono;

		auto const then = steady_clock::now();
		auto jsons = load_from(database / "db", database / "videos", false);
		auto const loaded = steady_clock::now();
		for (auto&& movie : jsons) {
			if (!movie.info_file && !movie.video_file) continue;
			auto const& u8key =
			    movie.info_file ? movie.info_file->id : movie.video_file->id;
			std::string key{reinterpret_cast<char const*>(u8key.data()),
			                u8key.size()};
			db.movies[key] = {std::move(movie)};
		}

		UErrorCode ec{};
		auto norm = icu::Normalizer2::getNFCInstance(ec);
		if (U_FAILURE(ec)) norm = nullptr;
		for (auto& [key, movie] : db.movies) {
			for (auto const& ref : movie.refs)
				ref2id[ref] = key;

			movie.arrival = [&movie] {
				auto const published = movie.dates.published;
				auto const stream = movie.dates.stream;
				auto const poster = movie.dates.poster;
				auto const video =
				    movie.video_file >> file_ref_mtime >> fs2wall;
				auto const json = movie.info_file >> file_ref_mtime >> fs2wall;
				return published || stream || video || poster || json;
			}();

			movie.title_cat.items.clear();
			for (auto const& [langid, title] : movie.title.items)
				movie.title_cat.items[langid].init(title, norm);
		}

		auto const arrival_and_title = steady_clock::now();

		for (auto& [parent, movie] : db.movies) {
			if (movie.episodes.empty()) continue;

			decltype(db.movies)::iterator prev_it{db.movies.end()};
			for (auto const& ep : movie.episodes) {
				auto id_iter = ref2id.find(ep);
				if (id_iter == ref2id.end()) continue;
				auto ep_iter = db.movies.find(id_iter->second);
				if (ep_iter == db.movies.end()) continue;
				auto& episode = ep_iter->second;
				episode.is_episode = true;
				episode.series_id = parent;

				if (prev_it != db.movies.end()) {
					auto& prev_episode = prev_it->second;
					prev_episode.next.id = ep_iter->first;
					prev_episode.next.title = episode.title.map(
					    [](auto const& title) -> std::u8string const& {
						    return title.text;
					    });
					prev_episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        prev_episode.link_flags | extended_info::has_next);

					episode.prev.id = prev_it->first;
					episode.prev.title = prev_episode.title.map(
					    [](auto const& title) -> std::u8string const& {
						    return title.text;
					    });
					episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        episode.link_flags | extended_info::has_prev);
				}
				prev_it = ep_iter;

				if (episode.video_file) movie.episodes_have_videos = true;
			}
		}

		auto const episodes = steady_clock::now();

		{
			unsigned long long id{};
			std::map<std::u8string, std::vector<movie_refs>> reverse{};
			auto const next_id = [&id] { return fmt::format("p{:05}", ++id); };
			for (auto& [movie_id, movie] : db.movies) {
				movie.local_people_refs.clear();
				movie.local_people_refs.reserve(movie.crew.names.size());
				for (auto const& [name, refs] : movie.crew.names) {
					auto refmap = split_refs(refs);
					auto it = reverse.lower_bound(name);
					if (it == reverse.end() || it->first != name) {
						auto current_id = next_id();
						reverse.insert(
						    it, {
						            name,
						            {{
						                .id = current_id,
						                .external_ids = std::move(refmap),
						                .movies = {movie_id},
						            }},
						        });
						movie.local_people_refs.push_back(
						    std::move(current_id));
						continue;
					}

					bool found = false;
					for (auto& movie_ref : it->second) {
						if (!movie_ref.compatible_with(refmap)) continue;
						movie_ref.movies.push_back(movie_id);
						movie.local_people_refs.push_back(movie_ref.id);
						found = true;
					}

					if (!found) {
						auto current_id = next_id();
						it->second.push_back({
						    .id = current_id,
						    .external_ids = std::move(refmap),
						    .movies = {movie_id},
						});
						movie.local_people_refs.push_back(
						    std::move(current_id));
					}
				}
			}

			for (auto& [name, refs] : reverse) {
				for (auto& ref : refs) {
					db.people[std::move(ref.id)] = {
					    .name = name,
					    .refs = std::move(ref.movies),
					};
				}
			}
		}

		auto const people = steady_clock::now();

		current_filters = filter::gather_from_db(db);

		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg(name, duration_cast<milliseconds>(stop - start))

		return fmt::format(
		    "Loaded {count} movie{pl} in {load} (enh {enh}, episodes "
		    "{episodes}, people table {people}, filters {filters}, total "
		    "{total})\n",
		    fmt::arg("count", db.movies.size()),
		    fmt::arg("pl", db.movies.size() == 1 ? "" : "s"),
		    dur_arg("load", then, loaded),
		    dur_arg("enh", loaded, arrival_and_title),
		    dur_arg("episodes", arrival_and_title, episodes),
		    dur_arg("people", episodes, people),
		    dur_arg("filters", people, now), dur_arg("total", then, now));
#undef dur_arg
	}

	struct filter_formatter {
		std::string operator()(description::range_filter const& flt) {
			using namespace std::chrono;

			auto const range = [&] {
				if (flt.field == "arrival"sv) {
					auto const ymd_low = date::year_month_day{
					    time_point_cast<days>(sys_seconds{seconds{flt.low}})};
					auto const ymd_high = date::year_month_day{
					    time_point_cast<days>(sys_seconds{seconds{flt.high}})};
					return fmt::format("{}-{}-{} - {}-{}-{}",
					                   static_cast<int>(ymd_low.year()),
					                   static_cast<unsigned>(ymd_low.month()),
					                   static_cast<unsigned>(ymd_low.day()),
					                   static_cast<int>(ymd_high.year()),
					                   static_cast<unsigned>(ymd_high.month()),
					                   static_cast<unsigned>(ymd_high.day()));
				} else if (flt.field == "rating"sv) {
					return fmt::format("{} - {}", flt.low / 20.0,
					                   flt.high / 20.0);
				} else {
					return fmt::format("{} - {}", flt.low, flt.high);
				}
				return std::string{};
			}();
			return fmt::format("<rng> [{}] {}\n", flt.field, range);
		}

		std::string operator()(description::tokens_filter const& flt) {
			auto result = fmt::format("<tok> [{}]", flt.field);
			for (auto const& item : flt.values)
				result.append(fmt::format(" {}", item));
			result.push_back('\n');
			return result;
		}

		std::string operator()(description::on_off_filter const& flt) {
			return fmt::format("<0/1> [{}]\n", flt.field);
		}
	};

	void server::load_async(bool notify) {
		loader ldr{};
		auto const database = [&] {
			std::shared_lock guard{db_access_};
			return database_;
		};

		std::vector dbg{ldr.load_async(database()), std::string{}};
		bool changed = false;

		using namespace std::chrono;

		auto const then = steady_clock::now();
		steady_clock::time_point locked{}, printed{}, sqlite{};

		std::function<void(bool, std::span<std::string> const&)> on_db_update{};
		{
			std::lock_guard writing{db_access_};
			locked = steady_clock::now();

			if (movies_ != ldr.db || ref2id_ != ldr.ref2id) {
				changed = true;

				if (movies_.movies.size() != ldr.db.movies.size())
					dbg.push_back(fmt::format("movies changed ({} -> {})\n",
					                          movies_.movies.size(),
					                          ldr.db.movies.size()));
				else
					dbg.push_back("movies changed\n");
			}

			if (current_filters_ != ldr.current_filters) {
				changed = true;

				auto const field = [](auto const& flt) {
					return std::visit([](auto const& flt) { return flt.field; },
					                  flt);
				};

				for (auto const& flt : ldr.current_filters) {
					auto const it = std::find_if(
					    current_filters_.begin(), current_filters_.end(),
					    [&flt, &field](auto const& prev) {
						    return field(flt) == field(prev);
					    });
					if (it != current_filters_.end() && *it == flt) continue;
					dbg.push_back(std::visit(filter_formatter{}, flt));
				}
			}

			printed = steady_clock::now();

			movies_ = std::move(ldr.db);
			current_filters_ = std::move(ldr.current_filters);
			ref2id_ = std::move(ldr.ref2id);

			on_db_update = on_db_update_;

			sqlite = steady_clock::now();
			engine_.rebuild(movies_);
		}
		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg(name, duration_cast<milliseconds>(stop - start))

		dbg[1] = fmt::format(
		    "Installed in {total} (waiting for {waiting}, moving in "
		    "{moving}, sqlite {sqlite})\n",
		    dur_arg("waiting", then, locked),
		    dur_arg("moving", printed, sqlite), dur_arg("sqlite", sqlite, now),
		    dur_arg("total", then, now));
#undef dur_arg

		auto lines = std::span{dbg};
		if (!changed)
			lines = lines.subspan(0, std::min(size_t{2}, lines.size()));

		on_db_update(notify && changed, lines);
	}

	extended_info server::find_movie_copy(std::string_view id) const {
		std::shared_lock guard{db_access_};
		auto it = movies_.movies.find(id);
		if (it == movies_.movies.end()) return {};
		return it->second;
	}

	std::optional<std::filesystem::path> server::get_video_path(
	    std::string_view id) const {
		std::shared_lock guard{db_access_};
		auto it = movies_.movies.find(id);
		if (it == movies_.movies.end()) return {};
		auto const& movie = it->second;
		if (!movie.video_file) return {};
		auto const view = as_sv(movie.video_file->id);
		for (auto ext : {"mp4"sv, "mkv"sv}) {
			auto const resource = fmt::format("videos/{}.{}", view, ext);
			if (std::filesystem::exists(database_ / as_u8v(resource)))
				return as_u8v(resource);
		}
		return {};
	}

	std::vector<reference> server::get_episodes(
	    std::vector<string> const& episodes,
	    std::span<std::string const> langs) const {
		std::vector<reference> result{};
		result.reserve(episodes.size());
		{
			std::shared_lock guard{db_access_};
			for (auto const& ref : episodes) {
				auto ref_it = ref2id_.find(ref);
				if (ref_it == ref2id_.end()) continue;
				auto movie_it = movies_.movies.find(ref_it->second);
				if (movie_it == movies_.movies.end()) continue;

				result.push_back(reference::from(ref_it->second,
				                                 movie_it->second, {}, langs,
				                                 reference::cover_small));
			}
		}
		return result;
	}

	std::vector<link> server::links_for(extended_info const& data,
	                                    Strings const&) const {
		std::shared_lock guard{db_access_};
		return plugin::page_links(plugins_, data);
	}

	std::vector<std::string> server::filtered_locked(
	    std::string const& search,
	    filter::list const& filters,
	    bool hide_episodes) const {
		std::vector<std::string> keys{};

		if (!search.empty()) {
			std::set<std::string_view> ids{};
			auto const results = engine_.lookup(search + "*");
			for (auto const& result : results) {
				ids.insert(result.id);
			}

			keys.reserve(ids.size());
			for (auto const& key : ids) {
				auto it = movies_.movies.find(key);
				if (it == movies_.movies.end()) continue;

				auto const& data = it->second;
				if (hide_episodes && data.is_episode) continue;
				if (filter::matches_all(filters, data))
					keys.push_back({key.data(), key.size()});
			}
		} else {
			keys.reserve(movies_.movies.size());

			for (auto const& [key, data] : movies_.movies) {
				if (hide_episodes && data.is_episode) continue;
				if (filter::matches_all(filters, data)) keys.push_back(key);
			}
		}

		return keys;
	}

	void server::sorted_locked(std::vector<std::string>& keys,
	                           sort::list const& sorter,
	                           std::span<std::string const> langs) const {
		auto const less = [&](std::string const& lhs, std::string const& rhs) {
			return sort::compare(sorter, lhs, rhs, movies_, langs) < 0;
		};

		std::sort(keys.begin(), keys.end(), less);
	}

	std::vector<group> server::inflate_locked(
	    std::vector<std::string> const& keys,
	    sort const& grouping,
	    Strings const& tr,
	    std::span<std::string const> langs) const {
		std::vector<group> result{};
		std::map<std::string, size_t> group_pos{};

		for (auto const& key : keys) {
			auto it = movies_.movies.find(key);
			if (it == movies_.movies.end()) continue;
			auto [id, title] = grouping.header_for(it->second, tr, langs);
			auto group_it = group_pos.lower_bound(id);
			if (group_it == group_pos.end() || group_it->first != id) {
				auto const pos = result.size();
				result.push_back({
				    .id = id,
				    .title = title,
				    .items = {},
				});
				if (pos == result.size()) continue;
				group_it = group_pos.insert(group_it, {id, pos});
			}
			result[group_it->second].items.push_back(reference::from(
			    key, it->second, grouping.sort_hint_for(it->second, tr, langs),
			    langs));
		}

		return result;
	}

	std::vector<group> server::quick_inflate_locked(
	    std::vector<std::string> const& keys,
	    std::span<std::string const> langs) const {
		std::vector<group> result{};
		result.push_back({});
		auto& group = result.front().items;
		group.reserve(keys.size());

		for (auto const& key : keys) {
			auto it = movies_.movies.find(key);
			if (it == movies_.movies.end()) continue;
			group.push_back(reference::from(key, it->second, {}, langs));
		}

		return result;
	}

	std::vector<group> server::listing(
	    std::string const& search,
	    filter::list const& filters,
	    sort::list const& sort,
	    bool group_items,
	    bool hide_episodes,
	    Strings const& tr,
	    std::span<std::string const> langs) const {
		std::shared_lock guard{db_access_};
		auto keys = filtered_locked(search, filters, hide_episodes);
		sorted_locked(keys, sort, langs);
		return sort.empty() || !group_items
		           ? quick_inflate_locked(keys, langs)
		           : inflate_locked(keys, *sort.front(), tr, langs);
	}

	void server::set_on_db_update(
	    std::function<void(bool, std::span<std::string> const&)> const& cb) {
		std::shared_lock guard{db_access_};
		on_db_update_ = cb;
	}

	void server::on_files_changed() { load_async(true); }
}  // namespace movies
