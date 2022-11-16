// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include <rpc/db.hh>

namespace movies::db::v1 {
	namespace {
		using google::protobuf::RepeatedPtrField;

		void copy(std::string_view src, std::string& dst) {
			dst.assign(src);
		}

		void copy(std::u8string_view src, std::string& dst) {
			dst.assign(as_sv(src));
		}

		void copy(unsigned src, uint32_t& dst) {
			dst = src;
		}

		template <typename Src, typename Dst>
		inline void copy(std::vector<Src> const& src,
		                 RepeatedPtrField<Dst>& dst);

#define OPT_COPY(FLD) \
	if (src.FLD) v1::copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD) v1::copy(src.FLD, *dst.mutable_##FLD())
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

		void copy(title_info const& src, info::v1::TitleInfo& dst) {
			OPT_COPY(local);
			OPT_COPY(orig);
		}

		void copy(person_info const& src, info::v1::PersonInfo& dst) {
			COPY(key);
			OPT_COPY(contribution);
		}

		void copy(crew_info const& src, info::v1::CrewInfo& dst) {
			COPY(directors);
			COPY(writers);
			COPY(cast);
		}

		void copy(std::map<std::u8string, std::u8string> const& src,
		          RepeatedPtrField<info::v1::PeopleMap>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& [key, name] : src) {
				auto& dst_item = *dst.Add();
				copy(key, *dst_item.mutable_key());
				copy(name, *dst_item.mutable_name());
			}
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

		void copy(movie_info const& src, info::v1::MovieInfo& dst) {
			COPY(title);
			COPY(crew);
			COPY(people);
			COPY(genres);
			COPY(countries);
			copy(src.age, *dst.mutable_age_rating());
			OPT_COPY(summary);
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

		void copy(extended_info::link const& src, info::v1::MovieLink& dst) {
			COPY(id);
			COPY(title);
		}

		template <typename Src, typename Dst>
		inline void copy(std::vector<Src> const& src,
		                 RepeatedPtrField<Dst>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				v1::copy(val, *dst.Add());
			}
		}

		void copy(extended_info const& src,
		          std::string const& key,
		          std::vector<link> const& links,
		          std::vector<reference> const& episodes,
		          info::v1::MovieInfo& dst) {
			dst.set_id(key);
			dst.set_has_video(!!src.video_file);
			v1::copy(src.info, dst);
			v1::copy(links, *dst.mutable_links());
			v1::copy(episodes, *dst.mutable_episodes());

			if (src.link_flags & extended_info::has_prev)
				v1::copy(src.prev, *dst.mutable_prev());

			if (src.link_flags & extended_info::has_next)
				v1::copy(src.next, *dst.mutable_next());

			if (src.is_episode) v1::copy(src.series_id, *dst.mutable_parent());
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
			return movies::filter::make_range(
			    rng.field(), rng.low(), rng.high(), rng.include_missing());
		}

		filter::ptr filter_from(filters::v1::TokensFilter const& tokens) {
			std::vector<std::string> dst{};
			auto const& src = tokens.token();
			dst.reserve(src.size());
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
			}
			return {};
		}

		filter::list from_req(
		    RepeatedPtrField<filters::v1::Filter> const& filters,
		    filter::ptr prefix = {}) {
			filter::list result{};
			result.reserve(filters.size() + (prefix ? 1 : 0));
			if (prefix) result.push_back(std::move(prefix));

			for (auto const& filter : filters) {
				auto flt = filter_from(filter);
				if (flt) result.push_back(std::move(flt));
			}

			return result;
		}

		sort::list from_req(RepeatedPtrField<std::string> const& sort) {
			sort::list result{};
			result.reserve(sort.size());

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

		auto const result = server()->listing(search ? *search : std::string{},
		                                      filters, sort, true, true);
		size_t groups = 0, refs = 0;
		for (auto const& grp : result) {
			++groups;
			for (auto const& item : grp.items)
				++refs;
		}
		copy(result, *resp.mutable_groups());
		static constexpr auto s = [](size_t count) {
			return count == 1 ? "" : "s";
		};
		lwsl_user("   -> %zu group%s, %zu title%s\n", groups, s(groups), refs,
		          s(refs));
		return true;
	}

	MSG_HANDLER(GetFilterListing) {
		lwsl_user("GetFilterListing(%s)\n", debug_str(req).c_str());

		auto const filters =
		    from_req(req.filters(),
		             movies::filter::make_term(req.category(), req.term()));
		auto const sort = from_req(req.sort());
		std::string const* search = nullptr;
		if (req.has_search()) search = &req.search();

		std::vector<reference> result;
		{
			auto group = server()->listing(search ? *search : std::string{},
			                               filters, sort, false, false);
			if (!group.empty()) result = std::move(group.front().items);
		}

		copy(result, *resp.mutable_items());
		static constexpr auto s = [](size_t count) {
			return count == 1 ? "" : "s";
		};
		lwsl_user("   -> %zu title%s\n", result.size(), s(result.size()));
		return true;
	}

	MSG_HANDLER(GetMovieInfo) {
		lwsl_user("GetMovieInfo(%s)\n", req.key().c_str());
		auto info = server()->find_movie_copy(req.key());
		auto const episodes = server()->get_episodes(info.info.episodes);
		copy(info, req.key(), server()->links_for(info), episodes,
		     *resp.mutable_info());
		if (resp.info().title().has_local())
			lwsl_user("   -> \"%s\"\n", resp.info().title().local().c_str());
		else
			lwsl_user("   -> untitled\n");
		return true;
	}

	MSG_HANDLER(GetVideoFile) {
		lwsl_user("GetVideoFile(%s)\n", req.key().c_str());
		auto info = server()->find_movie_copy(req.key());
		if (info.video_file) {
			auto const view = as_sv(info.video_file->id);
			resp.set_uri(fmt::format("/videos/{}.mp4", view));
			lwsl_user("   -> %s\n", resp.uri().c_str());
		} else {
			lwsl_user("   -> no video\n");
		}
		return true;
	}
}  // namespace movies::db::v1