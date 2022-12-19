// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <date/date.h>
#include <base/str.hh>
#include <filters/filter.hh>
#include <set>

#include "internal.hh"
#include "on_off.hh"

using namespace std::literals;

namespace movies::description {
	namespace {
#define TRIPLET(SHORT_NAME)            \
	RANGE_FILTER(X_RANGE_##SHORT_NAME) \
	TOKEN_FILTER(X_TAGS_##SHORT_NAME)  \
	ON_OFF_FILTER(X_ON_OFF_##SHORT_NAME)

		struct filter_data {
			struct string_set {
				std::set<std::string, std::less<>> items;

				[[nodiscard]] bool is_valid() const noexcept {
					return !items.empty();
				}

				void apply(std::vector<string> const& src) {
					for (auto const& item : src) {
						auto const key = as_sv(item);
						auto it = items.lower_bound(key);
						if (it == items.end() || *it != key) {
							items.insert(it, {key.data(), key.size()});
						}
					}
				}

				[[nodiscard]] filter make_filter(std::string const& field,
				                                 app::lng label) const {
					return tokens_filter{
					    .field = field,
					    .label = label,
					    .values = {items.begin(), items.end()},
					};
				}
			};

			template <typename Value>
			struct range_stats {
				struct range {
					Value lowest, highest;
					[[nodiscard]] bool is_valid() const noexcept {
						return lowest != highest;
					}
				};

				std::optional<range> value;
				bool is_optional{false};

				[[nodiscard]] bool is_valid() const noexcept {
					return value && value->is_valid();
				}

				void apply(std::optional<Value> const& src) {
					if (!src) {
						is_optional = true;
						return;
					}
					auto const acc = *src;
					if (!value) {
						value = {
						    .lowest = acc,
						    .highest = acc,
						};
						return;
					}

					if (acc < value->lowest)
						value->lowest = acc;
					else if (acc > value->highest)
						value->highest = acc;
				}

				[[nodiscard]] filter make_filter(std::string const& field,
				                                 app::lng label,
				                                 unsigned step) const {
					return range_filter{
					    .field = field,
					    .label = label,
					    .low = value_of(value->lowest),
					    .high = value_of(value->highest),
					    .is_optional = is_optional,
					    .steps = step,
					};
				}

				[[nodiscard]] filter make_filter(
				    std::string const& field,
				    app::lng label,
				    std::vector<unsigned> const& steps) const {
					return range_filter{
					    .field = field,
					    .label = label,
					    .low = value_of(value->lowest),
					    .high = value_of(value->highest),
					    .is_optional = is_optional,
					    .steps = steps,
					};
				}
			};

			struct bool_stats {
				bool has_true{false};
				bool has_false{false};

				[[nodiscard]] bool is_valid() const noexcept {
					return has_true && has_false;
				}

				void apply(bool src) { (src ? has_true : has_false) = true; }

				[[nodiscard]] filter make_filter(
				    std::string const& field,
				    app::lng label,
				    app::lng opposite_label) const {
					return description::on_off_filter{
					    .field = field,
					    .label = label,
					    .opposite_label = opposite_label,
					    .defaultValue = true,
					};
				}
			};

			struct monostate {
				[[nodiscard]] bool is_valid() const noexcept { return false; }
			};

#define X_RANGE_STG(NAME, TYPE, LABEL) \
	range_stats<TYPE> NAME{};  // NOLINT(bugprone-macro-parentheses)
#define X_TAGS_STG(NAME, LABEL) string_set NAME{};
#define X_ON_OFF_STG(NAME, LABEL) bool_stats NAME{0};
			TRIPLET(STG)

			std::vector<filter> visit(movie_db const& db) {
				for (auto const& [_, movie] : db.movies) {
					visit(movie);
				}

				std::vector<description::filter> filter_list{};

#define X_RANGE_NAME(NAME, TYPE, LABEL) NAME,
#define X_TAGS_NAME(NAME, LABEL) NAME,
#define X_ON_OFF_NAME(NAME, LABEL) NAME,
				filter_list.reserve(count_of(TRIPLET(NAME) monostate{}));

#define X_RANGE_MAKE_FILTER(NAME, TYPE, LABEL) \
	if ((NAME).is_valid())                     \
		filter_list.push_back(                 \
		    (NAME).make_filter(#NAME##s, app::LABEL, NAME##_steps()));
#define X_TAGS_MAKE_FILTER(NAME, LABEL) \
	if ((NAME).is_valid())              \
		filter_list.push_back((NAME).make_filter(#NAME##s, app::LABEL));
#define X_ON_OFF_MAKE_FILTER(NAME, LABEL) \
	if ((NAME).is_valid())                \
		filter_list.push_back(            \
		    (NAME).make_filter(#NAME##s, app::LABEL, app::LABEL##_OPOSITE));
				TRIPLET(MAKE_FILTER);

				return filter_list;
			}

		private:
			static constexpr auto generic_steps_value = 10;
			static inline unsigned year_steps() noexcept {
				static constexpr auto yearly_steps_value = 1;
				return yearly_steps_value;
			}
			static inline unsigned runtime_steps() noexcept {
				return generic_steps_value;
			}
			static inline unsigned rating_steps() noexcept {
				return generic_steps_value;
			}
			static inline unsigned arrival_steps() noexcept {
				static constexpr auto day = 24h;
				static constexpr auto week = 7 * day;
				static constexpr auto fortnight = 2 * week;

				return value_of(date::sys_seconds{fortnight});
			}
#define X_RANGE_APPLY(NAME, TYPE, LABEL) NAME.apply(movie.NAME);
#define X_TAGS_APPLY(NAME, LABEL) NAME.apply(movie.NAME);
#define X_ON_OFF_APPLY(NAME, LABEL) \
	NAME.apply(filters::NAME##_filter::quick_match(movie));
			void visit(extended_info const& movie) { TRIPLET(APPLY); }

			static bool is_valid(bool_stats const& stats) {
				return stats.has_false && stats.has_true;
			}

			static bool is_valid(std::monostate) { return false; }

			template <typename... Filters>
			static size_t count_of(Filters const&... filter) {
				return ((filter.is_valid() ? 1U : 0U) + ...);
			}
		};
	}  // namespace
}  // namespace movies::description

namespace movies {
	std::vector<description::filter> filter::gather_from_db(
	    movie_db const& db) {
		return description::filter_data{}.visit(db);
	}
}  // namespace movies
