// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX

#include <date/date.h>
#include <rpc/db.hh>
#include <rpc/session.hh>

#include <fmt/chrono.h>

namespace fmt {
	template <typename Payload>
	struct formatter<std::optional<Payload>> : public formatter<Payload> {
		template <typename FormatContext>
		auto format(std::optional<Payload> const& opt, FormatContext& ctx) const
		    -> decltype(ctx.out()) {
			if (!opt) return fmt::format_to(ctx.out(), "-");
			return formatter<Payload>::format(*opt, ctx);
		}
	};

	template <typename Duration>
	struct formatter<date::hh_mm_ss<Duration>> {
		constexpr auto parse(format_parse_context& ctx)
		    -> decltype(ctx.begin()) {
			auto it = ctx.begin(), end = ctx.end();
			while (it != end && *it != '}')
				++it;
			return it;
		}

		template <typename FormatContext>
		auto format(date::hh_mm_ss<Duration> const& hms,
		            FormatContext& ctx) const -> decltype(ctx.out()) {
			return hms.hours().count()
			           ? fmt::format_to(
			                 ctx.out(), "{}:{:02}:{:02}", hms.hours().count(),
			                 hms.minutes().count(), hms.seconds().count())
			           : fmt::format_to(ctx.out(), "{}:{:02}",
			                            hms.minutes().count(),
			                            hms.seconds().count());
		}
	};

	template <>
	struct formatter<movies::watch_offset> {
		constexpr auto parse(format_parse_context& ctx)
		    -> decltype(ctx.begin()) {
			auto it = ctx.begin(), end = ctx.end();
			while (it != end && *it != '}')
				++it;
			return it;
		}

		template <typename FormatContext>
		auto format(movies::watch_offset const& watch, FormatContext& ctx) const
		    -> decltype(ctx.out()) {
			using namespace std::chrono;
			using hh_mm_ss = date::hh_mm_ss<seconds>;
			using sys_ms = date::sys_time<milliseconds>;

			std::optional<hh_mm_ss> clock{};
			std::optional<sys_ms> timestamp{};
			if (watch.offset) clock = hh_mm_ss{seconds{*watch.offset}};
			if (watch.timestamp)
				timestamp = sys_ms{milliseconds{*watch.timestamp}};

			return fmt::format_to(ctx.out(), "offset {} stored on {}", clock,
			                      timestamp);
		}
	};
}  // namespace fmt

