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
		class token_filter : public filter {
		public:
			token_filter(std::vector<std::string>&& tokens)
			    : tokens_{std::move(tokens)} {}

			bool matches(extended_info const& data) const noexcept final {
				if (tokens_.empty()) return true;

				auto const& items = access(data);
				for (auto const& tok : tokens_) {
					auto const u8tok = as_u8v(tok);
					bool found = false;
					for (auto const& checked : items) {
						if (checked == u8tok) {
							found = true;
							break;
						}
					}
					if (!found) return false;
				}

				return true;
			}

			template <std::derived_from<token_filter> Filter>
			static ptr factory(std::vector<std::string>&& tokens) {
				return std::make_unique<Filter>(std::move(tokens));
			}

		private:
			virtual std::vector<std::u8string> const& access(
			    extended_info const&) const noexcept = 0;
			std::vector<std::string> tokens_{};
		};

#define X_DEFINE_TOKEN_FILTER(FIELD, LABEL)                   \
	class FIELD##_token_filter : public token_filter {        \
	public:                                                   \
		using token_filter::token_filter;                     \
                                                              \
	private:                                                  \
		std::vector<std::u8string> const& access(             \
		    extended_info const& data) const noexcept final { \
			return data.info.FIELD;                           \
		}                                                     \
	};

#define X_INFO(FIELD, LABEL)                         \
	{                                                \
	    #FIELD##sv,                                  \
	    token_filter::factory<FIELD##_token_filter>, \
	},

		TOKEN_FILTER(X_DEFINE_TOKEN_FILTER);

		struct token_filter_info {
			std::string_view name;
			filter::ptr (*make)(std::vector<std::string>&& tokens);
		};

		static constexpr token_filter_info token_filters[] = {
		    TOKEN_FILTER(X_INFO)};
	}  // namespace

	filter::ptr filter::make_tokens(std::string_view field,
	                                std::vector<std::string>&& tokens) {
		for (auto const& [name, factory] : token_filters) {
			if (field == name) return factory(std::move(tokens));
		}
		return {};
	}
}  // namespace movies
