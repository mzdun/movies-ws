// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <SQLiteCpp/Transaction.h>
#include <date/date.h>
#include <fmt/chrono.h>
#include <fmt/format.h>
#include <base/overload.hh>
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
		    .title = find_title(data.info.title),
		    .cover = size == cover_normal ? normal_cover(data.info.image.poster)
		                                  : small_cover(data.info.image.poster),
		    .has_video = !!data.video_file || data.episodes_have_videos,
		    .tags = data.info.tags,
		    .age_rating = data.info.age,
		    .sort_hint = std::move(sort_hint),
		};
	}

	server::server(std::filesystem::path const& base) {
		tr_.init(base);
		lang_change(lngs::system_locales());
	}

	void server::load(std::filesystem::path const& database) {
		using namespace std::chrono;
		plugins_ = plugin::load_plugins();
		database_ = database;

		auto const then = steady_clock::now();
		auto movies = load_from(database / "db", database / "videos");
		auto const loaded = steady_clock::now();
		for (auto&& movie : movies) {
			if (!movie.info_file && !movie.video_file) continue;
			auto const& u8key =
			    movie.info_file ? movie.info_file->id : movie.video_file->id;
			std::string key{reinterpret_cast<char const*>(u8key.data()),
			                u8key.size()};
			movies_[key] = {std::move(movie)};
		}

		auto const copied = steady_clock::now();

		UErrorCode ec{};
		auto norm = icu::Normalizer2::getNFCInstance(ec);
		if (U_FAILURE(ec)) norm = nullptr;
		for (auto& [key, movie] : movies_) {
			for (auto const& ref : movie.info.refs)
				ref2id_[ref] = key;

			movie.arrival = [&movie] {
				auto const published = movie.info.dates.published;
				auto const stream = movie.info.dates.stream;
				auto const poster = movie.info.dates.poster;
				auto const video =
				    movie.video_file >> file_ref_mtime >> fs2wall;
				auto const json = movie.info_file >> file_ref_mtime >> fs2wall;
				return published || stream || video || poster || json;
			}();

			movie.title.init(movie.info.title, norm);
		}

		auto const arrival_and_title = steady_clock::now();

		for (auto& [parent, movie] : movies_) {
			if (movie.info.episodes.empty()) continue;

			decltype(movies_)::iterator prev_it{movies_.end()};
			for (auto const& ep : movie.info.episodes) {
				auto id_iter = ref2id_.find(ep);
				if (id_iter == ref2id_.end()) continue;
				auto ep_iter = movies_.find(id_iter->second);
				if (ep_iter == movies_.end()) continue;
				auto& episode = ep_iter->second;
				episode.is_episode = true;
				episode.series_id = parent;

				if (prev_it != movies_.end()) {
					auto& prev_episode = prev_it->second;
					prev_episode.next.id = ep_iter->first;
					prev_episode.next.title =
					    episode.info.title.local || nothing;
					prev_episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        prev_episode.link_flags | extended_info::has_next);

					episode.prev.id = prev_it->first;
					episode.prev.title =
					    prev_episode.info.title.local || nothing;
					episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        episode.link_flags | extended_info::has_prev);
				}
				prev_it = ep_iter;

				if (episode.video_file) movie.episodes_have_videos = true;
			}
		}

		auto const episodes = steady_clock::now();

		current_filters_ = filter::gather_from_db(movies_);

		auto const filters = steady_clock::now();

		engine_.rebuild(movies_);

		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg(name, duration_cast<milliseconds>(stop - start))

		fmt::print(
		    "\nLoaded {count} movie{pl} in {load} (enh {enh}, episodes "
		    "{episodes}, filters {filters}, sqlite {sqlite}, total {total})\n",
		    fmt::arg("count", movies_.size()),
		    fmt::arg("pl", movies_.size() == 1 ? "" : "s"),
		    dur_arg("load", then, loaded),
		    dur_arg("enh", loaded, arrival_and_title),
		    dur_arg("episodes", arrival_and_title, episodes),
		    dur_arg("filters", episodes, filters),
		    dur_arg("sqlite", filters, now), dur_arg("total", then, now));

		auto const printer = overload{
		    // range_filter, tokens_filter, on_off_filter
		    [](description::range_filter const& flt) {
			    fmt::print("[{}] <range>", flt.field);
			    if (flt.field == "arrival"sv) {
				    auto const ymd_low = date::year_month_day{
				        time_point_cast<days>(sys_seconds{seconds{flt.low}})};
				    auto const ymd_high = date::year_month_day{
				        time_point_cast<days>(sys_seconds{seconds{flt.high}})};
				    fmt::print(" {}-{}-{} - {}-{}-{}", (int)ymd_low.year(),
				               (unsigned)ymd_low.month(),
				               (unsigned)ymd_low.day(), (int)ymd_high.year(),
				               (unsigned)ymd_high.month(),
				               (unsigned)ymd_high.day());
			    } else if (flt.field == "rating"sv) {
				    fmt::print(" {} - {}", flt.low / 20.0, flt.high / 20.0);
			    } else {
				    fmt::print(" {} - {}", flt.low, flt.high);
			    }
			    fmt::print("\n");
		    },
		    [](description::tokens_filter const& flt) {
			    fmt::print("[{}] <tok>", flt.field);
			    for (auto const& item : flt.values)
				    fmt::print(" {}", item);
			    fmt::print("\n");
		    },
		    [](description::on_off_filter const& flt) {
			    fmt::print("[{}] <on/off>\n", flt.field);
		    },
		};
		for (auto const& flt : current_filters_) {
			std::visit(printer, flt);
		}
	}

	extended_info server::find_movie_copy(std::string_view id) const {
		auto it = movies_.find(id);
		if (it == movies_.end()) return {};
		return it->second;
	}

	std::vector<reference> server::get_episodes(
	    std::vector<string> const& episodes) const {
		std::vector<reference> result{};
		result.reserve(episodes.size());
		for (auto const& ref : episodes) {
			auto ref_it = ref2id_.find(ref);
			if (ref_it == ref2id_.end()) continue;
			auto movie_it = movies_.find(ref_it->second);
			if (movie_it == movies_.end()) continue;

			result.push_back(reference::from(ref_it->second, movie_it->second,
			                                 {}, reference::cover_small));
		}
		return result;
	}

	std::vector<link> server::links_for(extended_info const& data) const {
		return plugin::page_links(plugins_, data);
	}

	std::vector<std::string> server::filtered(std::string const& search,
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

	void server::sorted(std::vector<std::string>& keys,
	                    sort::list const& sorter) const {
		auto const less = [&](std::string const& lhs, std::string const& rhs) {
			return sort::compare(sorter, lhs, rhs, movies_) < 0;
		};

		std::sort(keys.begin(), keys.end(), less);
	}

	std::vector<group> server::inflate(std::vector<std::string> const& keys,
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

	std::vector<group> server::quick_inflate(
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
		auto keys = filtered(search, filters, hide_episodes);
		sorted(keys, sort);
		return sort.empty() || !group_items ? quick_inflate(keys)
		                                    : inflate(keys, *sort.front());
	}

	bool server::lang_change(std::vector<std::string> const& langs) {
		auto next_id = tr_.open_one_of(langs);
		if (next_id) {
			auto const changed = *next_id != lang_id_;
			lang_id_ = std::move(*next_id);
			return changed;
		}

		return false;
	}
}  // namespace movies
