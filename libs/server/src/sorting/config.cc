// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <date/date.h>
#include <fmt/chrono.h>
#include <fmt/format.h>
#include <time.h>
#include <unicode/coll.h>
#include <concepts>
#include <sorting/sort.hh>

using namespace std::literals;

namespace movies {
	namespace {
		using sys_seconds = date::sys_seconds;

		template <typename Char>
		int compare(std::basic_string<Char> const& lhs,
		            std::basic_string<Char> const& rhs) {
			return lhs.compare(rhs);
		}

		std::unique_ptr<icu::Collator> build_collate() {
			UErrorCode ec{};
			auto coll = icu::Collator::createInstance(ec);
			if (U_FAILURE(ec)) coll = nullptr;
			return std::unique_ptr<icu::Collator>{coll};
		}

		int compare(title_category const& lhs, title_category const& rhs) {
			static auto coll = build_collate();
			return coll ? coll->compare(lhs.sortable, rhs.sortable)
			            : lhs.sortable.compare(rhs.sortable);
		}

		int compare(unsigned lhs, unsigned rhs) {
			if (lhs < rhs) return -1;
			return lhs == rhs ? 0 : 1;
		}

		inline int clip(std::integral auto val) {
			return (val < 0 ? -1 : val > 0 ? 1 : 0);
		}

		int compare(sys_seconds lhs, sys_seconds rhs) {
			return clip((lhs - rhs).count());
		}

		int compare(int lhs, int rhs) {
			return lhs - rhs;
		}

		template <typename Value>
		int compare(std::optional<Value> const& lhs,
		            std::optional<Value> const& rhs) {
			if (!lhs) return rhs ? 1 : 0;
			if (!rhs) return -1;

			return compare(*lhs, *rhs);
		}

		template <typename Final>
		class crtp_comp : public sort {
		public:
			crtp_comp(bool ascending) : asc_{ascending} {}

			int compare(extended_info const& lhs,
			            extended_info const& rhs) const noexcept final {
				auto const self = static_cast<Final const*>(this);
				auto const result =
				    movies::compare(self->get(lhs), self->get(rhs));
				if (!asc_) return -result;
				return result;
			}

			group_header header_for(extended_info const& data) const final {
				auto const self = static_cast<Final const*>(this);
				return self->field_header(self->get(data));
			}

			std::string sort_hint_for(extended_info const& data) const final {
				auto const self = static_cast<Final const*>(this);
				return self->field_sort_hint(self->get(data));
			}

			static ptr factory(bool ascending) {
				return std::make_unique<Final>(ascending);
			}

		private:
			bool asc_{};
		};

		template <typename Value>
		struct value_range {
			Value bottom;
			Value top;
		};

		template <typename Value>
		std::vector<value_range<Value>> spread(
		    std::initializer_list<Value> values) {
			std::vector<value_range<Value>> result{};
			result.reserve(values.size());

			unsigned prev = 0;
			for (auto value : values) {
				result.push_back({prev, value - 1});
				prev = value;
			}

			return result;
		}

		std::vector<value_range<unsigned>> years_spread() {
			using namespace std::chrono;

			auto result = spread<unsigned>({1980, 1990, 2000, 2005, 2010});

			auto const final_year = [] {
				auto const now = system_clock::to_time_t(system_clock::now());
				struct tm tm {};
				localtime_s(&tm, &now);
				return static_cast<unsigned>(tm.tm_year + 1900);
			}() + 1;

			auto prev = result.back().top + 1;
			result.reserve(result.size() + (final_year - prev));
			for (auto year = prev; year < final_year; ++year)
				result.push_back({year, year});

			return result;
		}

		template <typename Range, typename Value>
		struct ranged_header {
			ranged_header(std::vector<value_range<Value>> const& ranges)
			    : ranges_{ranges} {}
			ranged_header(std::vector<value_range<Value>>&& ranges)
			    : ranges_{std::move(ranges)} {}
			group_header field_header(std::optional<Value> const& value) const {
				return value ? this->find_range(*value) : group_header{};
			}
			group_header field_header(Value const& value) const {
				return this->find_range(value);
			}
			std::string field_sort_hint(
			    std::optional<Value> const& value) const {
				auto const self = static_cast<Range const*>(this);
				return value ? self->format(*value) : std::string{};
			}
			std::string field_sort_hint(Value const& value) const {
				auto const self = static_cast<Range const*>(this);
				return self->format(value);
			}

