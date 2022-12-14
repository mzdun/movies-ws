// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#if defined(_MSC_VER)
#pragma warning(push)
// 4946: reinterpret_cast used between related classes: '???' and 'MessageLite'
#pragma warning(disable : 4946)
#endif

#include <proto/movies/rpc.v1.pb.h>

#if defined(_MSC_VER)
#pragma warning(pop)
#endif

#include <server/server.hh>
#include <ws/protobuf.hh>

namespace movies::rpc {
	using namespace movies::rpc::v1;
}

namespace movies::rpc::v1 {
	using dispatcher = ws::protobuf::dispatcher<Request, GenericResponse>;
	using handler = dispatcher::handler;

	template <typename HandledRequest>
	struct msg_traits;

	template <typename HandledRequest>
	struct msg_traits_is_silent {
		static constexpr auto is_silent = false;
	};

	template <typename HandledRequest,
	          typename HandledResponse,
	          HandledRequest const& (Request::*Getter)() const,
	          HandledResponse* (Response::*Setter)(),
	          Request::MessageCase Case,
	          bool IsSilent>
	struct msg_traits_helper {
		static constexpr auto message_id = Case;
		static constexpr auto is_silent = IsSilent;
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

		using handled_response = typename msg_traits::handled_response;
		using handled_request = typename msg_traits::handled_request;
		static constexpr auto message_id = msg_traits::message_id;

		base_handler(movies::server* server) : server_{server} {}

		// Overridables
		void handle_message(handled_request const& req,
		                    handled_response& resp,
		                    ws::session& session) {}
		void log_call(handled_request const& req, ws::session& session) {}

		movies::server* server() noexcept { return server_; }
		movies::server const* server() const noexcept { return server_; }

	private:
		void handle(query& query) override {
			auto const msgid = query.req().id();
			GenericResponse generic{};
			auto& answer = *generic.mutable_response();
			try {
				auto& resp = msg_traits::resp(answer);
				if constexpr (msg_traits::is_silent) {
					silent = true;
				} else {
					static_cast<Final*>(this)->log_call(
					    msg_traits::req(query.req()),
					    *query.conn()->get_session());
				}
				static_cast<Final*>(this)->handle_message(
				    msg_traits::req(query.req()), resp,
				    *query.conn()->get_session());
			} catch (std::exception& ex) {
				answer.set_error(ex.what());
			}
			answer.set_id(msgid);
			query.send_response(generic, silent);
			silent = false;
		}

		movies::server* server_;

	protected:
		bool silent{false};
	};
};  // namespace movies::rpc::v1

#define MSG_TRAITS(NS, NAME, VAR)                                   \
	template <>                                                     \
	struct msg_traits<NS::NAME##Request>                            \
	    : msg_traits_helper<                                        \
	          NS::NAME##Request, NS::NAME##Response, &Request::VAR, \
	          &Response::mutable_##VAR, Request::k##NAME,           \
	          msg_traits_is_silent<NS::NAME##Request>::is_silent> {}

#define X_MSG_TRAITS(NS, NAME, VAR) MSG_TRAITS(NS, NAME, VAR);

#define MSG_HANDLER_DECL(MESSAGE)                                              \
	class MESSAGE##Handler                                                     \
	    : public ::movies::rpc::v1::base_handler<MESSAGE##Handler,             \
	                                             MESSAGE##Request> {           \
	public:                                                                    \
		using ::movies::rpc::v1::base_handler<MESSAGE##Handler,                \
		                                      MESSAGE##Request>::base_handler; \
		using ::movies::rpc::v1::                                              \
		    base_handler<MESSAGE##Handler, MESSAGE##Request>::handle_message;  \
		void log_call(handled_request const& req, ws::session& session);       \
		void handle_message(handled_request const& req,                        \
		                    handled_response& resp,                            \
		                    ws::session& session);                             \
	}

#define X_MSG_HANDLER_DECL(NS, NAME, VAR) MSG_HANDLER_DECL(NAME);

#define MSG_HANDLER(MESSAGE)                            \
	void MESSAGE##Handler::log_call(                    \
	    [[maybe_unused]] handled_request const& req,    \
	    [[maybe_unused]] ws::session& session) {        \
		session.log(#MESSAGE "({})", log_request(req)); \
	}                                                   \
	void MESSAGE##Handler::handle_message(              \
	    [[maybe_unused]] handled_request const& req,    \
	    [[maybe_unused]] handled_response& resp,        \
	    [[maybe_unused]] ws::session& session)
