// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <service.hh>
#include <iostream>

namespace movies {
	service::service(rpc::v1::dispatcher* proxy) : proxy_{proxy} {
		proxy->attach(this);
	}

	bool service::init() {
		ctx_.static_files(std::filesystem::current_path() / ".." / "dist");
		std::cout << std::filesystem::current_path() / ".." / "dist" << '\n';
		ctx_.add_protocol(pull_);
		ctx_.add_protocol(push_);

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