			group_header find_range(Value const& value) const {
				auto const self = static_cast<Range const*>(this);
				for (auto const& [bottom, top] : ranges_) {
					if (value < bottom || value > top) continue;
					auto id = fmt::format("{} :: {}", bottom, top);
					auto const topTitle = self->format_next(top);
					auto const bottomTitle = self->format(bottom);
					if (bottom == Value{}) {
						return {
						    .id = std::move(id),
						    .label = fmt::format("... - {}", topTitle),
						};
					}
					if (bottom == top) {
						return {
						    .id = std::move(id),
						    .label = bottomTitle,
						};
					}
					return {
					    .id = std::move(id),
					    .label = fmt::format("{} - {}", bottomTitle, topTitle),
					};
				}

				if (!ranges_.empty()) {
					auto const top = ranges_.back().top;
					auto const topTitle = self->format_next(top);
					return {
					    .id = fmt::format("{} :: ??", top),
					    .label = fmt::format("{} - ...", topTitle),
					};
				}

				return {};
			}

			std::string format_next(Value const& val) {
				return static_cast<Range const*>(this)->format(val);
			}

		private:
			std::vector<value_range<Value>> ranges_{};
		};

		template <typename Range>
		struct uint_ranged_header : ranged_header<Range, unsigned> {
			using ranged_header<Range, unsigned>::ranged_header;

			std::string format_next(unsigned val) const {
				return static_cast<Range const*>(this)->format(val + 1);
			}

			std::string format(unsigned val) const {
				return fmt::format("{}", val);
			}
		};

		template <typename Headers>
		struct proxy_header {
		public:
			static Headers const& instance() {
				static Headers headers{};
				return headers;
			}

			template <typename Arg>
			group_header field_header(Arg&& value) const {
				return instance().field_header(std::forward<Arg>(value));
			}

			template <typename Arg>
			std::string field_sort_hint(Arg&& value) const {
				return instance().field_sort_hint(std::forward<Arg>(value));
			}
		};

#define COMPARATORS(X)             \
	X(title, title, true)          \
	X(arrival, arrival, false)     \
	X(info.year, year, false)      \
	X(info.runtime, runtime, true) \
	X(info.rating, rating, false)

#define X_DEFINE_COMPARATOR(FIELD, NAME, ASC)                \
	class NAME##_comp : public crtp_comp<NAME##_comp>,       \
	                    public proxy_header<NAME##_header> { \
	public:                                                  \
		using crtp_comp<NAME##_comp>::crtp_comp;             \
		auto const& get(extended_info const& data) const {   \
			return data.FIELD;                               \
		}                                                    \
	};

		struct title_header {
			title_header() {}

			group_header field_header(title_category const& value) const {
				switch (value.grouping) {
					case char_class::other:
						break;
					case char_class::digit:
						return {.id = "123", .label = "#"};
					case char_class::letter: {
						std::string utf8;
						icu::UnicodeString{value.upper}.toUTF8String(utf8);
						return {.id = utf8, .label = utf8};
					}
				}
				return {.id = "symbols", .label = "?"};
			}

			std::string field_sort_hint(title_category const& value) const {
				std::string utf8;
				value.sortable.toUTF8String(utf8);
				return utf8;
			}
		};

		struct year_header : uint_ranged_header<year_header> {
			year_header() : uint_ranged_header<year_header>{years_spread()} {}
		};

		struct runtime_header : uint_ranged_header<runtime_header> {
			runtime_header()
			    : uint_ranged_header<runtime_header>{
			          spread<unsigned>({10, 20, 30, 40, 60, 90, 120, 150, 180,
			                            210, 240, 270, 300, 330, 360})} {}

			std::string format(unsigned val) const {
				auto const minutes = val % 60;
				auto const hours = (val - minutes) / 60;

				if (hours == 0) return fmt::format("{} min", minutes);
				if (minutes == 0) return fmt::format("{} h", hours);
				return fmt::format("{} h {} min", hours, minutes);
			}
		};

		struct rating_header {
			group_header field_header(
			    std::optional<unsigned> const& value) const {
				return field_header(value.value_or(0));
			}
			group_header field_header(unsigned value) const {
				auto const stars = (value + 5) / 10;
				return {
				    .id = fmt::format("{}-stars", stars),
				    .label = fmt::format("icon:{}-stars", stars),
				};
			}

