// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <filesystem>
#include <functional>

std::filesystem::path exec_path();
void setup_breaks(std::function<void()> const& handler);