#define OPT_COPY(FLD) \
	if (src.FLD) v1::copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD, ...) v1::copy(src.FLD, *dst.mutable_##FLD(), ##__VA_ARGS__)
#define TR_COPY(FLD, ...)                                                  \
	if (!v1::tr_copy(src.FLD, *dst.mutable_##FLD(), langs, ##__VA_ARGS__)) \
	dst.clear_##FLD()
#define SET(FLD) dst.set_##FLD(src.FLD)

namespace movies::db::v1 {
	namespace {
		using google::protobuf::RepeatedPtrField;

		inline size_t as_size(int size) {
			return size < 0 ? 0 : static_cast<size_t>(size);
		}

		inline unsigned as_uint(int size) {
			return size < 0 ? 0 : static_cast<unsigned>(size);
		}

		void copy(std::string_view src, std::string& dst) { dst.assign(src); }

#ifdef MOVIES_USE_U8STRING
		void copy(std::u8string_view src, std::string& dst) {
			dst.assign(as_ascii_view(src));
		}
#endif

		void copy(image_url const& src, std::string& dst) {
			v1::copy(src.path, dst);
		}

		void copy(poster_info const& src, info::v1::PosterInfo& dst) {
			OPT_COPY(small);
			OPT_COPY(large);
			OPT_COPY(normal);
		}

		template <typename Src, typename Dst>
		bool tr_copy_impl(translatable<Src> const& src,
		                  Dst& dst,
		                  std::span<std::string const> langs) {
			auto it = src.find(langs);
			if (it == src.end()) return false;
			v1::copy(it->second, dst);
			return true;
		}

		bool tr_copy(translatable<string_type> const& src,
		             std::string& dst,
		             std::span<std::string const> langs) {
			return tr_copy_impl(src, dst, langs);
		}

		bool tr_copy(translatable<image_url> const& src,
		             std::string& dst,
		             std::span<std::string const> langs,
		             std::string const& title_orig_lang) {
			if (tr_copy_impl(src, dst, langs)) return true;
			std::string const alt[] = {title_orig_lang};
			return tr_copy_impl(src, dst, alt);
		}

		template <typename Src, typename Dst, typename... Additional>
		inline void copy(std::vector<Src> const& src,
		                 RepeatedPtrField<Dst>& dst,
		                 Additional&&... additional);

		void copy(reference const& src, listing::v1::MovieReference& dst) {
			COPY(id);
			COPY(title);
			OPT_COPY(cover);
			SET(has_video);
			COPY(tags);
			COPY(age_rating);
			COPY(sort_hint);
		}

		void copy(group const& src, listing::v1::MovieGroup& dst) {
			COPY(id);
			COPY(title);
			COPY(items);
		}

		bool tr_copy(translatable<title_info> const& src,
		             info::v1::TitleInfo& dst,
		             std::span<std::string const> langs) {
			auto it = src.find(langs);
			if (it == src.end()) return false;

			v1::copy(it->second.text, *dst.mutable_local());

			for (auto const& [_, title] : src) {
				if (!title.original) continue;
				if (it->second.text != title.text)
					v1::copy(title.text, *dst.mutable_orig());
				break;
			}

			return true;
		}

		auto find_in(std::vector<std::string> const& list, long long index) {
			if (index < 0) return list.end();
			auto const uindex = static_cast<size_t>(index);
			return uindex >= list.size()
			           ? list.end()
			           : std::next(list.begin(),
			                       static_cast<ptrdiff_t>(uindex));
		}

		void copy(role_info const& src,
		          info::v1::PersonInfo& dst,
		          std::vector<std::string> const& local_people_refs) {
			auto& dst_key = *dst.mutable_key();
			auto it = find_in(local_people_refs, src.id);
			if (it != local_people_refs.end()) v1::copy(*it, dst_key);
			OPT_COPY(contribution);
		}

		void copy(std::vector<person_name> const& src,
		          RepeatedPtrField<info::v1::PeopleMap>& dst,
		          std::vector<std::string> const& refs) {
			dst.Reserve(ws::isize(src));

			auto it = refs.begin();
			for (auto const& person : src) {
				if (it == refs.end()) break;
				auto const& ref = *it++;
				auto& dst_item = *dst.Add();
				v1::copy(ref, *dst_item.mutable_key());
				v1::copy(person.name, *dst_item.mutable_name());
			}
		}

		void copy(crew_info const& src,
		          info::v1::CrewInfo& dst,
		          std::vector<std::string> const& local_people_refs) {
			COPY(directors, local_people_refs);
			COPY(writers, local_people_refs);
			COPY(cast, local_people_refs);
			COPY(names, local_people_refs);
		}

		bool tr_copy(translatable<poster_info> const& src,
		             info::v1::PosterInfo& dst,
		             std::span<std::string const> langs,
		             std::string const& title_orig_lang) {
			if (tr_copy_impl(src, dst, langs)) return true;
			std::string const alt[] = {title_orig_lang};
			return tr_copy_impl(src, dst, alt);
		}

		bool tr_copy(image_info const& src,
		             info::v1::ImageInfo& dst,
		             std::span<std::string const> langs,
		             std::string const& title_orig_lang) {
			TR_COPY(highlight, title_orig_lang);
			TR_COPY(poster, title_orig_lang);
			COPY(gallery);
			return true;
		}

		void copy(movie_info const& src,
		          info::v1::MovieInfo& dst,
		          std::span<std::string const> langs,
		          std::vector<std::string> const& local_people_refs) {
			auto const title_orig_lang = [&]() -> std::string {
				for (auto const& [lang, item] : src.title) {
					if (item.original) return lang;
				}
				return {};
			}();

			TR_COPY(title);
			COPY(crew, local_people_refs);
			COPY(genres);
			COPY(countries);
			copy(src.age, *dst.mutable_age_rating());
			TR_COPY(tagline);
			TR_COPY(summary);
			TR_COPY(image, title_orig_lang);
			OPT_SET(year);
			OPT_SET(runtime);
			OPT_SET(rating);
			COPY(tags);
		}

		void copy(link const& src, info::v1::Link& dst) {
			COPY(href);
			OPT_COPY(icon);
			OPT_COPY(label);
			OPT_COPY(alt);
			OPT_COPY(rel);
		}

		void copy(extended_info::link const& src,
		          info::v1::MovieLink& dst,
		          std::span<std::string const> langs) {
			COPY(id);
			TR_COPY(title);
		}

		void copy(video_marker const& src, info::v1::Marker& dst) {
			using info::v1::Marker;
#define X_ASSERT_EQ(NAME)                                  \
	static_assert(std::to_underlying(marker_type::NAME) == \
	                  std::to_underlying(Marker::NAME),    \
	              "C++ and Proto values for " #NAME " are mismatched");
			MARKER_TYPE_X(X_ASSERT_EQ);
#undef X_ASSERT_EQ

			dst.set_type(
			    static_cast<Marker::Type>(std::to_underlying(src.type)));
			SET(start);
			OPT_SET(stop);
			OPT_COPY(comment);
		}

		void copy(video_info const& src, info::v1::VideoInfo& dst) {
			if (src.credits) dst.set_credits(*src.credits);
			if (src.end_of_watch) dst.set_end_of_watch(*src.end_of_watch);
			if (!src.markers.empty())
				v1::copy(src.markers, *dst.mutable_markers());
		}

		void copy(watch_offset const& src, info::v1::LastWatched& dst) {
			if (src.offset) dst.set_where(*src.offset);
			if (src.timestamp) dst.set_when(*src.timestamp);
		}

		template <typename Src, typename Dst, typename... Additional>
		inline void copy(std::vector<Src> const& src,
		                 RepeatedPtrField<Dst>& dst,
		                 Additional&&... additional) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				v1::copy(val, *dst.Add(),
				         std::forward<Additional>(additional)...);
			}
		}

		void copy(extended_info const& src,
		          std::string const& key,
		          std::vector<link> const& links,
		          std::vector<reference> const& episodes,
		          std::vector<reference> const& extras,
		          watch_offset const& watch,
		          info::v1::MovieInfo& dst,
		          std::span<std::string const> langs) {
			dst.set_id(key);
			dst.set_has_video(!!src.video_file);
			v1::copy(src, dst, langs, src.local_people_refs);
			v1::copy(links, *dst.mutable_links());
			v1::copy(episodes, *dst.mutable_episodes());
			v1::copy(extras, *dst.mutable_extras());

			if (src.link_flags & extended_info::has_prev)
				v1::copy(src.prev, *dst.mutable_prev(), langs);

			if (src.link_flags & extended_info::has_next)
				v1::copy(src.next, *dst.mutable_next(), langs);

			if (src.is_episode || src.is_extra)
				v1::copy(src.parent_id, *dst.mutable_parent());
			if (watch) v1::copy(watch, *dst.mutable_last_watched());
		}

		size_t cap(int isize) {
			if (isize < 0) return 0;
			return static_cast<size_t>(isize);
		}

		template <typename Request>
		std::string log_request_base(Request const& req) {
			auto const& filters = req.filters();
			auto const& sort = req.sort();
			std::string const* search = nullptr;
			if (req.has_search()) search = &req.search();

			std::string result;
			for (auto const& filter : filters) {
				switch (filter.kind_case()) {
					case movies::filters::v1::Filter::kRange: {
						auto const& rng = filter.range();
						if (!result.empty()) result += ", ";
						result += fmt::format(
						    "{}=[{}, {}, missing:{}]", rng.field(), rng.low(),
						    rng.high(), rng.include_missing());
						break;
					}
					case movies::filters::v1::Filter::kTokens: {
						auto const& tok = filter.tokens();
						if (!result.empty()) result += ", ";
						std::string subtoks{};
						for (auto const& sub : tok.token()) {
							if (!subtoks.empty()) subtoks += ", ";
							subtoks.append(sub);
						}
						result +=
						    fmt::format("{}=[({}), missing:{}]", tok.field(),
						                subtoks, tok.include_missing());
						break;
					}
					case movies::filters::v1::Filter::kOnOff: {
						auto const& on_off = filter.on_off();
						if (!result.empty()) result += ", ";
						result +=
						    fmt::format("{}={}", on_off.field(), on_off.on());
						break;
					}
					case movies::filters::v1::Filter::KIND_NOT_SET:
						break;
				}
			}
			std::string dbg_sort2;
			for (auto const& term : sort) {
				if (!dbg_sort2.empty()) dbg_sort2 += ";";
				dbg_sort2.append(term);
			}

			if (!dbg_sort2.empty()) {
				if (!result.empty()) result += ", ";
				result.append(dbg_sort2);
			}

			if (search) {
				if (!result.empty()) result += ", ";
				result.append("search:"sv);
				result.append(*search);
			}

			return result;
		}

		std::string log_request(db::v1::GetListingRequest const& req) {
			return log_request_base(req);
		}

		std::string log_request(db::v1::GetFilterListingRequest const& req) {
			auto const std_dbg = log_request_base(req);
			return fmt::format("{}/{}{}{}", req.category(), req.term(),
			                   std_dbg.empty() ? "" : ", ", std_dbg);
		}

		template <typename Request>
		concept HasKey = requires(Request const& req) {
			{ req.key() } -> std::same_as<std::string const&>;
		};

		std::string const& log_request(HasKey auto const& req) {
			return req.key();
		}

		filter::ptr filter_from(filters::v1::RangeFilter const& rng) {
			return movies::filter::make_range(rng.field(), as_uint(rng.low()),
			                                  as_uint(rng.high()),
			                                  rng.include_missing());
		}

		filter::ptr filter_from(filters::v1::TokensFilter const& tokens) {
			std::vector<std::string> dst{};
			auto const& src = tokens.token();
			dst.reserve(as_size(src.size()));
			for (auto const& item : src)
				dst.push_back(item);

			return movies::filter::make_tokens(tokens.field(), std::move(dst));
		}

		filter::ptr filter_from(filters::v1::OnOffFilter const& on_off) {
			return movies::filter::make_on_off(on_off.field(), on_off.on());
		}

		filter::ptr filter_from(filters::v1::Filter const& filter) {
			switch (filter.kind_case()) {
				case filters::v1::Filter::kRange:
					return filter_from(filter.range());
				case filters::v1::Filter::kTokens:
					return filter_from(filter.tokens());
				case filters::v1::Filter::kOnOff:
					return filter_from(filter.on_off());
				case filters::v1::Filter::KIND_NOT_SET:
					break;
			}
			return {};
		}

		filter::list from_req(
		    RepeatedPtrField<filters::v1::Filter> const& filters,
		    filter::ptr prefix = {}) {
			filter::list result{};
			result.reserve(as_size(filters.size()) + (prefix ? 1U : 0U));
			if (prefix) result.push_back(std::move(prefix));

			for (auto const& filter : filters) {
				auto flt = filter_from(filter);
				if (flt) result.push_back(std::move(flt));
			}

			return result;
		}

		sort::list from_req(RepeatedPtrField<std::string> const& sort) {
			sort::list result{};
			result.reserve(as_size(sort.size()));

			for (auto const& term : sort) {
				auto cmp = sort::make(term);
				if (cmp) result.push_back(std::move(cmp));
			}

			return result;
		}
	}  // namespace

	MSG_HANDLER(GetListing) {
		auto const filters = from_req(req.filters());
		auto const sort = from_req(req.sort());
		std::string const* search = nullptr;
		if (req.has_search()) search = &req.search();

		movies::session data{session};
		auto const& full_langs = data.langs();
		std::vector<std::string> langs{};
		if (!full_langs.empty()) langs.push_back(full_langs.front());

		auto const result =
		    server()->listing(search ? *search : std::string{}, filters, sort,
		                      true, true, data.tr(), langs);
		size_t groups = 0;
		size_t refs = 0;
		for (auto const& grp : result) {
			++groups;
			refs += grp.items.size();
		}

		copy(result, *resp.mutable_groups());
		static constexpr auto s = [](size_t count) {
			return count == 1 ? "" : "s";
		};
		session.log("   -> {} group{}, {} title{}", groups, s(groups), refs,
		            s(refs));
	}

	MSG_HANDLER(GetFilterListing) {
		movies::session data{session};

		auto prefix = movies::filter::make_term(req.category(), req.term());
		auto [title, links] = server()->filter_info(prefix.get(), req.term(),
		                                            data.tr(), data.tr());
		auto const filters = from_req(req.filters(), std::move(prefix));
		auto const sort = from_req(req.sort());
		std::string const* search = nullptr;
		if (req.has_search()) search = &req.search();

		std::vector<reference> result;
		{
			auto const& full_langs = data.langs();
			std::vector<std::string> langs{};
			if (!full_langs.empty()) langs.push_back(full_langs.front());
			auto group =
			    server()->listing(search ? *search : std::string{}, filters,
			                      sort, false, false, data.tr(), langs);
			if (!group.empty()) result = std::move(group.front().items);
		}

		v1::copy(result, *resp.mutable_items());
		v1::copy(links, *resp.mutable_links());
		if (title) v1::copy(*title, *resp.mutable_title());

		static constexpr auto s = [](size_t count) {
			return count == 1 ? "" : "s";
		};
		session.log("   -> {} title{}", result.size(), s(result.size()));
		if (title) session.log("   -> \"{}\"", *title);
	}

	MSG_HANDLER(GetMovieInfo) {
		movies::session data{session};
		auto const& full_langs = data.langs();
		std::vector<std::string> langs{};
		if (!full_langs.empty()) langs.push_back(full_langs.front());

		auto info = server()->find_movie_copy(req.key());
		auto const episodes = server()->get_episodes(info.episodes, langs);
		auto const extras = server()->get_episodes(info.extras, langs);
		auto const watch = server()->get_watch_time(req.key());

		copy(info, req.key(), server()->links_for(info, data.tr()), episodes,
		     extras, watch, *resp.mutable_info(), langs);
		if (resp.info().title().has_local())
			session.log("   -> \"{}\"", resp.info().title().local());
		else
			session.log("   -> untitled");
		session.log("   -> {}", watch);
	}

	MSG_HANDLER(GetVideoFile) {
		auto resource = server()->get_video_resource(req.key());
		if (resource) {
			auto const generic = resource->generic_u8string();
			resp.set_uri(fmt::format("/videos/{}", as_ascii_view(generic)));

			auto const info = server()->get_video_info(req.key());
			if (info.credits || info.end_of_watch || !info.markers.empty())
				v1::copy(info, *resp.mutable_info());
			auto const watch = server()->get_watch_time(req.key());
			if (watch) v1::copy(watch, *resp.mutable_last_watched());

			session.log("   -> {}", resp.uri());
			session.log("   -> {}", watch);
		} else {
			session.log("   -> no video");
		}
	}

	MSG_HANDLER(SetVideoPosition) {
		server()->set_watch_time(req.key(),
		                         {.offset = req.last_watched().where(),
		                          .timestamp = req.last_watched().when()});
	}

	MSG_HANDLER(SetVideoInfo) {
		auto const& src = req.info();
		video_info info{};
		if (src.has_credits()) info.credits = src.credits();
		if (src.has_end_of_watch()) info.end_of_watch = src.end_of_watch();
		auto const& markers = src.markers();
		info.markers.reserve(cap(markers.size()));
		for (auto const& marker : markers) {
			if (!marker.has_start()) continue;
			info.markers.emplace_back();
			auto& next = info.markers.back();
			next.type = static_cast<marker_type>(marker.type());
			next.start = marker.start();
			if (marker.has_stop()) next.stop = marker.stop();
			if (marker.has_comment()) next.comment = as_view(marker.comment());
		}
		server()->set_video_info(req.key(), info);
	}
}  // namespace movies::db::v1