			std::string field_sort_hint(
			    std::optional<unsigned> const& value) const {
				return field_sort_hint(value.value_or(0));
			}
			std::string field_sort_hint(unsigned value) const {
				return fmt::format("{}.{} / 10", value / 10, value % 10);
			}
		};

		struct arrival_header {
			static sys_seconds tomorrow(date::year_month_day today) {
				return date::sys_days{today} + 24h;
			}

			static sys_seconds this_month(date::year_month_day today) {
				return date::sys_days{today.year() / today.month() / 1};
			}

			static sys_seconds previous_month(date::year_month_day today) {
				return date::sys_days{today.year() / --today.month() / 1};
			}

			static sys_seconds this_year(date::year_month_day today) {
				return date::sys_days{today.year() / date::January / 1};
			}

			static sys_seconds previous_year(date::year_month_day today) {
				return date::sys_days{--today.year() / date::January / 1};
			}

			struct dates {
				sys_seconds previous_year;
				sys_seconds this_year;
				sys_seconds previous_month;
				sys_seconds this_month;
				sys_seconds tomorrow;
			};

			static dates spread_dates() {
				using std::chrono::system_clock;
				auto const now = date::year_month_day{
				    time_point_cast<date::days>(system_clock::now())};
				return {
				    .previous_year = previous_year(now),
				    .this_year = this_year(now),
				    .previous_month = previous_month(now),
				    .this_month = this_month(now),
				    .tomorrow = tomorrow(now),
				};
			}

			arrival_header() : dates_{spread_dates()} {}

			group_header field_header(
			    std::optional<sys_seconds> const& value) const {
				return value ? field_header(*value) : group_header{};
			}

			group_header field_header(sys_seconds const& value) const {
				if (value >= dates_.tomorrow) {
					return {
					    .id = "future",
					    .label = "translate:group.future",
					};
				}

				if (value >= dates_.this_month) {
					return {
					    .id = "now",
					    .label = "translate:group.this_month",
					};
				}

				if (dates_.previous_month > dates_.this_year &&
				    value >= dates_.previous_month) {
					return {
					    .id = "last-month",
					    .label = "translate:group.last_month",
					};
				}

				if (value >= dates_.this_year) {
					return {
					    .id = "this-year",
					    .label = "translate:group.this_year",
					};
				}

				if (value >= dates_.previous_year) {
					return {
					    .id = "last-year",
					    .label = "translate:group.last_year",
					};
				}

				return {
				    .id = "past",
				    .label = "translate:group.long_ago",
				};
			}

			std::string field_sort_hint(
			    std::optional<sys_seconds> const& value) const {
				return value ? field_sort_hint(*value) : std::string{};
			}

			std::string field_sort_hint(sys_seconds const& value) const {
				return fmt::format(
				    "{}",
				    std::chrono::time_point_cast<std::chrono::minutes>(value));
			}

		private:
			dates dates_;
		};

		COMPARATORS(X_DEFINE_COMPARATOR);

		struct sort_info {
			std::string_view name;
			bool asc;
			sort::ptr (*make)(bool ascending);
		};

#define X_INFO(FIELD, NAME, ASC)         \
	{                                    \
	    #NAME##sv,                       \
	    ASC,                             \
	    crtp_comp<NAME##_comp>::factory, \
	},
		static constexpr sort_info axis[] = {COMPARATORS(X_INFO)};
	}  // namespace

	sort::ptr sort::make(std::string const& term) {
		if (term.empty()) return {};
		auto view = std::string_view{term};
		auto asc = true;
		if (view.front() == '+') {
			view = view.substr(1);
		} else if (view.front() == '-') {
			view = view.substr(1);
			asc = false;
		}
		if (view.empty()) return {};
		for (auto const& [name, _, factory] : axis) {
			if (view == name) return factory(asc);
		}
		return {};
	}

	std::vector<sort_types> sort::get_config() {
		std::vector<sort_types> result{};
		result.reserve(std::size(axis));
		for (auto const& [name, asc, _] : axis) {
			result.push_back({
			    .field{name.data(), name.size()},
			    .label{fmt::format("sort_action.{}", name)},
			    .ascByDefault{asc},
			});
		}
		return result;
	}
}  // namespace movies
