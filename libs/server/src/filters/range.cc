// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include <concepts>
#include <filters/filter.hh>
#include <set>

#include "internal.hh"

using namespace std::literals;

namespace movies {
	namespace {
		template <typename Value>
		class range_filter : public filter {
		public:
			range_filter(unsigned low, unsigned high, bool include_missing)
			    : low_{copy_value(low, tag<Value>{})}
			    , high_{copy_value(high, tag<Value>{})}
			    , include_missing_{include_missing} {}

			bool matches(extended_info const& data) const noexcept final {
				auto const opt = access(data);
				if (!opt) return include_missing_;

				auto const value = opt.value();
				return (low_ <= value) && (high_ >= value);
			}

			template <std::derived_from<range_filter<Value>> Filter>
			static ptr factory(unsigned low,
			                   unsigned high,
			                   bool include_missing) {
				return std::make_unique<Filter>(low, high, include_missing);
			}

		private:
			virtual std::optional<Value> access(
			    extended_info const&) const noexcept = 0;
			Value low_{};
			Value high_{};
			bool include_missing_{};
		};

#define X_DEFINE_RANGE_FILTER(FIELD, ACCESS, TYPE, LABEL)            \
	class FIELD##_range_filter : public range_filter<TYPE> {  \
	public:                                                   \
		using range_filter<TYPE>::range_filter;               \
                                                              \
	private:                                                  \
		std::optional<TYPE> access(                           \
		    extended_info const& data) const noexcept final { \
			return data ACCESS.FIELD;                         \
		}                                                     \
	};

#define X_INFO(FIELD, ACCESS, TYPE, LABEL)                        \
	{                                                      \
	    #FIELD##sv,                                        \
	    range_filter<TYPE>::factory<FIELD##_range_filter>, \
	},

		RANGE_FILTER(X_DEFINE_RANGE_FILTER);

		struct range_filter_info {
			std::string_view name;
			filter::ptr (*make)(unsigned low,
			                    unsigned high,
			                    bool include_missing);
		};

		static constexpr range_filter_info range_filters[] = {
		    RANGE_FILTER(X_INFO)};
	}  // namespace

	filter::ptr filter::make_range(std::string_view field,
	                               unsigned low,
	                               unsigned high,
	                               bool include_missing) {
		for (auto const& [name, factory] : range_filters) {
			if (field == name) return factory(low, high, include_missing);
		}
		return {};
	}
}  // namespace movies
