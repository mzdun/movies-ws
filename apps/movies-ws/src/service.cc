// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <iostream>
#include <service.hh>
#include <ws/session.hh>

extern std::filesystem::path exec_path();

namespace movies {
	service::service(rpc::v1::dispatcher* proxy) : proxy_{proxy} {
		proxy->attach(this);
	}

	bool service::init(unsigned short port, service_cfg const& cfg) {
		auto const site = [] {
			std::error_code ec{};

			auto const path = exec_path() / ".." / "site";
			auto const canon = std::filesystem::weakly_canonical(path, ec);

			auto const u8path = (ec ? path : canon).generic_u8string();
			return std::filesystem::path{u8path};
		}();

		ctx_.static_files({
		    {cfg.prefix + "/"s, site},
		    {cfg.prefix + "/videos"s, cfg.database / "videos"sv},
		    {cfg.prefix + "/db"s, cfg.database / "db"sv},
		});
		ctx_.add_protocol(conn_);
		logger().warn("SERVING FROM: {}",
		              as_ascii_view(site.generic_u8string()));

		return ctx_.build(port, cfg.prefix);
	}

	int service::port() const { return ctx_.def_vhost_port(); }

	void service::broadcast(std::span<unsigned char> payload, bool is_binary) {
		conn_.broadcast(payload, is_binary);
	}

	void service::run() {
		interrupted = false;
		while (!interrupted)
			if (ctx_.service()) interrupted = true;
	}

	void service::stop() { interrupted = true; }

	void service::activity_logger::vlog(ws::session* session,
	                                    fmt::string_view fmt,
	                                    fmt::format_args args) {
		auto const has_name = session && !session->name().empty();
		std::string faux_name{"-"};
		if (!has_name && session)
			faux_name = fmt::format("conn-{}", session->id());

		auto const has_ip = session && !session->ip().empty();

		print(fmt::format("{} [{}] >", has_ip ? session->ip() : "-"sv,
		                  has_name ? session->name() : faux_name),
		      {}, fmt, args);
	}
}  // namespace movies
