// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <io/file.hpp>
#include <regex>

#include "json_plugin.hh"

std::filesystem::path exec_path();  // this lives in startup lib

namespace movies {
	void json_link::clear() {
		href = std::nullopt;
		icon = std::nullopt;
		label = std::nullopt;
		alt = std::nullopt;
		rel = std::nullopt;
	}

	json_link json_link::override_with(json_link const& rhs) const {
#define OVERRIDE(NAME) .NAME = overriden(NAME, rhs.NAME)
		return {OVERRIDE(href), OVERRIDE(icon), OVERRIDE(label), OVERRIDE(alt),
		        OVERRIDE(rel)};
	}

	bool json_link::load(std::u8string_view name,
	                     json::map const& data,
	                     bool assume_noreferrer) {
#define LOADS(NAME)                                           \
	{                                                         \
		auto it = data.find(u8## #NAME##s);                   \
		if (it != data.end()) {                               \
			auto str = cast<json::string>(it->second);        \
			if (!str) {                                       \
				fmt::print(stderr, "{}.{} is not a string\n", \
				           as_ascii_view(name), #NAME##sv);   \
				return false;                                 \
			}                                                 \
			NAME = as_string_v(*str);                         \
		} else {                                              \
			NAME = std::nullopt;                              \
		}                                                     \
	}
		LOADS(href);
		LOADS(icon);
		LOADS(label);
		LOADS(alt);

		{
			auto it = data.find(u8"rel"s);
			if (it != data.end()) {
				auto str = cast<json::string>(it->second);
				auto nil = cast<std::nullptr_t>(it->second);
				if (!str && !nil) {
					fmt::print(stderr,
					           "{}.rel is neither a string, nor a null\n",
					           as_ascii_view(name));
					return false;
				}
				if (str) {
					rel = as_string_v(*str);
				} else {
					rel = std::nullopt;
				}
			} else if (assume_noreferrer) {
				rel = as_string_v(link::noreferrer);
			} else {
				rel = std::nullopt;
			}
		}

		return true;
	}

	void json_link::print(std::u8string_view prefix,
	                      std::source_location const& loc) const {
		print(loc, prefix, u8"href"sv, href);
		print(loc, prefix, u8"icon"sv, icon);
		print(loc, prefix, u8"label"sv, label);
		print(loc, prefix, u8"alt"sv, alt);
		print(loc, prefix, u8"rel"sv, rel);
	}

	json_link json_plugin_info::match(string_type const& id) const {
		if (!regex.empty()) {
			auto matched = as_ascii_string_v(id);
			for (auto const& [key, info] : regex) {
				if (!std::regex_match(matched,
				                      std::regex{as_ascii_string_v(key)}))
					continue;

				return base.override_with(info);
			}
		}
		return base;
	}

	void json_plugin_info::clear() {
		valid = false;
		base.clear();
		regex.clear();
	}

	void json_plugin_info::print(std::u8string_view prefix,
	                             std::source_location const& loc) const {
		base.print(prefix, loc);
		for (auto const& [key, re] : regex) {
			std::u8string key_prefix;
			key_prefix.assign(prefix);
			key_prefix.push_back('"');
			key_prefix.append(as_utf8_view(key));
			key_prefix.push_back('"');
			key_prefix.push_back('.');
			re.print(key_prefix, loc);
		}
	}

	json_plugin_info json_plugin_info::load(
	    std::u8string_view name,
	    std::filesystem::path const& filename) {
		json_plugin_info result{};

		auto const data = io::contents(filename);
		auto node = json::read_json({data.data(), data.size()});
		auto items = cast<json::map>(node);

		if (!items) {
			return result;
		}

		if (!result.base.load(name, *items, true)) {
			result.base.clear();
			return result;
		}

		auto links = cast<json::map>(node, u8"links"s);
		if (links) {
			for (auto const& [key, child] : *links) {
				auto link = cast<json::map>(child);
				if (!link) continue;
				std::u8string regex{};
				regex.reserve(key.size() + 2);
				if (!key.starts_with('^')) regex.push_back('^');
				regex.append(key);
				if (!key.ends_with('$')) regex.push_back('$');

				std::u8string subkey{};
				subkey.assign(name);
				subkey.push_back('.');
				subkey.push_back('"');
				subkey.append(regex);
				subkey.push_back('"');
				if (!result.regex[as_string(std::move(regex))].load(
				        subkey, *link, false)) {
					result.clear();
					return result;
				}
			}
		}

		if (!result.base.href) {
			for (auto const& [key, regex] : result.regex) {
				if (regex.href) continue;
				fmt::print(stderr, "{}.\"{}\".href is missing\n",
				           as_ascii_view(name), as_ascii_view(key));
				result.clear();
				return result;
			}

			if (result.regex.empty()) {
				fmt::print(stderr, "{}.href is missing\n", as_ascii_view(name));
				result.clear();
				return result;
			}
		}

		result.valid = true;
		return result;
	}

	link json_plugin::current_url(string_type const& id) const {
		auto matched = info_.match(id);
		if (!matched.href || matched.href->empty()) return {};

		static constexpr auto placeholder = SV("{id}");
		auto const pos = matched.href->find(placeholder);
		if (pos == std::u8string::npos) {
			return {
			    .href = std::move(*matched.href),
			    .icon = std::move(matched.icon),
			    .label = std::move(matched.label),
			    .alt = std::move(matched.alt),
			    .rel = std::move(matched.rel),
			};
		}

		auto view = as_view(*matched.href);
		string_type href{};
		href.reserve(matched.href->length() - placeholder.length() +
		             id.length());
		href.append(view.substr(0, pos));
		href.append(id);
		href.append(view.substr(pos + placeholder.length()));
		return {
		    .href = std::move(href),
		    .icon = std::move(matched.icon),
		    .label = std::move(matched.label),
		    .alt = std::move(matched.alt),
		    .rel = std::move(matched.rel),
		};
	}

	bool json_plugin::eq_double_disp(json_plugin const& rhs) const noexcept {
		return prefix() == rhs.prefix() && info_ == rhs.info_;
	}

	plugin::list plugin::load_plugins(std::filesystem::path const& database) {
		plugin::list result{};

		std::map<string_type, json_plugin_info> jsons{};

		for (auto const& dir : {exec_path().parent_path(), database}) {
			std::error_code ec{};
			auto entries =
			    std::filesystem::directory_iterator{dir / "plugins"sv, ec};
			if (ec) continue;
			for (auto const& entry : entries) {
				auto key = entry.path().stem().generic_u8string();
				auto config = json_plugin_info::load(key, entry.path());
				if (!config.valid) continue;
				jsons[as_string(std::move(key))] = config;
			}
		}

		result.reserve(jsons.size());
		for (auto& [name, cfg] : jsons) {
#ifndef NDEBUG
			cfg.print(name + u8".");
#endif

			result.push_back(
			    std::make_unique<json_plugin>(name, std::move(cfg)));
		}

		return result;
	}
}  // namespace movies
