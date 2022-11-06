// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <string_view>

namespace movies {
	template <typename... Lambda>
	struct overload : Lambda... {
		using Lambda::operator()...;
	};
	template <typename... Lambda>
	overload(Lambda...) -> overload<Lambda...>;
}  // namespace movies
