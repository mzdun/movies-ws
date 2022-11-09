// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/overload.hh>
#include <regions/mapping.hh>
#include <rpc/ui.hh>

#define OPT_COPY(FLD) \
	if (src.FLD) v1::copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD) v1::copy(src.FLD, *dst.mutable_##FLD())
#define COPY_TR(FLD) v1::copy(src.FLD, *dst.mutable_##FLD(), tr)
#define COPY_LANG(FLD) v1::copy(tr(src.FLD), *dst.mutable_##FLD())
#define SET(FLD) dst.set_##FLD(src.FLD)

namespace movies::ui::v1 {
	namespace {
		using google::protobuf::RepeatedField;
		using google::protobuf::RepeatedPtrField;

		void copy(std::string_view src, std::string& dst) {
			dst.assign(src);
		}

		void copy(unsigned src, uint32_t& dst) {
			dst = src;
		}

		void copy(std::vector<std::string> const& src,
		          RepeatedPtrField<std::string>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add());
			}
		}

		void copy(app::lng src, std::string& dst, app::Strings const& tr) {
			copy(tr(src), dst);
		}

		void copy(std::string_view src, std::string& dst, app::Strings const&) {
			copy(src, dst);
		}

		void copy(std::vector<unsigned> const& src,
		          RepeatedField<int32_t>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src)
				dst.Add(val);
		}

#define COPY_ID() copy_id(src, *dst.mutable_id(), tr)
		template <typename Src>
		void copy_id(Src const& src,
		             filters::v1::DescriptionId& dst,
		             app::Strings const& tr) {
			COPY(field);
			COPY_TR(label);
			/*
			optional string icon = 3;
			*/
		}

		void copy(sort_types const& src,
		          filters::v1::SortDescription& dst,
		          app::Strings const& tr) {
			COPY_ID();
			if (src.ascByDefault) dst.set_asc_by_default(true);
		}

		void copy(vector<sort_types> const& src,
		          RepeatedPtrField<filters::v1::SortDescription>& dst,
		          app::Strings const& tr) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add(), tr);
			}
		}

		void copy(std::vector<unsigned> const& src,
		          filters::v1::RangeFilterDescription_List& dst) {
			copy(src, *dst.mutable_items());
		}

		void copy(description::range_filter const& src,
		          filters::v1::RangeFilterDescription& dst) {
			SET(low);
			SET(high);
			SET(is_optional);
			std::visit(overload{
			               [&](unsigned step) { dst.set_step(step); },
			               [&](std::vector<unsigned> const& steps) {
				               copy(steps, *dst.mutable_steps());
			               },
			           },
			           src.steps);
		}
		void copy(description::tokens_filter const& src,
		          filters::v1::TokensFilterDescription& dst) {
			COPY(values);
		}
		void copy(description::on_off_filter const& src,
		          filters::v1::OnOffFilterDescription& dst,
		          app::Strings const& tr) {
			COPY_TR(opposite_label);
		}

		void visit(description::range_filter const& src,
		           filters::v1::FilterDescription& dst,
		           app::Strings const& tr) {
			COPY_ID();
			copy(src, *dst.mutable_range());
		}
		void visit(description::tokens_filter const& src,
		           filters::v1::FilterDescription& dst,
		           app::Strings const& tr) {
			COPY_ID();
			copy(src, *dst.mutable_tokens());
		}
		void visit(description::on_off_filter const& src,
		           filters::v1::FilterDescription& dst,
		           app::Strings const& tr) {
			COPY_ID();
			copy(src, *dst.mutable_on_off(), tr);
		}

		void copy(description::filter const& src,
		          filters::v1::FilterDescription& dst,
		          app::Strings const& tr) {
			std::visit([&](auto const& src) { visit(src, dst, tr); }, src);
		}

		void copy(vector<description::filter> const& src,
		          RepeatedPtrField<filters::v1::FilterDescription>& dst,
		          app::Strings const& tr) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add(), tr);
			}
		}

		struct tag_info {
			std::string_view known_tag;
			tags::lng label;
		};

		constexpr tag_info tags[] = {
		    {"upcoming"sv, tags::lng::TAG_UPCOMING},
		    {"server-archived"sv, tags::lng::TAG_ARCHIVED},
		    {"lastchance"sv, tags::lng::TAG_LAST_CHANCE},
		    {"explicit"sv, tags::lng::TAG_EXPLICIT},
		};
	}  // namespace

	MSG_HANDLER(LangChange) {
		std::string dbg{};
		for (auto const& lng : req.lang_id()) {
			if (!dbg.empty()) dbg += ", ";
			dbg.append(lng);
		}
		lwsl_user("GetConfig(%s)\n", dbg.c_str());

		auto const& lang_ids = req.lang_id();

		std::vector<std::string> langs{};
		langs.reserve(lang_ids.size());
		for (auto const& id : lang_ids)
			langs.push_back(id);

		auto const changed = server()->lang_change(langs);
		*resp.mutable_lang_id() = server()->lang_id();
		lwsl_user("   -> %s [%schanged]\n", server()->lang_id().c_str(),
		          (changed ? "" : "not "));

		return true;
	}

	MSG_HANDLER(GetConfig) {
		lwsl_user("GetConfig()\n");
		auto const& tr = server()->tr();

		copy(sort::get_config(server()->tr()), *resp.mutable_sort(), tr);
		copy(server()->current_filters(), *resp.mutable_filters(), tr);

		{
			auto& dst_tags = *resp.mutable_tags();
			dst_tags.Reserve(ws::isize(tags));
			for (auto const& [tag, lng] : tags) {
				auto& dst = *dst_tags.Add();
				auto const value = tr(lng);
				dst.set_key(tag.data(), tag.size());
				dst.set_value(value.data(), value.size());
			}
		}

		{
			auto& dst_countries = *resp.mutable_countries();
			dst_countries.Reserve(ws::isize(region::names));
			for (auto const& [id, lng] : region::names) {
				auto& dst = *dst_countries.Add();
				auto const value = tr(lng);
				dst.set_key(id.data(), id.size());
				dst.set_value(value.data(), value.size());
			}
		}
		return true;
	}
}  // namespace movies::ui::v1
