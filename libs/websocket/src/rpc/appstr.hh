// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <proto/movies/appstr.v1.pb.h>
#include <webapp/lngs.hh>

namespace movies::ui::v1 {
	void copy_strings(web::Strings const& src, appstr::v1::AppStrings& dst);
}
