// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <SQLiteCpp/Transaction.h>
#include <date/date.h>
#include <fmt/chrono.h>
#include <fmt/format.h>
#include <iostream>
#include <movies/opt.hpp>
#include <random>
#include <regions/mapping.hh>
#include <server/server.hh>
#include <set>
#include <span>
#include <tangle/browser/html_split.hpp>

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
#if __cpp_lib_chrono >= 201907L
		using namespace std::chrono;
		auto const wall = clock_cast<system_clock>(fs);
		return floor<seconds>(wall);
#else
		return pre_20_file_time_type(fs);
#endif
	}

	inline auto file_ref_mtime(file_ref const& ref) { return ref.mtime; }

	std::optional<image_url> normal_cover(poster_info const& poster) {
		return poster.normal || poster.large || poster.small;
	}
	std::optional<image_url> small_cover(poster_info const& poster) {
		return poster.small || poster.normal || poster.large;
	}

	void server_cfg::read(std::filesystem::path const& config_filename) {
		auto& self = *this;
		movies_config::read(
		    config_filename,
		    [&]([[maybe_unused]] auto& _, auto const& common,
		        json::node const& node) -> bool {
			    auto json_db = cast<json::string>(node, u8"db"s);
			    auto json_watch_db = cast<json::string>(node, u8"watch-db"s);
			    auto json_video_info_db =
			        cast<json::string>(node, u8"video-info-db"s);
			    auto json_prefix = cast<json::string>(node, u8"mount"s);
			    auto json_plugins = cast<json::string>(node, u8"plugins"s);

			    self.common_dir = common;
			    self.plugins =
			        json_plugins ? common / as_fs_view(*json_plugins) : common;

			    auto db_dir = fs::weakly_canonical(
			        json_db ? config_filename.parent_path() / *json_db
			                : config_filename.parent_path());

			    self.watch_db = fs::weakly_canonical(
			        json_watch_db ? db_dir / *json_watch_db
			                      : db_dir / u8"watch.sqlite"sv);
			    self.video_info_db = fs::weakly_canonical(
			        json_video_info_db ? db_dir / *json_video_info_db
			                           : db_dir / u8"video-info.sqlite"sv);

			    if (json_prefix)
				    self.prefix.assign(movies::as_ascii_view(*json_prefix));
			    if (self.prefix.empty() || self.prefix.front() != '/')
				    self.prefix.insert(self.prefix.begin(), '/');
			    if (self.prefix.back() == '/') self.prefix.pop_back();
			    return true;
		    });
	}

	reference reference::from(std::string const& key,
	                          extended_info const& data,
	                          std::string&& sort_hint,
	                          std::span<std::string const> langs,
	                          cover_size size) {
		auto const title = data.title.find(langs);
		auto const poster = data.image.poster.find(langs);
		using opt_str = std::optional<string_type>;
		opt_str cover =
		    poster != data.image.poster.end()
		        ? ((size == cover_normal ? normal_cover(poster->second)
		                                 : small_cover(poster->second)) >>
		           [](image_url const& url) { return url.path; })
		        : opt_str{};
		return {
		    .id = key,
		    .title =
		        title != data.title.end() ? title->second.text : string_type{},
		    .cover = std::move(cover),
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
		for (auto const& lang : langs) {
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

			result.emplace_back(view.data(), view.size());
			while (!view.empty()) {
				auto const pos = view.find('-');
				if (pos == std::string::npos) break;

				view = view.substr(0, pos);
				if (contains(result, view) || contains(langs, view)) break;
				result.emplace_back(view.data(), view.size());
			}
		}
		return result;
	}

	struct seed_sequence {
		std::random_device rd{};

		using result_type = std::random_device::result_type;

		template <typename RandomAccessIterator>
		void generate(RandomAccessIterator begin, RandomAccessIterator end) {
			using value_type =
			    typename std::iterator_traits<RandomAccessIterator>::value_type;
			std::uniform_int_distribution<value_type> bits{
			    (std::numeric_limits<value_type>::min)(),
			    (std::numeric_limits<value_type>::max)(),
			};

			for (auto it = begin; it != end; ++it) {
				*it = bits(rd);
			}
		}

		static std::mt19937 mt19937() {
			seed_sequence seq{};
			return std::mt19937{seq};
		}
	};

	std::string session_info::invent_id() {
		static constexpr auto LEN = 8u;
		static constexpr char alphabet[] = "0123456789ABCDEF";
		std::string result{};
		result.reserve(LEN * 2);

		static auto rnd = seed_sequence::mt19937();
		std::uniform_int_distribution<> dice(0x00, 0xFF);
		for (auto ndx = 0u; ndx < LEN; ++ndx) {
			auto const byte = dice(rnd);
			result.push_back(alphabet[(byte >> 4) & 0xF]);
			result.push_back(alphabet[(byte >> 0) & 0xF]);
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

	void server::load() {
		load_async(false);
		std::error_code ec{};
		db_observer_.observe({shared_from_this(), this},
		                     configuration_.common_dir);
	}

	auto split_refs(std::vector<string_type> const& refs) {
		std::map<string_type, string_type> split{};
		for (auto const& ref : refs) {
			auto const pos = ref.find(':');
			if (pos == std::string::npos) continue;
			split[ref.substr(0, pos)] = ref.substr(pos + 1);
		}
		return split;
	}

	struct movie_refs {
		std::string id;
		std::map<string_type, string_type> external_ids{};
		std::vector<std::string> movies{};

		bool compatible_with(std::map<string_type, string_type>& incoming) {
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

	struct patch {
		size_t attrs_stop;
		size_t start;
		size_t stop;
		string_type replacement;
		string_type rel;
	};

	std::vector<patch> get_patches(string_view_type summary) {
		std::vector<patch> results;
		auto nodes = tangle::browser::html_split(as_ascii_view(summary));
		for (auto& node : nodes) {
			if (!node.name.is("a"sv)) continue;

			std::string_view attr_name;
			tangle::browser::attr_pos attr_pos;
			for (auto const& [attr, pos] : node.attrs) {
				if (!tangle::browser::equal_ignore_case(attr, "href"sv))
					continue;
				attr_name = attr;
				attr_pos = pos;
				break;
			}

			if (attr_name.empty()) continue;

			size_t attrs_stop{};
			for (auto const& [attr, pos] : node.attrs) {
				if (attrs_stop < pos.stop) attrs_stop = pos.stop;
			}

			static constexpr auto schema_internal = "internal:"sv;
			if (!attr_pos.value.starts_with(schema_internal)) {
				results.push_back({
				    .attrs_stop = attrs_stop,
				    .start = attrs_stop,
				    .stop = attrs_stop,
				    .replacement{},
				    .rel{as_string_v(link::noreferrer)},
				});
				continue;
			}

			results.push_back({
			    .attrs_stop = attrs_stop,
			    .start = attr_pos.start,
			    .stop = attr_pos.stop,
			    .replacement = as_string(tangle::browser::attr_decode(
			        attr_pos.value.substr(schema_internal.size()))),
			    .rel{},
			});
		}
		return results;
	}

	void lookup_patches(std::vector<patch>& patches,
	                    std::map<string_type, std::string> const& ref2id,
	                    plugin::list const& plugins) {
		for (auto& p : patches) {
			if (p.replacement.empty()) continue;

			auto it = ref2id.find(p.replacement);
			if (it != ref2id.end()) {
				// todo: url-encode...
				p.replacement = as_string(fmt::format("/movie/{}", it->second));
				continue;
			}

			auto links = plugin::ref_links(plugins, {p.replacement});
			if (!links.empty()) {
				auto const& link = links.front();
				p.replacement = as_string_v(link.href);
				if (link.rel) p.rel = as_string_v(*link.rel);
				continue;
			}

			p.replacement.assign(SV("#"));
		}
	}

	static constexpr auto rel_prefix = SV(" rel=\"");
	static constexpr auto rel_postfix = SV("\" target = \"_blank\"");

	string_type patch_text(std::vector<patch> const& patches,
	                       string_view_type text) {
		size_t prev = 0;
		string_type patched{};
		{
			size_t length = 0;
			for (auto const& p : patches) {
				if (!p.replacement.empty()) {
					length += p.start - prev;
					length += p.replacement.length() + 2;
					prev = p.stop;
				}
				if (!p.rel.empty()) {
					length += p.rel.length() + rel_prefix.length() +
					          rel_postfix.length();
				}
			}
			patched.reserve(length + (text.length() - prev));
		}

		prev = 0;

		for (auto const& p : patches) {
			if (!p.replacement.empty()) {
				patched.append(text.substr(prev, p.start - prev));
				patched.push_back('"');
				patched.append(as_view(p.replacement));
				patched.push_back('"');
				prev = p.stop;
			}
			if (!p.rel.empty()) {
				patched.append(text.substr(prev, p.attrs_stop - prev));
				patched.append(rel_prefix);
				patched.append(as_view(p.rel));
				patched.append(rel_postfix);
				prev = p.attrs_stop;
			}
		}

		patched.append(text.substr(prev));
		return patched;
	}

	bool matches(std::u8string_view u8key, std::u8string_view name) {
		size_t prev = 0;
		auto pos = u8key.find('/');
		while (pos != std::u8string_view::npos) {
			if (u8key.substr(prev, pos - prev) == name) return true;
			prev = pos + 1;
			pos = u8key.find('/', prev);
		}
		return u8key.substr(prev) == name;
	}

	std::string server::loader::load_async(server_cfg const& configuration) {
		using namespace std::chrono;

		auto const then = steady_clock::now();
		plugins = plugin::load_plugins(configuration.plugins);
		auto jsons = configuration.load(false);
		auto const loaded = steady_clock::now();
		for (auto&& movie : jsons) {
			if (!movie.info_file && !movie.video_file) continue;
			auto const& u8key =
			    movie.info_file ? movie.info_file->id : movie.video_file->id;
			if (matches(u8key, u8"@eaDir"sv)) {
				continue;
			}
			auto key = as_ascii_string_v(u8key);
			db.movies[key] = {std::move(movie)};
		}

		UErrorCode ec{};
		auto norm = icu::Normalizer2::getNFCInstance(ec);
		if (U_FAILURE(ec)) norm = nullptr;
		for (auto& [key, movie] : db.movies) {
			for (auto const& ref : movie.refs)
				ref2id[ref] = key;

			movie.arrival = [](extended_info& binding_movie) {
				auto const published = binding_movie.dates.published;
				auto const stream = binding_movie.dates.stream;
				auto const poster = binding_movie.dates.poster;
				auto const video = binding_movie.video_file >> file_ref_mtime;
				auto const json = binding_movie.info_file >> file_ref_mtime;
				return published || stream || video || poster || json;
			}(movie);

			movie.title_cat.items.clear();
			for (auto const& [langid, title] : movie.title.items)
				movie.title_cat.items[langid].init(title, norm);
		}

		auto const arrival_and_title = steady_clock::now();

		for (auto& [_, movie] : db.movies) {
			for (auto& [lng, summary] : movie.summary) {
				auto patches = get_patches(summary);
				if (patches.empty()) continue;
				lookup_patches(patches, ref2id, plugins);
				summary = patch_text(patches, summary);
			}
		}

		auto const summary_patching = steady_clock::now();

		for (auto& [parent, movie] : db.movies) {
			if (movie.episodes.empty() && movie.extras.empty()) continue;

			decltype(db.movies)::iterator prev_it{db.movies.end()};
			for (auto const& ep : movie.episodes) {
				auto id_iter = ref2id.find(ep);
				if (id_iter == ref2id.end()) continue;
				auto ep_iter = db.movies.find(id_iter->second);
				if (ep_iter == db.movies.end()) continue;
				auto& episode = ep_iter->second;
				episode.is_episode = true;
				episode.parent_id = parent;

				if (prev_it != db.movies.end()) {
					auto& prev_episode = prev_it->second;
					prev_episode.next.id = ep_iter->first;
					prev_episode.next.title = episode.title.map(
					    [](auto const& title) -> string_type const& {
						    return title.text;
					    });
					prev_episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        prev_episode.link_flags | extended_info::has_next);

					episode.prev.id = prev_it->first;
					episode.prev.title = prev_episode.title.map(
					    [](auto const& title) -> string_type const& {
						    return title.text;
					    });
					episode.link_flags =
					    static_cast<extended_info::link_flags_t>(
					        episode.link_flags | extended_info::has_prev);
				}
				prev_it = ep_iter;

				if (episode.video_file) movie.episodes_have_videos = true;
			}

			for (auto const& extra : movie.extras) {
				auto id_iter = ref2id.find(extra);
				if (id_iter == ref2id.end()) continue;
				auto extra_iter = db.movies.find(id_iter->second);
				if (extra_iter == db.movies.end()) continue;

				auto& linked = extra_iter->second;
				linked.is_extra = true;
				linked.parent_id = parent;

				if (linked.video_file) movie.extras_have_videos = true;
			}
		}

		auto const episodes = steady_clock::now();

		{
			unsigned long long id{};
			std::map<string_type, std::vector<movie_refs>> reverse{};
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
					std::vector<string_type> external_ids;
					external_ids.reserve(ref.external_ids.size());
					std::transform(
					    ref.external_ids.begin(), ref.external_ids.end(),
					    std::back_inserter(external_ids), [](auto const& pair) {
						    string_type result;
						    result.reserve(pair.first.length() +
						                   pair.second.length() + 1);
						    result.append(pair.first);
						    result.push_back(':');
						    result.append(pair.second);
						    return result;
					    });
					db.people[std::move(ref.id)] = {
					    .name = name,
					    .external_ids = std::move(external_ids),
					    .movies = std::move(ref.movies),
					};
				}
			}
		}

		auto const people = steady_clock::now();

		current_filters = filter::gather_from_db(db);

		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg((name), duration_cast<milliseconds>((stop) - (start)))

		return fmt::format(
		    "Loaded {count_movies} movie{pl_movies} and {count_plugins} "
		    "plugin{pl_plugins} in {load} (enh {enh}, patching {summary}, "
		    "episodes {episodes}, people table {people}, filters {filters}, "
		    "total {total})",
		    fmt::arg("count_movies", db.movies.size()),
		    fmt::arg("pl_movies", db.movies.size() == 1 ? "" : "s"),
		    fmt::arg("count_plugins", plugins.size()),
		    fmt::arg("pl_plugins", plugins.size() == 1 ? "" : "s"),
		    dur_arg("load", then, loaded),
		    dur_arg("enh", loaded, arrival_and_title),
		    dur_arg("summary", arrival_and_title, summary_patching),
		    dur_arg("episodes", summary_patching, episodes),
		    dur_arg("people", episodes, people),
		    dur_arg("filters", people, now), dur_arg("total", then, now));
#undef dur_arg
	}

	struct filter_formatter {
		std::string operator()(description::range_filter const& flt) {
			using namespace std::chrono;
			static constexpr auto hundred_to_five = 20.0;

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
				}
				if (flt.field == "rating"sv)
					return fmt::format("{} - {}", flt.low / hundred_to_five,
					                   flt.high / hundred_to_five);
				return fmt::format("{} - {}", flt.low, flt.high);
			}();
			return fmt::format("<rng> [{}] {}", flt.field, range);
		}

		std::string operator()(description::tokens_filter const& flt) {
			auto result = fmt::format("<tok> [{}]", flt.field);
			for (auto const& item : flt.values)
				result.append(fmt::format(" {}", item));
			return result;
		}

		std::string operator()(description::on_off_filter const& flt) {
			return fmt::format("<0/1> [{}]", flt.field);
		}
	};

	void server::load_async(bool notify) {
		loader ldr{};
		auto const config = [&] {
			std::shared_lock guard{db_access_};
			return configuration_;
		};

		std::vector dbg{ldr.load_async(config()), std::string{}};
		bool changed = false;

		using namespace std::chrono;

		auto const then = steady_clock::now();
		steady_clock::time_point locked{};
		steady_clock::time_point printed{};
		steady_clock::time_point sqlite{};
		steady_clock::time_point video_infos{};

		std::function<void(bool, std::span<std::string> const&,
		                   std::source_location const&)>
		    on_db_update{};
		{
			std::lock_guard writing{db_access_};
			locked = steady_clock::now();

			if (!plugin::eq(plugins_, ldr.plugins)) {
				changed = true;
				dbg.emplace_back("plugins changed");
			}

			if (movies_ != ldr.db || ref2id_ != ldr.ref2id) {
				changed = true;

				if (movies_.movies.size() != ldr.db.movies.size())
					dbg.emplace_back(fmt::format("movies changed ({} -> {})",
					                             movies_.movies.size(),
					                             ldr.db.movies.size()));
				else
					dbg.emplace_back("movies changed");
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

			plugins_ = std::move(ldr.plugins);
			movies_ = std::move(ldr.db);
			current_filters_ = std::move(ldr.current_filters);
			ref2id_ = std::move(ldr.ref2id);

			on_db_update = on_db_update_;

			sqlite = steady_clock::now();
			engine_.rebuild(movies_);

			video_infos = steady_clock::now();
			if (changed) {
				for (auto const& [id, movie] : movies_.movies) {
					if (!movie.video.credits && !movie.video.end_of_watch &&
					    movie.video.markers.empty())
						continue;
					video_info_.set_video_info(id, movie.video);
				}
			}
		}
		auto const now = steady_clock::now();

#define dur_arg(name, start, stop) \
	fmt::arg((name), duration_cast<milliseconds>((stop) - (start)))

		dbg[1] = fmt::format(
		    "Installed in {total} (waiting for {waiting}, moving in "
		    "{moving}, sqlite {sqlite}, video info {infos})",
		    dur_arg("waiting", then, locked),
		    dur_arg("moving", printed, sqlite),
		    dur_arg("sqlite", sqlite, video_infos),
		    dur_arg("infos", video_infos, now), dur_arg("total", then, now));
#undef dur_arg

		auto lines = std::span{dbg};
		if (!changed)
			lines = lines.subspan(0, std::min(size_t{2}, lines.size()));

		on_db_update(notify && changed, lines, std::source_location::current());
	}

	extended_info server::find_movie_copy(std::string_view id) const {
		std::shared_lock guard{db_access_};
		auto it = movies_.movies.find(id);
		if (it == movies_.movies.end()) return {};
		return it->second;
	}

	std::optional<std::filesystem::path> server::get_video_resource(
	    std::string_view id) const {
		std::shared_lock guard{db_access_};
		auto it = movies_.movies.find(id);
		if (it == movies_.movies.end()) return {};
		auto const& movie = it->second;
		if (!movie.video_file) return {};
		auto const view = as_ascii_view(movie.video_file->id);
		for (auto ext : {"mp4"sv, "mkv"sv}) {
			auto const resource = fmt::format("{}.{}", view, ext);
			if (std::filesystem::exists(configuration_.dirs.videos /
			                            as_utf8_view(resource)))
				return as_utf8_view(resource);
		}
		return {};
	}

	std::vector<reference> server::get_episodes(
	    std::vector<string_type> const& episodes,
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
				if (data.is_extra) continue;
				if (filter::matches_all(filters, data))
					keys.emplace_back(key.data(), key.size());
			}
		} else {
			keys.reserve(movies_.movies.size());

			for (auto const& [key, data] : movies_.movies) {
				if (hide_episodes && data.is_episode) continue;
				if (data.is_extra) continue;
				if (filter::matches_all(filters, data)) keys.emplace_back(key);
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

	static std::optional<std::string> expand_country(
	    std::string_view prefix,
	    std::string const& term,
	    movies::region::Strings const& region) {
		for (auto const& [name, lng] : movies::region::names) {
			if (name == term) return fmt::format("{}: {}", prefix, region(lng));
		}
		return {};
	}

	static std::optional<std::string> expand_crew(
	    std::string_view prefix,
	    std::string const& term,
	    std::map<std::string, movie_info_refs> const& people) {
		auto it = people.find(term);
		if (it != people.end()) {
			return fmt::format("{}: {}", prefix,
			                   as_ascii_view(it->second.name));
		}
		return {};
	}

	static std::vector<link> crew_links(
	    std::string const& term,
	    plugin::list const& plugins,
	    std::map<std::string, movie_info_refs> const& people) {
		auto it = people.find(term);
		if (it != people.end()) {
			return plugin::ref_links(plugins, it->second.external_ids);
		}
		return {};
	}

	static std::pair<std::optional<std::string>, std::vector<link>> expand_term(
	    std::string_view prefix,
	    std::string const& term,
	    filter::expand kind,
	    movies::region::Strings const& region,
	    plugin::list const& plugins,
	    std::map<std::string, movie_info_refs> const& people) {
		std::pair<std::optional<std::string>, std::vector<link>> result{};
		auto& [title, links] = result;
		switch (kind) {
			case filter::expand::none:
				break;
			case filter::expand::country:
				title = expand_country(prefix, term, region);
				break;
			case filter::expand::crew:
				title = expand_crew(prefix, term, people);
				links = crew_links(term, plugins, people);
				break;
		}
		if (!title) title = fmt::format("{}: {}", prefix, term);
		return result;
	}

	std::pair<std::optional<std::string>, std::vector<link>>
	server::filter_info(filter* filter,
	                    std::string const& term,
	                    app::Strings const& tr,
	                    movies::region::Strings const& region) const {
		std::pair<std::optional<std::string>, std::vector<link>> result{};
		if (filter) {
			auto const id = filter->title();
			if (id != app::lng{}) {
				result = expand_term(tr(id), term, filter->title_expand(),
				                     region, plugins_, movies_.people);
			}
		}
		return result;
	}

	void server::set_on_db_update(
	    std::function<void(bool,
	                       std::span<std::string> const&,
	                       std::source_location const&)> const& cb) {
		std::shared_lock guard{db_access_};
		on_db_update_ = cb;
	}

	void server::on_files_changed() { load_async(true); }

	watch_offset server::get_watch_time(std::string const& movie) {
		return watch_offsets_.get_watch_time(movie);
	}

	void server::set_watch_time(std::string const& movie,
	                            watch_offset const& offset) {
		watch_offsets_.set_watch_time(movie, offset);
	}

	video_info server::get_video_info(std::string const& movie) {
		return video_info_.get_video_info(movie);
	}

	void server::set_video_info(std::string const& movie,
	                            video_info const& info) {
		video_info_.set_video_info(movie, info);
	}
}  // namespace movies
