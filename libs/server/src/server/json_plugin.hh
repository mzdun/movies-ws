// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <fmt/format.h>
#include <base/logger.hh>
#include <server/plugin.hh>

std::filesystem::path exec_path();  // this lives in startup lib

namespace movies {
	struct json_link {
		std::optional<string_type> href{};
		std::optional<string_type> icon{};
		std::optional<string_type> label{};
		std::optional<string_type> alt{};
		std::optional<string_type> rel{};

		void clear();
		json_link override_with(json_link const& rhs) const;
		bool load(std::u8string_view name,
		          json::map const& data,
		          bool assume_noreferrer);
		void print(std::u8string_view prefix,
		           std::source_location const&) const;

		bool operator==(json_link const&) const noexcept = default;

	private:
		std::optional<string_type> overriden(
		    std::optional<string_type> const& mine,
		    std::optional<string_type> const& from_regex) const {
			return from_regex ? from_regex : mine;
		}

		void print(std::source_location const& loc,
		           std::u8string_view prefix,
		           std::u8string_view name,
		           std::optional<string_type> const& value) const {
			if (!value) return;
			if (value->length() > 50) {
				logger(loc).info("{}{} = {}...", as_ascii_view(prefix),
				                 as_ascii_view(name),
				                 as_ascii_view(*value).substr(0, 50));
			} else {
				logger(loc).info("{}{} = {}", as_ascii_view(prefix),
				                 as_ascii_view(name), as_ascii_view(*value));
			}
		}
	};

	struct json_plugin_info {
		bool valid{false};
		json_link base{};
		std::map<string_type, json_link> regex{};

		json_link match(string_type const& id) const;
		void clear();
		void print(std::u8string_view prefix,
		           std::source_location const& =
		               std::source_location::current()) const;
		static json_plugin_info load(std::u8string_view name,
		                             std::filesystem::path const& filename);

		bool operator==(json_plugin_info const&) const noexcept = default;
	};

	class json_plugin : public page_link_plugin<> {
	public:
		json_plugin(string_type prefix, json_plugin_info&& info)
		    : page_link_plugin<>{std::move(prefix)}, info_{std::move(info)} {}

		link current_url(string_type const& id) const;

		bool eq(plugin const& rhs) const noexcept final {
			return rhs.eq_double_disp(*this);
		}
		bool eq_double_disp(json_plugin const&) const noexcept final;

	private:
		json_plugin_info info_;
	};
}  // namespace movies
