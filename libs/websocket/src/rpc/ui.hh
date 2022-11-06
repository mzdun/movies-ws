// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <rpc/rpc.hh>

namespace movies::ui {
	using namespace movies::ui::v1;
}

#define UI_HANDLERS(X)                         \
	X(movies::ui::v1, LangChange, lang_change) \
	X(movies::ui::v1, GetConfig, get_config)

namespace movies::rpc::v1 {
	UI_HANDLERS(X_MSG_TRAITS);
}  // namespace movies::rpc::v1

namespace movies::ui::v1 {
	UI_HANDLERS(X_MSG_HANDLER_DECL);
}  // namespace movies::ui::v1
