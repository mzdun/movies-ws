// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <google/protobuf/message.h>
#include <ws/ws.hh>

#if __has_include(<print>)
#include <print>
#define USE_PRINT
namespace fmt::inline v_faux {
	using std::print;
};
#else
#if __has_include(<fmt/format.h>)
#include <fmt/format.h>
#define USE_PRINT
#else
#include <iostream>
#define USE_COUT
#endif
#endif

namespace ws::protobuf {
	template <typename Message>
	inline bool serialize(Message const& msg,
	                      std::vector<unsigned char>& buffer) {
		auto const size = msg.ByteSizeLong();
		buffer.resize(size);
		return msg.SerializeToArray(buffer.data(), ws::isize(buffer));
	}

	template <typename Dispatcher>
	class query {
	public:
		using dispatcher = Dispatcher;
		using request = dispatcher::request;
		using response = dispatcher::response;

		query(connection* conn) : conn_{conn} {}

		bool parse(std::span<unsigned char> const& payload) {
			return req_.ParseFromArray(payload.data(), ws::isize(payload));
		}
		request const& req() const noexcept { return req_; }
		connection* conn() const noexcept { return conn_; }

		bool send_response(response const& resp) {
			std::vector<unsigned char> buffer;
			if (serialize(resp, buffer)) {
				conn_->send(buffer, true);
				return true;
			}
			return false;
		}

	private:
		connection* conn_{};
		request req_{};
	};

	template <typename Dispatcher>
	struct handler {
		using dispatcher = Dispatcher;
		using request = dispatcher::request;
		using response = dispatcher::response;
		using query = ws::protobuf::query<dispatcher>;

		virtual ~handler() = default;
		virtual void handle(query& req) = 0;
	};

	template <typename Request, typename Response>
	class dispatcher : public ws::handler {
	public:
		using request = Request;
		using response = Response;
		using handler = ws::protobuf::handler<dispatcher>;
		using query = handler::query;
		using message_id = request::MessageCase;

		void attach(service* svc) { svc_ = svc; }

		void add_handler(message_id id, std::unique_ptr<handler>&& handler) {
			handlers_[id] = std::move(handler);
		}

		template <typename Handler, typename... Args>
		void create_handler(Args... args) {
			add_handler(Handler::message_id,
			            std::make_unique<Handler>(args...));
		}

	private:
		void handle(std::span<unsigned char> payload,
		            bool /*is_binary*/,
		            connection* conn) override {
			dispatcher::query query{conn};

			if (!query.parse(payload)) {
#ifndef NDEBUG
#if defined(USE_COUT)
				std::cout << "Unrecognized payload\n";
#elif defined(USE_PRINT)
				fmt::print("Unrecognized payload\n");
#endif
#endif
				return;
			}

			auto const req = query.req().message_case();
			auto const it = handlers_.find(req);
			if (it == handlers_.end()) {
#ifndef NDEBUG
				auto const dbg = query.req().DebugString();
#if defined(USE_COUT)
				std::cout << "Unhandled[" << req << "]: " << dbg << '\n';
#elif defined(USE_PRINT)
				fmt::print("Unhandled[{}]: {}\n", req, dbg);
#endif
#endif
				return;
			}

			auto& handler = *it->second;
			handler.handle(query);
		}

		std::map<message_id, std::unique_ptr<handler>> handlers_{};
		service* svc_{};
	};

}  // namespace ws::protobuf
