// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <string>
#include <string_view>

namespace movies {
	inline std::u8string_view as_u8v(std::string_view v) {
		return {reinterpret_cast<char8_t const*>(v.data()), v.size()};
	}

	inline std::string_view as_sv(std::u8string_view v) {
		return {reinterpret_cast<char const*>(v.data()), v.size()};
	}

	inline std::u8string as_u8s(std::string_view v) {
		return {reinterpret_cast<char8_t const*>(v.data()), v.size()};
	}

	inline std::u8string as_u8s(std::u8string_view v) {
		return {v.data(), v.size()};
	}

	inline std::string as_str(std::u8string_view v) {
		return {reinterpret_cast<char const*>(v.data()), v.size()};
	}

	inline std::string as_str(std::string_view v) {
		return {v.data(), v.size()};
	}
}  // namespace movies
