// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <filters/filter.hh>
#include "internal.hh"

using namespace std::literals;

namespace movies::filters {
	template <typename Final>
	class on_off_filter : public filter {
	public:
		explicit on_off_filter(bool on) : on_{on} {}

		bool matches(extended_info const& data) const noexcept {
			auto const self = static_cast<Final const*>(this);
			return self->access(data) == on_;
		}

		static ptr factory(bool on) { return std::make_unique<Final>(on); }
		static bool quick_match(extended_info const& data) noexcept {
			return Final{true}.matches(data);
		}

	private:
		bool on_{true};
	};

#define X_ON_OFF(NAME)                                                \
	class NAME##_filter : public on_off_filter<NAME##_filter> {       \
	public:                                                           \
		using on_off_filter<NAME##_filter>::on_off_filter;            \
		inline bool access(extended_info const& data) const noexcept; \
	};
	ON_OFF_FILTER(X_ON_OFF);
#undef X_ON_OFF
}  // namespace movies::filters
