// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX

#include <base/overload.hh>
#include <regions/mapping.hh>
#include <rpc/session.hh>
#include <rpc/ui.hh>
#include "appstr.hh"

#ifdef _WIN32
#include <shellapi.h>
#pragma comment(lib, "shell32.lib")
#else
#include <sys/wait.h>
#include <unistd.h>
#include <cstdio>
#endif

#define OPT_COPY(FLD) \
	if (src.FLD) v1::copy(*src.FLD, *dst.mutable_##FLD())
#define OPT_SET(FLD) \
	if (src.FLD) dst.set_##FLD(*src.FLD)
#define COPY(FLD) v1::copy(src.FLD, *dst.mutable_##FLD())
#define COPY_TR(FLD) v1::copy(src.FLD, *dst.mutable_##FLD(), tr)
#define COPY_LANG(FLD) v1::copy(tr(src.FLD), *dst.mutable_##FLD())
#define SET(FLD) dst.set_##FLD(src.FLD)
#define SET_AS(FLD, TYPE) dst.set_##FLD(static_cast<TYPE>(src.FLD))

namespace movies::ui::v1 {
	namespace {
		using google::protobuf::RepeatedField;
		using google::protobuf::RepeatedPtrField;

		inline size_t as_size(int size) {
			return size < 0 ? 0 : static_cast<size_t>(size);
		}

		void copy(std::string_view src, std::string& dst) { dst.assign(src); }

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
				dst.Add(static_cast<int32_t>(val));
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

		void copy(std::vector<sort_types> const& src,
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
			SET_AS(low, int32_t);
			SET_AS(high, int32_t);
			SET(is_optional);
			std::visit(overload{
			               [&](unsigned step) {
				               dst.set_step(static_cast<int32_t>(step));
			               },
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

		void copy(std::vector<description::filter> const& src,
		          RepeatedPtrField<filters::v1::FilterDescription>& dst,
		          app::Strings const& tr) {
			dst.Reserve(ws::isize(src));

			for (auto const& val : src) {
				copy(val, *dst.Add(), tr);
			}
		}

		std::string log_request(LangChangeRequest const& req) {
			return fmt::format("{}", fmt::join(req.lang_id(), ", "));
		}

		std::string log_request(GetConfigRequest const&) { return {}; }

		std::string const& log_request(OpenMovieRequest const& req) {
			return req.id();
		}

#ifdef _WIN32
		void open_file(std::filesystem::path const& file) {
			ShellExecuteW(nullptr, nullptr, file.c_str(), nullptr,
			              file.parent_path().c_str(), SW_SHOW);
		}
#else
		std::string which(std::string_view exec) {
			std::string result{};
			auto pathvar = std::string_view{
			    getenv("PATH")};  // NOLINT(concurrency-mt-unsafe)
			auto pos = std::string::npos;

			do {
				pos = pathvar.find(':');
				auto const dirname =
				    pos == std::string::npos ? pathvar : pathvar.substr(0, pos);
				pathvar = pos == std::string::npos ? std::string_view{}
				                                   : pathvar.substr(pos + 1);
				result.reserve(dirname.length() + exec.length());
				result.assign(dirname);
				result.push_back('/');
				result.append(exec);

				if (!access(result.c_str(), X_OK)) return result;
			} while (pos != std::string::npos);

			return {};
		}

		void open_file(std::filesystem::path const& file) {
			auto path = file.generic_string();
			auto executable = which("xdg-open"sv);
			if (executable.empty()) return;
			char* argv[] = {executable.data(), path.data(), nullptr};

			auto const pid = fork();
			if (pid == 0) {
				execv(executable.c_str(), argv);
				_exit(1);
			} else if (pid < 0) {
				printf("%s error: %d\n", executable.c_str(), pid);
			} else if (pid > 0) {
				int status{};
				waitpid(pid, &status, 0);
				if (status)
					printf("%s returned: %d\n", executable.c_str(), status);
			}
		}
#endif

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
		auto const& lang_ids = req.lang_id();
		std::vector<std::string> langs{};
		langs.reserve(as_size(lang_ids.size()));
		for (auto const& id : lang_ids)
			langs.push_back(id);

		auto full_langs = session_info::expand(langs);
		if (full_langs != langs) {
			session.log("   => {}", fmt::join(full_langs, ", "));
		}

		auto data = session.data<session_info::ptr>();
		if (data->client_id().empty()) {
			if (!req.has_client_id() || req.client_id().empty())
				data->client_id(session::invent_id());
			else
				data->client_id(req.client_id());
		}
		auto const changed = data->lang_change(full_langs);

		*resp.mutable_lang_id() = data->lang_id();
		*resp.mutable_client_id() = data->client_id();
		session.log("   -> {} [{}changed]", resp.lang_id(),
		            (changed ? "" : "not "));
		session.log("   -> {}", data->client_id());
		if (data->client_id() != session.name())
			session.name(data->client_id());
	}

	MSG_HANDLER(GetConfig) {
		movies::session data{session};
		auto const& tr = data.tr();

		copy(sort::get_config(tr), *resp.mutable_sort(), tr);
		copy(server()->current_filters(), *resp.mutable_filters(), tr);
		copy(server()->title(), *resp.mutable_title());

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

		copy_strings(tr, *resp.mutable_app());
	}

	MSG_HANDLER(OpenMovie) {
		auto resource = server()->get_video_resource(req.id());
		if (resource) {
			auto filename = server()->videos_dir() / *resource;
			filename.make_preferred();
			open_file(filename);
			session.log("   -> {}", as_ascii_view(filename.u8string()));
		} else {
			session.log("   -> no video");
		}
	}
}  // namespace movies::ui::v1
