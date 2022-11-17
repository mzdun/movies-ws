// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <rpc/db.hh>
#include <rpc/rpc.hh>
#include <rpc/ui.hh>

namespace movies {
	class service : public ws::service {
	public:
		explicit service(rpc::v1::dispatcher* proxy);

		bool init(std::filesystem::path const& database);
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
			if (ws::protobuf::serialize(ev, buffer)) broadcast(buffer, true);
		}

		ws::handler* proxy_;
		ws::web_socket push_{"push", nullptr, false};
		ws::web_socket pull_{"pull", proxy_, false};
		ws::server_context ctx_{};
	};
};  // namespace movies
