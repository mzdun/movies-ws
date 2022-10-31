// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include "ws/session.hh"

namespace ws {
	service::~service() = default;
	connection::~connection() = default;
	handler::~handler() = default;
	base_lws_protocol::~base_lws_protocol() = default;

	static const struct lws_protocol_vhost_options map_mime = {
	    .name = ".map",
	    .value = "application/json"};

	static const struct lws_protocol_vhost_options pvo_mime = {
		.next = &map_mime,
	    .name = ".ts",
	    .value = "application/x-typescript"};

	void server_context::static_files(std::filesystem::path const& path) {
		struct http_proto : base_lws_protocol {
			lws_protocols make_protocol() override {
				return {
				    .name = "http",
				    .callback = lws_callback_http_dummy,
				};
			}
		};

		static_ = path;
		protos_.push_back(std::make_unique<http_proto>());
	}

	bool server_context::build(int port) {
		data.protocols.reserve(protos_.size() + 1);
		for (auto& proto : protos_)
			data.protocols.push_back(proto->make_protocol());
		data.protocols.push_back(LWS_PROTOCOL_LIST_TERM);

		data.u8path = static_.generic_u8string();
		auto const u8str = data.u8path.c_str();

		data.mount = {
		    .mountpoint = "/",
		    .origin = reinterpret_cast<char const*>(u8str),
		    .def = "index.html",
		    .extra_mimetypes = &pvo_mime, 
		    .origin_protocol = LWSMPRO_FILE,
		    .mountpoint_len = 1,
		};

		data.info = {
		    .protocols = data.protocols.data(),
		    .mounts = &data.mount,
		    .port = port,
		    .options =
		        LWS_SERVER_OPTION_HTTP_HEADERS_SECURITY_BEST_PRACTICES_ENFORCE,
		};

		context_ = create_context(&data.info);
		return !!context_;
	}

	int server_context::def_vhost_port() const {
		auto const vhost = lws_get_vhost_by_name(context_.get(), "default");
		return lws_get_vhost_port(vhost);
	}

	bool server_context::service() {
		return context_.service();
	}

	web_socket::web_socket(std::string const& name,
	                       handler* handler,
	                       bool with_http)
	    : name_{name}, handler_{handler}, with_http_{with_http} {}

	web_socket::~web_socket() = default;

	void web_socket::broadcast(std::span<unsigned char> payload,
	                           bool is_binary) {
		std::vector<std::shared_ptr<session>> sessions;

		{
			std::lock_guard lock{m_};
			sessions.reserve(sessions_.size());
			for (auto& [_, session] : sessions_)
				sessions.push_back(session);
		}

		for (auto& session : sessions)
			session->send(payload, is_binary);
	}

	void web_socket::on_write(lws* wsi) {
		auto session = session_for(wsi);
		if (session) session->on_write();
	}

	void web_socket::on_read(lws* wsi, void* in, size_t len) {
		if (!handler_) return;
		auto session = session_for(wsi);
		if (session) session->on_read(in, len, handler_);
	}

	void web_socket::on_connect(lws* wsi) {
		lwsl_warn("[%s] CONNECTED\n", lws_protocol_get(wsi)->name);
		std::lock_guard lock{m_};
		sessions_[wsi] = std::make_shared<session>(wsi);
	}

	void web_socket::on_disconnect(lws* wsi) {
		{
			std::lock_guard lock{m_};
			auto const it = sessions_.find(wsi);
			if (it != sessions_.end()) sessions_.erase(it);
		}
		lwsl_warn("[%s] DISCONNECTED\n", lws_protocol_get(wsi)->name);
	}

	std::shared_ptr<session> web_socket::session_for(lws* wsi) {
		std::lock_guard lock{m_};
		auto const it = sessions_.find(wsi);
		if (it == sessions_.end()) return {};
		return it->second;
	}

	int web_socket::lws_callback(lws* wsi,
	                             lws_callback_reasons reason,
	                             void* user,
	                             void* in,
	                             size_t len) {
		switch (reason) {
			case LWS_CALLBACK_ESTABLISHED:
				on_connect(wsi);
				return 0;
			case LWS_CALLBACK_CLOSED:
				on_disconnect(wsi);
				return 0;
			case LWS_CALLBACK_RECEIVE:
				on_read(wsi, in, len);
				return 0;
			case LWS_CALLBACK_SERVER_WRITEABLE:
				on_write(wsi);
				return 0;
		}
		if (with_http_)
			return lws_callback_http_dummy(wsi, reason, user, in, len);
		return 0;
	}
}  // namespace ws
