// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <base/extended_info.hh>
#include <memory>
#include <server/lngs.hh>

namespace movies {
	struct group_header {
		std::string id;
		std::string label;
	};

	struct sort_types {
		std::string field;
		std::string label;
		std::optional<std::string> icon;
		bool ascByDefault;
	};

	class sort {
	public:
		using ptr = std::unique_ptr<sort>;
		using list = std::vector<ptr>;

		virtual ~sort();
		virtual int compare(extended_info const&,
		                    extended_info const&,
		                    std::span<std::string const> langs) const noexcept = 0;
		virtual group_header header_for(extended_info const&,
		                                app::Strings const&,
		                                std::span<std::string const> langs) const = 0;
		virtual std::string sort_hint_for(extended_info const&,
		                                  app::Strings const&,
		                                  std::span<std::string const> langs) const = 0;

		static ptr make(std::string const& term);
		static std::vector<sort_types> get_config(app::Strings const&);

		static int compare(list const&,
		                   std::string const&,
		                   std::string const&,
		                   movie_db const&,
		                   std::span<std::string const> langs) noexcept;
	};
}  // namespace movies
