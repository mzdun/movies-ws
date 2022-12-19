// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <date/date.h>
#include <fmt/chrono.h>
#include <fmt/format.h>
#include <unicode/coll.h>
#include <base/str.hh>
#include <concepts>
#include <ctime>
#include <sorting/sort.hh>

using namespace std::literals;

namespace movies {
	namespace {
		using sys_seconds = date::sys_seconds;

		template <typename Char>
		int compare(std::basic_string<Char> const& lhs,
		            std::basic_string<Char> const& rhs,
		            std::span<std::string const> const&) {
			return lhs.compare(rhs);
		}

		int as_int(int value) { return value; }

		struct collator {
			std::unique_ptr<icu::Collator> coll{};
			std::string lang{};

			void for_lang(std::span<std::string const> langs) {
				if (langs.empty() || lang == langs.front()) return;

				UErrorCode ec{};
				auto result = createInstance(langs.front(), ec);
				if (U_FAILURE(ec)) result = nullptr;
				coll.reset();
				lang.clear();
				if (result) {
					coll.reset(result);
					lang.assign(langs.front());
				}
			}

			[[nodiscard]] int compare(title_category const& lhs,
			                          title_category const& rhs) const {
				return coll ? as_int(coll->compare(lhs.sortable, rhs.sortable))
				            : as_int(lhs.sortable.compare(rhs.sortable));
			}

		private:
			static icu::Collator* createInstance(std::string_view langid,
			                                     UErrorCode& ec) {
				if (langid.empty()) return icu::Collator::createInstance(ec);
				std::string copy{};
				copy.assign(langid);
				for (auto& c : copy)
					if (c == '-') c = '_';
				return icu::Collator::createInstance(icu::Locale(copy.c_str()),
				                                     ec);
			}
		};

		int compare(translatable<title_category> const& lhs,
		            translatable<title_category> const& rhs,
		            std::span<std::string const> langs) {
			auto const lhs_it = lhs.find(langs);
			auto const rhs_it = rhs.find(langs);

			if (lhs_it == lhs.end()) {
				if (rhs_it == rhs.end()) {
					return 0;
				}
				return 1;
			}
			if (rhs_it == rhs.end()) {
				return -1;
			}

			static collator coll{};
			coll.for_lang(langs);
			return coll.compare(lhs_it->second, rhs_it->second);
		}

		int compare(unsigned lhs,
		            unsigned rhs,
		            std::span<std::string const> const&) {
			if (lhs < rhs) return -1;
			return lhs == rhs ? 0 : 1;
		}

		inline int clip(std::integral auto val) {
			return (val < 0 ? -1 : val > 0 ? 1 : 0);
		}

		int compare(sys_seconds lhs,
		            sys_seconds rhs,
		            std::span<std::string const> const&) {
			return clip((lhs - rhs).count());
		}

		template <typename Value>
		int compare(std::optional<Value> const& lhs,
		            std::optional<Value> const& rhs,
		            std::span<std::string const> langs) {
			if (!lhs) return rhs ? 1 : 0;
			if (!rhs) return -1;

			return compare(*lhs, *rhs, langs);
		}

		template <typename Final>
		class crtp_comp : public sort {
		public:
			crtp_comp(bool ascending) : asc_{ascending} {}

			[[nodiscard]] int compare(
			    extended_info const& lhs,
			    extended_info const& rhs,
			    std::span<std::string const> langs) const noexcept final {
				auto const self = static_cast<Final const*>(this);
				auto const result =
				    movies::compare(self->get(lhs), self->get(rhs), langs);
				if (!asc_) return -result;
				return result;
			}

