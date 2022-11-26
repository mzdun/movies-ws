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
	inline auto fs2wall(std::filesystem::file_time_type const& fs) {
		auto const wall =
		    std::chrono::clock_cast<std::chrono::system_clock>(fs);
		return std::chrono::floor<std::chrono::seconds>(wall);
	}

	inline auto file_ref_mtime(file_ref const& ref) {
		return ref.mtime;
	}

	string find_title(title_info const& title) {
		return title.local || title.orig || nothing;
	}

	std::optional<string> normal_cover(poster_info const& poster) {
		return poster.normal || poster.large || poster.small;
	}
	std::optional<string> small_cover(poster_info const& poster) {
		return poster.small || poster.normal || poster.large;
	}

	reference reference::from(std::string const& key,
	                          extended_info const& data,
	                          std::string&& sort_hint,
	                          cover_size size) {
		return {
		    .id = key,
		    .title = find_title(data.title),
		    .cover = size == cover_normal ? normal_cover(data.image.poster)
		                                  : small_cover(data.image.poster),
		    .has_video = !!data.video_file || data.episodes_have_videos,
		    .tags = data.tags,
		    .age_rating = data.age,
		    .sort_hint = std::move(sort_hint),
		};
	}

	server::server(std::filesystem::path const& base) {
		tr_.init(base);
		lang_change(lngs::system_locales());
	}

	void server::load(std::filesystem::path const& database) {
		plugins_ = plugin::load_plugins();
		database_ = database;
		load_async(false);
		db_observer_.observe(*this, database);
	}

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
			movies[key] = {std::move(movie)};
		}

		auto const copied = steady_clock::now();

		UErrorCode ec{};
		auto norm = icu::Normalizer2::getNFCInstance(ec);
		if (U_FAILURE(ec)) norm = nullptr;
		for (auto& [key, movie] : movies) {
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

			movie.title_cat.init(movie.title, norm);
		}

		auto const arrival_and_title = steady_clock::now();

		for (auto& [parent, movie] : movies) {
			if (movie.episodes.empty()) continue;

			decltype(movies)::iterator prev_it{movies.end()};
			for (auto const& ep : movie.episodes) {
				auto id_iter = ref2id.find(ep);
				if (id_iter == ref2id.end()) continue;
				auto ep_iter = movies.find(id_iter->second);
				if (ep_iter == movies.end()) continue;
				auto& episode = ep_iter->second;
				episode.is_episode = true;
				episode.series_id = parent;

				if (prev_it != movies.end()) {
					auto& prev_episode = prev_it->second;
					prev_episode.next.id = ep_iter->first;
					prev_episode.next.title =
					    episode.title.local || nothing;
					prev_episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        prev_episode.link_flags | extended_info::has_next);

					episode.prev.id = prev_it->first;
					episode.prev.title =
					    prev_episode.title.local || nothing;
					episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        episode.link_flags | extended_info::has_prev);
				}
				prev_it = ep_iter;

				if (episode.video_file) movie.episodes_have_videos = true;
			}
		}

		auto const episodes = steady_clock::now();

		current_filters = filter::gather_from_db(movies);

		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg(name, duration_cast<milliseconds>(stop - start))

		return fmt::format(
		    "Loaded {count} movie{pl} in {load} (enh {enh}, episodes "
		    "{episodes}, filters {filters}, total {total})\n",
		    fmt::arg("count", movies.size()),
		    fmt::arg("pl", movies.size() == 1 ? "" : "s"),
		    dur_arg("load", then, loaded),
		    dur_arg("enh", loaded, arrival_and_title),
		    dur_arg("episodes", arrival_and_title, episodes),
		    dur_arg("filters", episodes, now), dur_arg("total", then, now));
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
					return fmt::format(
					    "{}-{}-{} - {}-{}-{}", (int)ymd_low.year(),
					    (unsigned)ymd_low.month(), (unsigned)ymd_low.day(),
					    (int)ymd_high.year(), (unsigned)ymd_high.month(),
					    (unsigned)ymd_high.day());
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

		std::vector dbg{ldr.load_async(database_), std::string{}};
		bool changed = false;

		using namespace std::chrono;

		auto const then = steady_clock::now();
		steady_clock::time_point locked{}, printed{}, sqlite{};

		std::function<void(bool, std::span<std::string> const&)> on_db_update{};
		{
			std::lock_guard writing{db_access_};
			locked = steady_clock::now();

			if (movies_ != ldr.movies || ref2id_ != ldr.ref2id) {
				changed = true;

				if (movies_.size() != ldr.movies.size())
					dbg.push_back(fmt::format("movies changed ({} -> {})\n",
					                          movies_.size(),
					                          ldr.movies.size()));
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

			movies_ = std::move(ldr.movies);
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
		auto it = movies_.find(id);
		if (it == movies_.end()) return {};
		return it->second;
	}

	std::vector<reference> server::get_episodes(
	    std::vector<string> const& episodes) const {
		std::vector<reference> result{};
		result.reserve(episodes.size());
		{
			std::shared_lock guard{db_access_};
			for (auto const& ref : episodes) {
				auto ref_it = ref2id_.find(ref);
				if (ref_it == ref2id_.end()) continue;
				auto movie_it = movies_.find(ref_it->second);
				if (movie_it == movies_.end()) continue;

				result.push_back(reference::from(ref_it->second,
				                                 movie_it->second, {},
				                                 reference::cover_small));
			}
		}
		return result;
	}

	std::vector<link> server::links_for(extended_info const& data) const {
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
				auto it = movies_.find(key);
				if (it == movies_.end()) continue;

				auto const& data = it->second;
				if (hide_episodes && data.is_episode) continue;
				if (filter::matches_all(filters, data))
					keys.push_back({key.data(), key.size()});
			}
		} else {
			keys.reserve(movies_.size());

			for (auto const& [key, data] : movies_) {
				if (hide_episodes && data.is_episode) continue;
				if (filter::matches_all(filters, data)) keys.push_back(key);
			}
		}

		return keys;
	}

	void server::sorted_locked(std::vector<std::string>& keys,
	                           sort::list const& sorter) const {
		auto const less = [&](std::string const& lhs, std::string const& rhs) {
			return sort::compare(sorter, lhs, rhs, movies_) < 0;
		};

		std::sort(keys.begin(), keys.end(), less);
	}

	std::vector<group> server::inflate_locked(
	    std::vector<std::string> const& keys,
	    sort const& grouping) const {
		std::vector<group> result{};
		std::map<std::string, size_t> group_pos{};

		for (auto const& key : keys) {
			auto it = movies_.find(key);
			if (it == movies_.end()) continue;
			auto [id, title] = grouping.header_for(it->second, tr_);
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
			    key, it->second, grouping.sort_hint_for(it->second, tr_)));
		}

		return result;
	}

	std::vector<group> server::quick_inflate_locked(
	    std::vector<std::string> const& keys) const {
		std::vector<group> result{};
		result.push_back({});
		auto& group = result.front().items;
		group.reserve(keys.size());

		for (auto const& key : keys) {
			auto it = movies_.find(key);
			if (it == movies_.end()) continue;
			group.push_back(reference::from(key, it->second, {}));
		}

		return result;
	}

	std::vector<group> server::listing(std::string const& search,
	                                   filter::list const& filters,
	                                   sort::list const& sort,
	                                   bool group_items,
	                                   bool hide_episodes) const {
		std::shared_lock guard{db_access_};
		auto keys = filtered_locked(search, filters, hide_episodes);
		sorted_locked(keys, sort);
		return sort.empty() || !group_items
		           ? quick_inflate_locked(keys)
		           : inflate_locked(keys, *sort.front());
	}

	bool server::lang_change(std::vector<std::string> const& langs) {
		std::shared_lock guard{db_access_};
		auto next_id = tr_.open_one_of(langs);
		if (next_id) {
			auto const changed = *next_id != lang_id_;
			lang_id_ = std::move(*next_id);
			return changed;
		}

		return false;
	}

	void server::set_on_db_update(
	    std::function<void(bool, std::span<std::string> const&)> const& cb) {
		std::shared_lock guard{db_access_};
		on_db_update_ = cb;
	}

	void server::on_files_changed() {
		load_async(true);
	}
}  // namespace movies
