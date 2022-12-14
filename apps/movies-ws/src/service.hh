// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <rpc/db.hh>
#include <rpc/rpc.hh>
#include <rpc/ui.hh>

namespace movies {
	struct service_cfg {
		std::filesystem::path database;
		std::string prefix;
		int port;
	};
	class service : public ws::service {
	public:
		explicit service(rpc::v1::dispatcher* proxy);

		bool init(service_cfg const& cfg);
		int port() const;
		void run();

		// service
		void broadcast(std::span<unsigned char> payload,
		               bool is_binary) override;

		void emit_database_contents_change() {
			rpc::v1::Event event{};
			event.mutable_database_contents_change();
			broadcast(event);
		}

	private:
		void broadcast(rpc::v1::Event const& ev) {
			std::vector<unsigned char> buffer;
			rpc::v1::GenericResponse response{};
			*response.mutable_event() = ev;
			if (ws::protobuf::serialize(response, buffer))
				broadcast(buffer, true);
		}

		ws::handler* proxy_;
		ws::web_socket conn_{"data"s, proxy_, ws::default_protocol};
		ws::server_context ctx_{};
	};
};  // namespace movies