			[[nodiscard]] group_header header_for(
			    extended_info const& data,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const final {
				auto const self = static_cast<Final const*>(this);
				return self->field_header(self->get(data), tr, langs);
			}

			[[nodiscard]] std::string sort_hint_for(
			    extended_info const& data,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const final {
				auto const self = static_cast<Final const*>(this);
				return self->field_sort_hint(self->get(data), tr, langs);
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

			auto result = spread<unsigned>(
			    {1980, 1990, 2000, 2005,  // NOLINT(readability-magic-numbers)
			     2010});                  // NOLINT(readability-magic-numbers)

			auto const final_year = [] {
				auto const now = system_clock::to_time_t(system_clock::now());
				struct tm tm {};
#ifdef _MSC_VER
				localtime_s(&tm, &now);
#else
				localtime_r(&now, &tm);
#endif
				return static_cast<unsigned>(
				    tm.tm_year + 1900);  // NOLINT(readability-magic-numbers)
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
			[[nodiscard]] group_header field_header(
			    std::optional<Value> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> const&) const {
				return value ? this->find_range(*value, tr) : group_header{};
			}
			[[nodiscard]] group_header field_header(
			    Value const& value,
			    app::Strings const& tr,
			    std::span<std::string const> const&) const {
				return this->find_range(value, tr);
			}
			[[nodiscard]] std::string field_sort_hint(
			    std::optional<Value> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> const&) const {
				auto const self = static_cast<Range const*>(this);
				return value ? self->format(*value, tr) : std::string{};
			}
			[[nodiscard]] std::string field_sort_hint(
			    Value const& value,
			    app::Strings const& tr,
			    std::span<std::string const> const&) const {
				auto const self = static_cast<Range const*>(this);
				return self->format(value, tr);
			}

			[[nodiscard]] group_header find_range(
			    Value const& value,
			    app::Strings const& tr) const {
				auto const self = static_cast<Range const*>(this);
				for (auto const& [bottom, top] : ranges_) {
					if (value < bottom || value > top) continue;
					auto id = fmt::format("{} :: {}", bottom, top);
					auto const topTitle = self->format_next(top, tr);
					auto const bottomTitle = self->format(bottom, tr);
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
					auto const topTitle = self->format_next(top, tr);
					return {
					    .id = fmt::format("{} :: ??", top),
					    .label = fmt::format("{} - ...", topTitle),
					};
				}

				return {};
			}

			std::string format_next(Value const& val, app::Strings const& tr) {
				return static_cast<Range const*>(this)->format(val, tr);
			}

		private:
			std::vector<value_range<Value>> ranges_{};
		};

		template <typename Range>
		struct uint_ranged_header : ranged_header<Range, unsigned> {
			using ranged_header<Range, unsigned>::ranged_header;

			[[nodiscard]] std::string format_next(
			    unsigned val,
			    app::Strings const& tr) const {
				return static_cast<Range const*>(this)->format(val + 1, tr);
			}

			[[nodiscard]] std::string format(unsigned val,
			                                 app::Strings const&) const {
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
			[[nodiscard]] group_header field_header(
			    Arg&& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return instance().field_header(std::forward<Arg>(value), tr,
				                               langs);
			}

			template <typename Arg>
			[[nodiscard]] std::string field_sort_hint(
			    Arg&& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return instance().field_sort_hint(std::forward<Arg>(value), tr,
				                                  langs);
			}
		};

#define COMPARATORS(X)                                  \
	X(title_cat, title, lng::SORT_LABEL_TITLE, true)    \
	X(arrival, arrival, lng::SORT_LABEL_ARRIVAL, false) \
	X(year, year, lng::SORT_LABEL_YEAR, false)          \
	X(runtime, runtime, lng::SORT_LABEL_RUNTIME, true)  \
	X(rating, rating, lng::SORT_LABEL_RATING, false)

#define X_DEFINE_COMPARATOR(FIELD, NAME, LABEL, ASC)         \
	class NAME##_comp : public crtp_comp<NAME##_comp>,       \
	                    public proxy_header<NAME##_header> { \
	public:                                                  \
		using crtp_comp<NAME##_comp>::crtp_comp;             \
		auto const& get(extended_info const& data) const {   \
			return data.FIELD;                               \
		}                                                    \
	};

		struct title_header {
			title_header() = default;

			[[nodiscard]] group_header field_header(
			    translatable<title_category> const& value,
			    app::Strings const&,
			    std::span<std::string const> langs) const {
				auto it = value.find(langs);
				if (it != value.end()) {
					auto const& val = it->second;
					switch (val.grouping) {
						case char_class::other:
							break;
						case char_class::digit:
							return {.id = "123", .label = "#"};
						case char_class::letter: {
							std::string utf8;
							icu::UnicodeString{val.upper}.toUTF8String(utf8);
							return {.id = utf8, .label = utf8};
						}
					}
				}
				return {.id = "symbols", .label = "?"};
			}

			[[nodiscard]] std::string field_sort_hint(
			    translatable<title_category> const& value,
			    app::Strings const&,
			    std::span<std::string const> langs) const {
				std::string utf8;
				auto it = value.find(langs);
				if (it == value.end()) return utf8;
				it->second.sortable.toUTF8String(utf8);
				return utf8;
			}
		};

		struct year_header : uint_ranged_header<year_header> {
			year_header() : uint_ranged_header<year_header>{years_spread()} {}
		};

		struct runtime_header : uint_ranged_header<runtime_header> {
			runtime_header()
			    : uint_ranged_header<runtime_header>{spread<unsigned>({
			          10, 20, 30, 40, 60,  // NOLINT(readability-magic-numbers)
			          90, 120, 150, 180,   // NOLINT(readability-magic-numbers)
			          210, 240, 270, 300,  // NOLINT(readability-magic-numbers)
			          330, 360             // NOLINT(readability-magic-numbers)
			      })} {}

			[[nodiscard]] std::string format(unsigned val,
			                                 app::Strings const&) const {
				auto const minutes = val % 60;
				auto const hours = (val - minutes) / 60;

				if (hours == 0) return fmt::format("{} min", minutes);
				if (minutes == 0) return fmt::format("{} h", hours);
				return fmt::format("{} h {} min", hours, minutes);
			}
		};

		struct rating_header {
			[[nodiscard]] group_header field_header(
			    std::optional<unsigned> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return field_header(value.value_or(0), tr, langs);
			}
			[[nodiscard]] group_header field_header(
			    unsigned value,
			    app::Strings const&,
			    std::span<std::string const> const&) const {
				auto const stars = (value + 5) / 10;
				return {
				    .id = fmt::format("{}-stars", stars),
				    .label = fmt::format("icon:{}-stars", stars),
				};
			}

			[[nodiscard]] std::string field_sort_hint(
			    std::optional<unsigned> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return field_sort_hint(value.value_or(0), tr, langs);
			}
			[[nodiscard]] std::string field_sort_hint(
			    unsigned value,
			    app::Strings const&,
			    std::span<std::string const> const&) const {
				return fmt::format(
				    "{}.{} / 10",
				    value / 10,   // NOLINT(readability-magic-numbers)
				    value % 10);  // NOLINT(readability-magic-numbers)
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

			[[nodiscard]] group_header field_header(
			    std::optional<sys_seconds> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return value ? field_header(*value, tr, langs) : group_header{};
			}

			[[nodiscard]] group_header field_header(
			    sys_seconds const& value,
			    app::Strings const& tr,
			    std::span<std::string const>) const {
				if (value >= dates_.tomorrow) {
					return {
					    .id = "future",
					    .label = as_str(tr(app::lng::GROUP_LABEL_FUTURE)),
					};
				}

				if (value >= dates_.this_month) {
					return {
					    .id = "now",
					    .label = as_str(tr(app::lng::GROUP_LABEL_THIS_MONTH)),
					};
				}

				if (dates_.previous_month > dates_.this_year &&
				    value >= dates_.previous_month) {
					return {
					    .id = "last-month",
					    .label = as_str(tr(app::lng::GROUP_LABEL_LAST_MONTH)),
					};
				}

				if (value >= dates_.this_year) {
					return {
					    .id = "this-year",
					    .label = as_str(tr(app::lng::GROUP_LABEL_THIS_YEAR)),
					};
				}

				if (value >= dates_.previous_year) {
					return {
					    .id = "last-year",
					    .label = as_str(tr(app::lng::GROUP_LABEL_LAST_YEAR)),
					};
				}

				return {
				    .id = "past",
				    .label = as_str(tr(app::lng::GROUP_LABEL_LONG_AGO)),
				};
			}

			[[nodiscard]] std::string field_sort_hint(
			    std::optional<sys_seconds> const& value,
			    app::Strings const& tr,
			    std::span<std::string const> langs) const {
				return value ? field_sort_hint(*value, tr, langs)
				             : std::string{};
			}

			[[nodiscard]] std::string field_sort_hint(
			    sys_seconds const& value,
			    app::Strings const&,
			    std::span<std::string const> const&) const {
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
			app::lng label;
			sort::ptr (*make)(bool ascending);
		};

#define X_INFO(FIELD, NAME, LABEL, ASC)  \
	{                                    \
	    #NAME##sv,                       \
	    ASC,                             \
	    app::LABEL,                      \
	    crtp_comp<NAME##_comp>::factory, \
	},
		constexpr sort_info axis[] = {COMPARATORS(X_INFO)};
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
		for (auto const& [name, _, _2, factory] : axis) {
			if (view == name) {
				return factory(asc);
			}
		}
		return {};
	}

	std::vector<sort_types> sort::get_config(app::Strings const& tr) {
		std::vector<sort_types> result{};
		result.reserve(std::size(axis));
		for (auto const& [name, asc, label, _] : axis) {
			auto const label_view = tr(label);
			result.push_back({
			    .field{name.data(), name.size()},
			    .label{label_view.data(), label_view.size()},
			    .ascByDefault = asc,
			});
		}
		return result;
	}
}  // namespace movies
