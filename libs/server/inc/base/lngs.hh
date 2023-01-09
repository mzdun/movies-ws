// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <fmt/format.h>
#include <regions/lngs.hh>
#include <server/lngs.hh>
#include <tags/lngs.hh>
#include <webapp/lngs.hh>

using namespace std::literals;

namespace movies {
	template <typename StringsType>
	struct strings_traits;
#define STRINGS_TRAITS(TYPE, FILE)                                    \
	template <>                                                       \
	struct strings_traits<TYPE> {                                     \
		static std::string filename() { return #FILE##s; }            \
		static std::string_view filename_view() { return #FILE##sv; } \
	}

	template <typename Base>
	struct Named : Base {
		void init(std::filesystem::path const& base) {
			this->init_builtin();
			this->template path_manager<lngs::manager::ExtensionPath>(
			    base, strings_traits<Base>::filename());
		}

		bool open_one_of(std::vector<std::string> const& langs,
		                 std::optional<std::string>& used_lang,
		                 bool fatal) {
			for (auto const& lang : langs) {
				if (this->open(lang)) {
					if (fatal) used_lang = lang;
					return true;
				}
			}

			return !fatal;
		}
	};

	template <typename... Base>
	struct Wrapped : Named<Base>... {
		using Base::operator()...;

		void init(std::filesystem::path const& base) {
			(Named<Base>::init(base), ...);
		}

		std::optional<std::string> open_one_of(
		    std::vector<std::string> const& langs) {
			return open_one(langs, std::index_sequence_for<Base...>{});
		}

	private:
		template <size_t... Index>
		std::optional<std::string> open_one(
		    std::vector<std::string> const& langs,
		    std::index_sequence<Index...>) {
			std::optional<std::string> result;
			(Named<Base>::open_one_of(langs, result, Index == 0), ...);
			return result;
		}
	};

	STRINGS_TRAITS(app::Strings, server);
	STRINGS_TRAITS(tags::Strings, tags);
	STRINGS_TRAITS(region::Strings, regions);
	STRINGS_TRAITS(web::Strings, webapp);

	using Strings =
	    Wrapped<app::Strings, tags::Strings, region::Strings, web::Strings>;
}  // namespace movies