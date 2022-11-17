// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include <iostream>
#include <service.hh>

extern std::filesystem::path exec_path();

namespace movies {
	service::service(rpc::v1::dispatcher* proxy) : proxy_{proxy} {
		proxy->attach(this);
	}

	bool service::init(std::filesystem::path const& database) {
		auto const site = [] {
			std::error_code ec{};

			auto const path = exec_path() / ".." / "site";
			auto const canon = std::filesystem::weakly_canonical(path, ec);

			auto const u8path = (ec ? path : canon).generic_u8string();
			return std::filesystem::path{u8path};
		}();

		ctx_.static_files({
		    {"/"s, site},
		    {"/videos"s, database / "videos"sv},
		    {"/db"s, database / "db"sv},
		});
		ctx_.add_protocol(pull_);
		ctx_.add_protocol(push_);
		std::cout << "SERVING FROM: "sv << as_sv(site.generic_u8string())
		          << '\n';

		return ctx_.build(7681);
	}

	int service::port() const {
		return ctx_.def_vhost_port();
	}

	void service::broadcast(std::span<unsigned char> payload, bool is_binary) {
		push_.broadcast(payload, is_binary);
	}

	void service::run() {
		bool interrupted = false;
		while (!interrupted)
			if (ctx_.service()) interrupted = true;
	}
}  // namespace movies
