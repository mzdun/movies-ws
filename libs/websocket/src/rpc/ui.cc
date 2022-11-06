// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/overload.hh>
#include <rpc/ui.hh>

#define OPT_COPY(FLD) \
	if (src.FLD) copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD) copy(src.FLD, *dst.mutable_##FLD())
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

		void copy(std::vector<unsigned> const& src,
		          RepeatedField<int32_t>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src)
				dst.Add(val);
		}

		#define COPY_ID() copy_id(src, *dst.mutable_id())
		template <typename Src, typename Dst>
		void copy_id(Src const& src, Dst& dst) {
			COPY(field);
			COPY(label);
			/*
			optional string icon = 3;
			*/
		}

		void copy(sort_types const& src, filters::v1::SortDescription& dst) {
			COPY_ID();
			if (src.ascByDefault) dst.set_asc_by_default(true);
		}

		void copy(vector<sort_types> const& src,
		          RepeatedPtrField<filters::v1::SortDescription>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add());
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
		          filters::v1::OnOffFilterDescription& dst) {}

		void visit(description::range_filter const& src,
		           filters::v1::FilterDescription& dst) {
			COPY_ID();
			copy(src, *dst.mutable_range());
		}
		void visit(description::tokens_filter const& src,
		           filters::v1::FilterDescription& dst) {
			COPY_ID();
			copy(src, *dst.mutable_tokens());
		}
		void visit(description::on_off_filter const& src,
		           filters::v1::FilterDescription& dst) {
			COPY_ID();
			copy(src, *dst.mutable_on_off());
		}

		void copy(description::filter const& src,
		          filters::v1::FilterDescription& dst) {
			std::visit([&](auto const& src) { visit(src, dst); }, src);
		}

		void copy(vector<description::filter> const& src,
		          RepeatedPtrField<filters::v1::FilterDescription>& dst) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add());
			}
		}
	}  // namespace

	MSG_HANDLER(LangChange) {
		std::string dbg{};
		for (auto const& lng : req.lang_id()) {
			if (!dbg.empty()) dbg += ", ";
			dbg.append(lng);
		}
		lwsl_user("GetConfig(%s)\n", dbg.c_str());
		return true;
	}

	MSG_HANDLER(GetConfig) {
		lwsl_user("GetConfig()\n");
		copy(sort::get_config(), *resp.mutable_sort());
		copy(server()->current_filters(), *resp.mutable_filters());
		return true;
	}
}  // namespace movies::ui::v1
