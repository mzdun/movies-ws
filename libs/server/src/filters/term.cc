// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <charconv>
#include <concepts>
#include <filters/filter.hh>
#include <movies/opt.hpp>
#include <set>

#include "internal.hh"

using namespace std::literals;

namespace movies {
	namespace {
		unsigned move_if_needed(unsigned val) { return val; }

#ifdef MOVIES_USE_U8STRING
		std::u8string move_if_needed(std::u8string& val) {
			return std::move(val);
		}
#endif

		std::string move_if_needed(std::string& val) { return std::move(val); }

		template <typename Value>
		struct conv_term;

		template <>
		struct conv_term<unsigned> {
			using arg_t = unsigned;

			static std::optional<unsigned> conv(std::string_view term) {
				unsigned result{};
				if (!parse(term, result)) return std::nullopt;
				return result;
			}

			static bool parse(std::string_view data, unsigned& result) {
				auto first_ptr = data.data();
				auto last_ptr = first_ptr + data.size();
				auto ret = std::from_chars(first_ptr, last_ptr, result);
				return ret.ec == std::errc{} && ret.ptr == last_ptr;
			}
		};

		template <>
		struct conv_term<std::u8string> {
			using arg_t = std::u8string_view;

			static std::optional<std::u8string> conv(std::string_view term) {
				return as_utf8_string_v(term);
			}
		};

		template <>
		struct conv_term<std::string> {
			using arg_t = std::string_view;

			static std::optional<std::string> conv(std::string_view term) {
				return as_ascii_string_v(term);
			}
		};

		template <typename Value>
		class term_filter : public filter {
		public:
			term_filter(Value term, app::lng title, expand kind)
			    : term_{move_if_needed(term)}, title_{title}, kind_{kind} {}

			[[nodiscard]] bool matches(
			    extended_info const& data) const noexcept final {
				return contains(data, term_);
			}
			[[nodiscard]] app::lng title() const noexcept override {
				return title_;
			}
			[[nodiscard]] expand title_expand() const noexcept override {
				return kind_;
			}

			template <std::derived_from<term_filter<Value>> Filter>
			static ptr factory(std::string_view term) {
				auto conv = conv_term<Value>::conv(term);
				if (!conv) return {};
				return std::make_unique<Filter>(move_if_needed(*conv));
			}

		private:
			[[nodiscard]] virtual bool contains(
			    extended_info const&,
			    typename conv_term<Value>::arg_t) const noexcept = 0;

			Value term_{};
			app::lng title_{};
			expand kind_{};
		};

		class tokens_term_filter : public term_filter<string_type> {
		public:
			using term_filter<string_type>::term_filter;

		private:
			[[nodiscard]] bool contains(
			    extended_info const& data,
			    string_view_type term) const noexcept final {
				auto const& list = access(data);

				for (auto const& item : list) {
					if (item == term) return true;
				}

				return false;
			}

			[[nodiscard]] virtual std::vector<string_type> const& access(
			    extended_info const&) const noexcept = 0;
		};

		class value_term_filter : public term_filter<unsigned> {
		public:
			using term_filter<unsigned>::term_filter;

		private:
			[[nodiscard]] bool contains(extended_info const& data,
			                            unsigned term) const noexcept final {
				auto const field = access(data);
				return field && *field == term;
			}

			[[nodiscard]] virtual std::optional<unsigned> access(
			    extended_info const&) const noexcept = 0;
		};

		class crew_term_filter : public term_filter<std::string> {
		public:
			crew_term_filter(std::string term)
			    : term_filter<std::string>{std::move(term),
			                               app::lng::TERM_FILTER_LABEL_CREW,
			                               expand::crew} {}

		private:
			[[nodiscard]] bool contains(
			    extended_info const& data,
			    std::string_view term) const noexcept final {
				for (auto const& ref : data.local_people_refs) {
					if (ref == term) return true;
				}
				return false;
			}
		};

#define TERM_TOKENS_FILTER(X)                                        \
	X(genre, genres, string_type, app::lng::TERM_FILTER_LABEL_GENRE) \
	X(country, countries, string_type, app::lng::TERM_FILTER_LABEL_COUNTRY)
#define TERM_VALUE_FILTER(X) \
	X(year, year, unsigned, app::lng::TERM_FILTER_LABEL_YEAR)
#define TERM_FILTER(X)    \
	TERM_TOKENS_FILTER(X) \
	TERM_VALUE_FILTER(X)  \
	X(crew, crew, std::string, IGNORE)

#define X_TOKENS_TERM_FILTER(CAT, ACCESS, T, LNG)                           \
	class ACCESS##_term_filter : public tokens_term_filter {                \
	public:                                                                 \
		ACCESS##_term_filter(string_type term)                              \
		    : tokens_term_filter{std::move(term), LNG, expand_from<LNG>} {} \
                                                                            \
	private:                                                                \
		std::vector<string_type> const& access(                             \
		    extended_info const& data) const noexcept final {               \
			return data.ACCESS;                                             \
		}                                                                   \
	};

#define X_VALUE_TERM_FILTER(CAT, ACCESS, T, LNG)              \
	class ACCESS##_term_filter : public value_term_filter {   \
	public:                                                   \
		ACCESS##_term_filter(unsigned term)                   \
		    : value_term_filter{term, LNG, expand::none} {}   \
                                                              \
	private:                                                  \
		std::optional<unsigned> access(                       \
		    extended_info const& data) const noexcept final { \
			return data.ACCESS;                               \
		}                                                     \
	};

		template <app::lng LNG>
		static constinit auto const expand_from =
		    LNG == app::lng::TERM_FILTER_LABEL_COUNTRY ? filter::expand::country
		                                               : filter::expand::none;

		TERM_TOKENS_FILTER(X_TOKENS_TERM_FILTER);
		TERM_VALUE_FILTER(X_VALUE_TERM_FILTER);

		struct term_filter_info {
			std::string_view name;
			filter::ptr (*make)(std::string_view term);
		};

#define X_INFO(CAT, ACCESS, TYPE, LNG)                    \
	{                                                     \
	    #CAT##sv,                                         \
	    term_filter<TYPE>::factory<ACCESS##_term_filter>, \
	},

		constexpr term_filter_info term_filters[] = {TERM_FILTER(X_INFO)};
	}  // namespace

	filter::ptr filter::make_term(std::string_view cat, std::string_view term) {
		for (auto const& [name, factory] : term_filters) {
			if (cat == name) return factory(term);
		}
		return {};
	}
}  // namespace movies