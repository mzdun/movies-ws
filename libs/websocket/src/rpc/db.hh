// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <rpc/rpc.hh>

namespace movies::db {
	using namespace movies::db::v1;
}

#define DB_HANDLERS(X)                                      \
	X(movies::db::v1, GetListing, get_listing)              \
	X(movies::db::v1, GetFilterListing, get_filter_listing) \
	X(movies::db::v1, GetMovieInfo, get_movie_info)         \
	X(movies::db::v1, GetVideoFile, get_video_file)

namespace movies::rpc::v1 {
	DB_HANDLERS(X_MSG_TRAITS);
}  // namespace movies::rpc::v1

namespace movies::db::v1 {
	DB_HANDLERS(X_MSG_HANDLER_DECL);
}  // namespace movies::db::v1
