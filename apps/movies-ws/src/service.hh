// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <rpc/db.hh>
#include <rpc/ui.hh>
#include <rpc/rpc.hh>

namespace movies {
	class service : public ws::service {
	public:
		explicit service(rpc::v1::dispatcher* proxy);

		bool init();
		int port() const;
		void run();

		// service
		void broadcast(std::span<unsigned char> payload,
		               bool is_binary) override;

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
