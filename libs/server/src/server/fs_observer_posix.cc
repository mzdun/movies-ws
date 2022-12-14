// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <server/fs_observer.hh>

namespace movies {
	observer_callback::~observer_callback() = default;
	void observer::observe(observer_callback&, std::filesystem::path const&) {}
}  // namespace movies
