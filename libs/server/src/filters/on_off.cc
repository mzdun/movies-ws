// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include "on_off.hh"

using namespace std::literals;

namespace movies::filters {

#define ON_OFF(NAME) \
	bool NAME##_filter::access(extended_info const& data) const noexcept

	ON_OFF(available) {
		return !(!data.video_file && data.has_tag(SV("server-archived")));
	}

	ON_OFF(is_series) { return !data.episodes.empty(); }

	ON_OFF(is_episode) { return data.is_episode; }

	ON_OFF(has_video) { return !!data.video_file; }

	ON_OFF(has_info) { return !!data.info_file; }

	ON_OFF(has_imdb) {
		static constexpr auto prefix = SV("imdb:");
		for (auto const& ref : data.refs) {
			if (ref.starts_with(prefix)) return true;
		}
		return false;
	}

	namespace {
		struct on_off_filter_info {
			std::string_view name;
			filter::ptr (*make)(bool on);
		};

#define X_ON_OFF_FACTORY(NAME, LABEL) {#NAME##sv, NAME##_filter::factory},
		constexpr on_off_filter_info on_off_filters[] = {
		    ON_OFF_FILTER(X_ON_OFF_FACTORY)};
	}  // namespace
}  // namespace movies::filters

namespace movies {
	filter::ptr filter::make_on_off(std::string_view field, bool on) {
		for (auto const& [name, factory] : filters::on_off_filters) {
			if (field == name) return factory(on);
		}
		return {};
	}
}  // namespace movies
