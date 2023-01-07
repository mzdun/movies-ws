// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include <rpc/db.hh>
#include <rpc/session.hh>

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

		void copy(std::u8string_view src, std::string& dst) {
			dst.assign(as_sv(src));
		}

		bool tr_copy(translatable<std::u8string> const& src,
		             std::string& dst,
		             std::span<std::string const> langs) {
			auto it = src.find(langs);
			if (it == src.end()) return false;
			dst.assign(as_sv(it->second));
			return true;
		}

		template <typename Src, typename Dst, typename... Additional>
		inline void copy(std::vector<Src> const& src,
		                 RepeatedPtrField<Dst>& dst,
		                 Additional&&... additional);

#define OPT_COPY(FLD) \
	if (src.FLD) v1::copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD, ...) v1::copy(src.FLD, *dst.mutable_##FLD(), ##__VA_ARGS__)
#define TR_COPY(FLD) \
	if (!v1::tr_copy(src.FLD, *dst.mutable_##FLD(), langs)) dst.clear_##FLD()
#define SET(FLD) dst.set_##FLD(src.FLD)

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

		void copy(poster_info const& src, info::v1::PosterInfo& dst) {
			OPT_COPY(small);
			OPT_COPY(large);
			OPT_COPY(normal);
		}

		void copy(image_info const& src, info::v1::ImageInfo& dst) {
			OPT_COPY(highlight);
			COPY(poster);
			COPY(gallery);
		}

		void copy(movie_info const& src,
		          info::v1::MovieInfo& dst,
		          std::span<std::string const> langs,
		          std::vector<std::string> const& local_people_refs) {
			TR_COPY(title);
			COPY(crew, local_people_refs);
			COPY(genres);
			COPY(countries);
			copy(src.age, *dst.mutable_age_rating());
			TR_COPY(tagline);
			TR_COPY(summary);
			COPY(image);
			OPT_SET(year);
			OPT_SET(runtime);
			OPT_SET(rating);
			COPY(tags);

			/*
	repeated MovieReference episodes = 11;
			*/
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

		void copy(marker const& src, info::v1::Marker& dst) {
			using info::v1::Marker;
#define MARKER_TYPE_X_ASSERT_EQ(CXX, PROTO)                              \
	static_assert(std::to_underlying(marker::type::CXX) == \
	                  std::to_underlying(Marker::PROTO),   \
	              #CXX " and " #PROTO " are mismatched");
			MARKER_TYPE_X(MARKER_TYPE_X_ASSERT_EQ);
#undef MARKER_TYPE_X_ASSERT_EQ

			dst.set_type(
			    static_cast<Marker::Type>(std::to_underlying(src.kind)));
			OPT_SET(start);
			OPT_SET(stop);
			OPT_COPY(comment);
		}

		void copy(video_info const& src, info::v1::VideoInfo& dst) {
			if (src.credits) dst.set_credits(*src.credits);
			if (src.end_of_watch) dst.set_end_of_watch(*src.end_of_watch);
			if (src.has_a_valid_marker())
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
		          watch_offset const& watch,
		          info::v1::MovieInfo& dst,
		          std::span<std::string const> langs) {
			dst.set_id(key);
			dst.set_has_video(!!src.video_file);
			v1::copy(src, dst, langs, src.local_people_refs);
			v1::copy(links, *dst.mutable_links());
			v1::copy(episodes, *dst.mutable_episodes());

			if (src.link_flags & extended_info::has_prev)
				v1::copy(src.prev, *dst.mutable_prev(), langs);

			if (src.link_flags & extended_info::has_next)
				v1::copy(src.next, *dst.mutable_next(), langs);

			if (src.is_episode) v1::copy(src.series_id, *dst.mutable_parent());
			if (watch) v1::copy(watch, *dst.mutable_last_watched());
		}

		size_t cap(int isize) {
			if (isize < 0) return 0;
			return static_cast<size_t>(isize);
		}

		template <typename Request>
		std::string debug_str_base(Request const& req) {
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

		std::string debug_str(db::v1::GetListingRequest const& req) {
			return debug_str_base(req);
		}

		std::string debug_str(db::v1::GetFilterListingRequest const& req) {
			auto const std_dbg = debug_str_base(req);
			return fmt::format("{}/{}{}{}", req.category(), req.term(),
			                   std_dbg.empty() ? "" : ", ", std_dbg);
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
		lwsl_user("GetListing(%s)\n", debug_str(req).c_str());

		auto const filters = from_req(req.filters());
		auto const sort = from_req(req.sort());
		std::string const* search = nullptr;
		if (req.has_search()) search = &req.search();

		movies::session data{session};

		auto const result =
		    server()->listing(search ? *search : std::string{}, filters, sort,
		                      true, true, data.tr(), data.langs());
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
		lwsl_user("   -> %zu group%s, %zu title%s\n", groups, s(groups), refs,
		          s(refs));
	}

	MSG_HANDLER(GetFilterListing) {
		lwsl_user("GetFilterListing(%s)\n", debug_str(req).c_str());

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
			auto group =
			    server()->listing(search ? *search : std::string{}, filters,
			                      sort, false, false, data.tr(), data.langs());
			if (!group.empty()) result = std::move(group.front().items);
		}

		v1::copy(result, *resp.mutable_items());
		v1::copy(links, *resp.mutable_links());
		if (title) v1::copy(*title, *resp.mutable_title());

		static constexpr auto s = [](size_t count) {
			return count == 1 ? "" : "s";
		};
		lwsl_user("   -> %zu title%s\n", result.size(), s(result.size()));
		if (title) lwsl_user("   -> \"%s\"\n", title->c_str());
	}

	MSG_HANDLER(GetMovieInfo) {
		lwsl_user("GetMovieInfo(%s)\n", req.key().c_str());
		movies::session data{session};

		auto info = server()->find_movie_copy(req.key());
		auto const episodes =
		    server()->get_episodes(info.episodes, data.langs());
		auto const watch = server()->get_watch_time(req.key());

		copy(info, req.key(), server()->links_for(info, data.tr()), episodes,
		     watch, *resp.mutable_info(), data.langs());
		if (resp.info().title().has_local())
			lwsl_user("   -> \"%s\"\n", resp.info().title().local().c_str());
		else
			lwsl_user("   -> untitled\n");
	}

	MSG_HANDLER(GetVideoFile) {
		lwsl_user("GetVideoFile(%s)\n", req.key().c_str());
		auto resource = server()->get_video_path(req.key());
		if (resource) {
			auto const generic = resource->generic_u8string();
			resp.set_uri(fmt::format("/{}", as_sv(generic)));

			auto const info = server()->get_video_info(req.key());
			if (info) v1::copy(info, *resp.mutable_info());
			auto const watch = server()->get_watch_time(req.key());
			if (watch) v1::copy(watch, *resp.mutable_last_watched());

			lwsl_user("   -> %s\n", resp.uri().c_str());
		} else {
			lwsl_user("   -> no video\n");
		}
	}

	MSG_HANDLER(SetVideoPosition) {
		silent = true;
		server()->set_watch_time(req.key(),
		                         {.offset = req.last_watched().where(),
		                          .timestamp = req.last_watched().when()});
	}

	MSG_HANDLER(SetVideoInfo) {
		lwsl_user("SetVideoInfo(%s)\n", req.key().c_str());
		auto const& src = req.info();
		video_info info{};
		if (src.has_credits()) info.credits = src.credits();
		if (src.has_end_of_watch()) info.end_of_watch = src.end_of_watch();
		auto const& markers = src.markers();
		info.markers.reserve(cap(markers.size()));
		for (auto const& marker : markers) {
			info.markers.emplace_back();
			auto& next = info.markers.back();
			next.kind = static_cast<movies::marker::type>(marker.type());
			if (marker.has_start()) next.start = marker.start();
			if (marker.has_stop()) next.stop = marker.stop();
			if (marker.has_comment()) next.comment = marker.comment();
			if (!next) info.markers.pop_back();
		}
		server()->set_video_info(req.key(), info);
	}
}  // namespace movies::db::v1
