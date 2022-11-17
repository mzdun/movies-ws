// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <base/str.hh>
#include "ws/session.hh"

using namespace std::literals;
namespace fs = std::filesystem;

namespace ws {
	service::~service() = default;
	connection::~connection() = default;
	handler::~handler() = default;
	base_lws_protocol::~base_lws_protocol() = default;

	static const struct lws_protocol_vhost_options map_mime = {
	    .name = ".map",
	    .value = "application/json"};

	static const struct lws_protocol_vhost_options ts_mime = {
	    .next = &map_mime,
	    .name = ".ts",
	    .value = "application/x-typescript"};

	static const struct lws_protocol_vhost_options pvo_mime = {
	    .next = &ts_mime,
	    .name = ".mp4",
	    .value = "video/mp4"};

	static const struct lws_protocol_vhost_options header_x_frame_options = {
	    .name = "X-Frame-Options",
	    .value = "deny"};
	static const struct lws_protocol_vhost_options header_x_xss_protection = {
	    .next = &header_x_frame_options,
	    .name = "X-XSS-Protection",
	    .value = "1; mode=block"};
	static const struct lws_protocol_vhost_options
	    header_x_content_type_options = {.next = &header_x_xss_protection,
	                                     .name = "X-Content-Type-Options",
	                                     .value = "nosniff"};
	static const struct lws_protocol_vhost_options header_csp = {
	    .next = &header_x_content_type_options,
	    .name = "Content-Security-Policy",
	    .value =
	        "default-src 'none'; img-src 'self' data: ; media-src 'self'; "
	        "script-src 'self'; font-src 'self'; style-src 'self'; connect-src "
	        "'self' ws: wss:; frame-ancestors 'none'; base-uri "
	        "'none';form-action 'self';"};

	void server_context::static_files(
	    std::map<std::string, fs::path> const& path) {
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

		data.mounts.resize(static_.size());
		{
			auto it = data.mounts.begin();
			for (auto const& [mount, path] : static_) {
				auto& mount_point = *it++;
				mount_point.u8path = path.generic_u8string();
				mount_point.mount = mount;

				auto const u8str = mount_point.u8path.c_str();

				mount_point.info = {
				    .mountpoint = mount_point.mount.c_str(),
				    .origin = reinterpret_cast<char const*>(u8str),
				    .def = "index.html",
				    .extra_mimetypes = &pvo_mime,
				    .origin_protocol = LWSMPRO_FILE,
				    .mountpoint_len =
				        static_cast<unsigned char>(mount_point.mount.size()),
				};
			}

			struct lws_http_mount* mount_next = nullptr;
			for (auto indexPlus1 = data.mounts.size(); indexPlus1 > 0;
			     --indexPlus1) {
				auto& mount_point = data.mounts[indexPlus1 - 1];
				mount_point.info.mount_next = mount_next;
				mount_next = &mount_point.info;
			}
		}

		data.info = {
		    .protocols = data.protocols.data(),
		    .headers = &header_csp,
		    .mounts = &data.mounts.front().info,
		    .port = port,
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
		return lws_callback_http_dummy(wsi, reason, user, in, len);
	}
}  // namespace ws
