// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include <charconv>
#include <concepts>
#include <filters/filter.hh>
#include <movies/opt.hpp>
#include <set>

#include "internal.hh"

using namespace std::literals;

namespace movies {
	namespace {
		unsigned move_if_needed(unsigned val) {
			return val;
		}

		std::u8string move_if_needed(std::u8string& val) {
			return std::move(val);
		}

		template <typename Value>
		struct conv_term;

		template <>
		struct conv_term<unsigned> {
			using arg_t = unsigned;

			static std::optional<unsigned> conv(std::string_view term) {
				unsigned result;
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
				return as_u8s(term);
			}
		};

		template <typename Value>
		class term_filter : public filter {
		public:
			explicit term_filter(Value term) : term_{move_if_needed(term)} {}

			bool matches(extended_info const& data) const noexcept final {
				return contains(data, term_);
			}

			template <std::derived_from<term_filter<Value>> Filter>
			static ptr factory(std::string_view term) {
				auto conv = conv_term<Value>::conv(term);
				if (!conv) return {};
				return std::make_unique<Filter>(move_if_needed(*conv));
			}

		private:
			virtual bool contains(extended_info const&,
			                      conv_term<Value>::arg_t) const noexcept = 0;

			Value term_{};
		};

		class tokens_term_filter : public term_filter<std::u8string> {
		public:
			using term_filter<std::u8string>::term_filter;

		private:
			bool contains(extended_info const& data,
			              std::u8string_view term) const noexcept final {
				auto const& list = access(data);

				for (auto const& item : list) {
					if (item == term) return true;
				}

				return false;
			}

			virtual std::vector<std::u8string> const& access(
			    extended_info const&) const noexcept = 0;
		};

		class value_term_filter : public term_filter<unsigned> {
		public:
			using term_filter<unsigned>::term_filter;

		private:
			bool contains(extended_info const& data,
			              unsigned term) const noexcept final {
				auto const field = access(data);
				return field && *field == term;
			}

			virtual std::optional<unsigned> access(
			    extended_info const&) const noexcept = 0;
		};

		class crew_term_filter : public term_filter<std::u8string> {
		public:
			using term_filter<std::u8string>::term_filter;

		private:
			bool contains(extended_info const& data,
			              std::u8string_view term) const noexcept final {
				std::string tags{};

				for (auto crew : {
				         &data.crew.directors,
				         &data.crew.writers,
				         &data.crew.cast,
				     }) {
					for (auto const& person : *crew) {
						if (person.key == term) return true;
					}
				}
				return false;
			}
		};

#define TERM_TOKENS_FILTER(X)       \
	X(genre, genres, std::u8string) \
	X(country, countries, std::u8string)
#define TERM_VALUE_FILTER(X) X(year, year, unsigned)
#define TERM_FILTER(X) \
	TERM_TOKENS_FILTER(X) TERM_VALUE_FILTER(X) X(crew, crew, std::u8string)

#define X_TOKENS_TERM_FILTER(CAT, ACCESS, T)                  \
	class ACCESS##_term_filter : public tokens_term_filter {  \
	public:                                                   \
		using tokens_term_filter::tokens_term_filter;         \
                                                              \
	private:                                                  \
		std::vector<std::u8string> const& access(             \
		    extended_info const& data) const noexcept final { \
			return data.ACCESS;                               \
		}                                                     \
	};

#define X_VALUE_TERM_FILTER(CAT, ACCESS, T)                   \
	class ACCESS##_term_filter : public value_term_filter {   \
	public:                                                   \
		using value_term_filter::value_term_filter;           \
                                                              \
	private:                                                  \
		std::optional<unsigned> access(                       \
		    extended_info const& data) const noexcept final { \
			return data.ACCESS;                               \
		}                                                     \
	};

		TERM_TOKENS_FILTER(X_TOKENS_TERM_FILTER);
		TERM_VALUE_FILTER(X_VALUE_TERM_FILTER);

		struct term_filter_info {
			std::string_view name;
			filter::ptr (*make)(std::string_view term);
		};

#define X_INFO(CAT, ACCESS, TYPE)                         \
	{                                                     \
	    #CAT##sv,                                         \
	    term_filter<TYPE>::factory<ACCESS##_term_filter>, \
	},

		static constexpr term_filter_info term_filters[] = {
		    TERM_FILTER(X_INFO)};
	}  // namespace

	filter::ptr filter::make_term(std::string_view cat, std::string_view term) {
		for (auto const& [name, factory] : term_filters) {
			if (cat == name) return factory(term);
		}
		return {};
	}
}  // namespace movies