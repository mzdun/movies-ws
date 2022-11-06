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
	TAGS_FILTER(X_TAGS_##SHORT_NAME)   \
	ON_OFF_FILTER(X_ON_OFF_##SHORT_NAME)

		struct filter_data {
			struct string_set {
				std::set<std::string, std::less<>> items;

				bool is_valid() const noexcept { return !items.empty(); }

				void apply(std::vector<string> const& src) {
					for (auto const& item : src) {
						auto const key = as_sv(item);
						auto it = items.lower_bound(key);
						if (it == items.end() || *it != key) {
							items.insert(it, {key.data(), key.size()});
						}
					}
				}

				filter make_filter(std::string const& field,
				                   std::string const& label) const {
					return tokens_filter{
					    .field = field,
					    .label = label,
					    .type = tokens_filter::str,
					    .values = {items.begin(), items.end()},
					};
				}
			};

			template <typename Value>
			struct range_stats {
				struct range {
					Value lowest, highest;
					bool is_valid() const noexcept { return lowest != highest; }
				};

				std::optional<range> value;
				bool is_optional{false};

				bool is_valid() const noexcept {
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

				filter make_filter(std::string const& field,
				                   std::string const& label,
				                   unsigned step) const {
					return range_filter{
					    .field = field,
					    .label = label,
					    .type = range_filter::num,
					    .low = value_of(value->lowest),
					    .high = value_of(value->highest),
					    .is_optional = is_optional,
					    .steps = step,
					};
				}

				filter make_filter(std::string const& field,
				                   std::string const& label,
				                   std::vector<unsigned> const& steps) const {
					return range_filter{
					    .field = field,
					    .label = label,
					    .type = range_filter::num,
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

				bool is_valid() const noexcept { return has_true && has_false; }

				void apply(bool src) { (src ? has_true : has_false) = true; }

				filter make_filter(std::string const& field,
				                   std::string const& label) const {
					return description::on_off_filter{
					    .field = field,
					    .label = label,
					    .defaultValue = true,
					};
				}
			};

			struct monostate {
				bool is_valid() const noexcept { return false; }
			};

#define X_RANGE_STG(NAME, ACCESS, TYPE) range_stats<TYPE> NAME{};
#define X_TAGS_STG(NAME) string_set NAME{};
#define X_ON_OFF_STG(NAME) bool_stats NAME{0};
			TRIPLET(STG);

			std::vector<filter> visit(movie_db const& db) {
				for (auto const& [_, movie] : db) {
					visit(movie);
				}

				std::vector<description::filter> filter_list{};

#define X_RANGE_NAME(NAME, ACCESS, TYPE) NAME,
#define X_TAGS_NAME(NAME) NAME,
#define X_ON_OFF_NAME(NAME) NAME,
				filter_list.reserve(count_of(TRIPLET(NAME) monostate{}));

#define X_RANGE_MAKE_FILTER(NAME, ACCESS, TYPE) \
	if (NAME.is_valid())                        \
		filter_list.push_back(NAME.make_filter( \
		    #NAME##s, "filter_label." #NAME##s, NAME##_steps()));
#define X_TAGS_MAKE_FILTER(NAME) \
	if (NAME.is_valid())         \
		filter_list.push_back(   \
		    NAME.make_filter(#NAME##s, "filter_label." #NAME##s));
#define X_ON_OFF_MAKE_FILTER(NAME) \
	if (NAME.is_valid())           \
		filter_list.push_back(     \
		    NAME.make_filter(#NAME##s, "filter_label." #NAME##s));
				TRIPLET(MAKE_FILTER);

				return filter_list;
			}

		private:
			static inline unsigned year_steps() noexcept {
				return 1;
			}
			static inline unsigned runtime_steps() noexcept {
				return 10;
			}
			static inline unsigned rating_steps() noexcept {
				return 10;
			}
			static inline unsigned arrival_steps() noexcept {
				static constexpr auto day = 24h;
				static constexpr auto week = 7 * day;
				static constexpr auto fortnight = 2 * week;

				return value_of(date::sys_seconds{fortnight});
			}
#define X_RANGE_APPLY(NAME, ACCESS, TYPE) NAME.apply(movie ACCESS.NAME);
#define X_TAGS_APPLY(NAME) NAME.apply(movie.info.NAME);
#define X_ON_OFF_APPLY(NAME) \
	NAME.apply(filters::NAME##_filter::quick_match(movie));
			void visit(extended_info const& movie) {
				TRIPLET(APPLY);
			}

			static bool is_valid(bool_stats const& stats) {
				return stats.has_false && stats.has_true;
			}

			static bool is_valid(std::monostate) {
				return false;
			}

			template <typename... Filters>
			static size_t count_of(Filters const&... filter) {
				return ((filter.is_valid() ? 1u : 0u) + ...);
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
