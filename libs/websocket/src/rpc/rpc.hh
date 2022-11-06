// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <proto/movies/rpc.v1.pb.h>
#include <server/server.hh>
#include <ws/protobuf.hh>

namespace movies::rpc {
	using namespace movies::rpc::v1;
}

namespace movies::rpc::v1 {
	using dispatcher = ws::protobuf::dispatcher<Request, Response, Event>;
	using handler = dispatcher::handler;

	template <typename HandledRequest>
	struct msg_traits;

	template <typename HandledRequest,
	          typename HandledResponse,
	          HandledRequest const& (Request::*Getter)() const,
	          HandledResponse* (Response::*Setter)(),
	          Request::MessageCase Case>
	struct msg_traits_helper {
		static constexpr auto message_id = Case;
		using handled_request = HandledRequest;
		using handled_response = HandledResponse;
		static handled_request const& req(Request const& req) {
			return (req.*Getter)();
		}
		static handled_response& resp(Response& resp) {
			return *(resp.*Setter)();
		}
	};

	template <typename Final, typename HandledRequest>
	class base_handler : public handler {
	public:
		using msg_traits = movies::rpc::msg_traits<HandledRequest>;

		using handled_response = msg_traits::handled_response;
		using handled_request = msg_traits::handled_request;
		static constexpr auto message_id = msg_traits::message_id;

		base_handler(movies::server* server) : server_{server} {}

		// Overridables
		bool handle_message(handled_request const& req, Response& resp) {
			return static_cast<Final*>(this)->handle_message(
			    req, msg_traits::resp(resp));
		}

		bool handle_message(handled_request const& req,
		                    handled_response& resp) {
			return false;
		}

		movies::server* server() noexcept { return server_; }
		movies::server const* server() const noexcept { return server_; }

	private:
		bool handle(query& query) override {
			auto const msgid = query.req().id();
			Response resp{};
			if (!static_cast<Final*>(this)->handle_message(
			        msg_traits::req(query.req()), resp))
				return false;
			resp.set_id(query.req().id());
			return query.send_response(resp);
		}

		movies::server* server_;
	};
};  // namespace movies::rpc::v1

#define MSG_TRAITS(NS, NAME, VAR)                                    \
	template <>                                                      \
	struct msg_traits<NS::NAME##Request>                             \
	    : msg_traits_helper<NS::NAME##Request, NS::NAME##Response,   \
	                        &Request::VAR, &Response::mutable_##VAR, \
	                        Request::k##NAME> {}

#define X_MSG_TRAITS(NS, NAME, VAR) MSG_TRAITS(NS, NAME, VAR);

#define MSG_HANDLER_DECL(MESSAGE)                                             \
	class MESSAGE##Handler                                                    \
	    : public ::movies::rpc::v1::base_handler<MESSAGE##Handler,               \
	                                          MESSAGE##Request> {             \
	public:                                                                   \
		using ::movies::rpc::v1::base_handler<MESSAGE##Handler,                  \
		                                   MESSAGE##Request>::base_handler;   \
		using ::movies::rpc::v1::base_handler<MESSAGE##Handler,                  \
		                                   MESSAGE##Request>::handle_message; \
		bool handle_message(handled_request const& req,                       \
		                    handled_response& resp);                          \
	}

#define X_MSG_HANDLER_DECL(NS, NAME, VAR) MSG_HANDLER_DECL(NAME);

#define MSG_HANDLER(MESSAGE)                                          \
	bool MESSAGE##Handler::handle_message(handled_request const& req, \
	                                      handled_response& resp)
