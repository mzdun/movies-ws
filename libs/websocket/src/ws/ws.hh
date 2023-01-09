// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <fmt/chrono.h>
#include <fmt/format.h>
#include <libwebsockets.h>
#include <filesystem>
#include <map>
#include <memory>
#include <mutex>
#include <span>
#include <unordered_map>

namespace ws {
	template <typename T>
	struct closer {};

	template <typename T>
	using ptr = std::unique_ptr<T, ws::closer<T>>;

	template <>
	struct closer<lws_context> {
		void operator()(lws_context* context) { lws_context_destroy(context); }
	};

	class context : private ptr<lws_context> {
	public:
		using ptr<lws_context>::ptr;
		using ptr<lws_context>::get;
		using ptr<lws_context>::operator bool;

		int service() const { return ::lws_service(get(), 0); }
	};

	inline context create_context(lws_context_creation_info const* info) {
		return context{::lws_create_context(info)};
	}

	struct service {
		virtual ~service();
		virtual void broadcast(std::span<unsigned char> payload,
		                       bool is_binary) = 0;
	};

	class session;

	struct conn_stats {
		using clock = std::chrono::steady_clock;
		using time_point = clock::time_point;

		void parsed() { parsed_ = clock::now(); }
		void found() { found_ = clock::now(); }
		void handled() { handled_ = clock::now(); }
		void packed() {
			packed_ = clock::now();
			active_ = true;
		}
		bool silent() const noexcept { return silent_; }

#define dur_arg(name, start, stop) \
	fmt::arg(name, duration_cast<milliseconds>(stop - start))
		std::string msg() const {
			using namespace std::chrono;
			if (!active_) return {};
			return fmt::format(
			    " (handled: {handled}, packed: {packed}, total: {total})",
			    dur_arg("handled", found_, handled_),
			    dur_arg("packed", handled_, packed_),
			    dur_arg("total", start_, packed_));
		}
#undef dur_arg

		bool active_{false};
		bool silent_{false};
		time_point start_{clock::now()}, parsed_{}, found_{}, handled_{},
		    packed_{};
	};

	struct connection {
		virtual ~connection();
		virtual void send(std::span<unsigned char> payload,
		                  bool is_binary,
		                  conn_stats const& stats) = 0;
		virtual session* get_session() = 0;
	};

	struct handler {
		virtual ~handler();
		virtual void handle(std::span<unsigned char> payload,
		                    bool is_binary,
		                    connection* conn) = 0;
		virtual void on_connect(session&) = 0;
		virtual void on_disconnect(session&) = 0;
	};

	enum proto_priority { default_protocol = true, normal_protocol = false };

	struct base_lws_protocol {
		virtual ~base_lws_protocol();
		virtual lws_protocols make_protocol() = 0;
		virtual proto_priority priorty() const noexcept = 0;
	};

	template <typename ProtocolImpl>
	struct lws_protocol;

	class server_context {
	public:
		template <typename ProtocolImpl>
		void add_protocol(ProtocolImpl&& impl) {
			using DerefedProtocol = std::remove_cvref_t<ProtocolImpl>;
			protos_.push_back(
			    std::make_unique<lws_protocol<DerefedProtocol>>(impl));
		}

		void static_files(std::map<std::string, std::filesystem::path> const&);
		bool build(int port, std::string const& prefix);
		int def_vhost_port() const;
		bool service();

		lws_http_mount const* mount_point() const noexcept {
			if (data.mounts.empty()) return nullptr;
			return &data.mounts.front().info;
		}

	private:
		struct lws_mount_data {
			std::u8string u8path{};
			std::string mount{};
			lws_http_mount info{};
		};
		struct lws_data {
			std::vector<lws_protocols> protocols{};
			std::vector<lws_mount_data> mounts{};
			lws_context_creation_info info{};
		} data;
		std::map<std::string, std::filesystem::path> static_{};
		std::vector<std::unique_ptr<base_lws_protocol>> protos_;
		context context_{};
	};

	template <typename ProtocolImpl>
	inline int lws_callback(lws* wsi,
	                        lws_callback_reasons reason,
	                        void* user,
	                        void* in,
	                        size_t len) {
		auto proto = lws_get_protocol(wsi);
		auto self = reinterpret_cast<ProtocolImpl*>(proto->user);
		return self->lws_callback(wsi, reason, user, in, len);
	}

	template <typename ProtocolImpl>
	inline const char* protocol_name(ProtocolImpl* impl) {
		return impl->name().c_str();
	}

	template <typename ProtocolImpl>
	inline proto_priority protocol_priority(ProtocolImpl* impl) {
		return impl->priority();
	}

	template <typename ProtocolImpl>
	inline lws_protocols make_protocol(ProtocolImpl* impl) {
		return {
		    .name = protocol_name(impl),
		    .callback = lws_callback<ProtocolImpl>,
		    .user = impl,
		};
	}

	template <typename ProtocolImpl>
	struct nonowning_lws_protocol : base_lws_protocol {
		nonowning_lws_protocol(ProtocolImpl& impl) : impl{&impl} {}
		lws_protocols make_protocol() override {
			return ws::make_protocol(impl);
		}

		proto_priority priorty() const noexcept override {
			return ws::protocol_priority(impl);
		}

		ProtocolImpl* impl{};
	};

	struct activity_logger {
		enum class op {
			connected,
			disconnected,
		};
		virtual ~activity_logger() = default;

		template <typename... T>
		void log(session* session, fmt::format_string<T...> fmt, T&&... args) {
			vlog(session, fmt, fmt::make_format_args(args...));
		}
		void log(lws* wsi, session* session, op operation);
		virtual void vlog(session* session,
		                  fmt::string_view fmt,
		                  fmt::format_args args) = 0;
	};

	class web_socket {
	public:
		explicit web_socket(std::string&& name,
		                    handler* handler,
		                    activity_logger* logger,
		                    proto_priority priority = normal_protocol);
		~web_socket();
		std::string const& name() const noexcept { return name_; }
		proto_priority priority() const noexcept { return priority_; }
		int lws_callback(lws* wsi,
		                 lws_callback_reasons reason,
		                 void* user,
		                 void* in,
		                 size_t len);

		void broadcast(std::span<unsigned char> payload, bool is_binary);

	private:
		std::shared_ptr<session> session_for(lws* wsi);
		void on_write(lws* wsi);
		void on_read(lws* wsi, void* in, size_t len);
		void on_connect(lws* wsi);
		void on_disconnect(lws* wsi);

		std::string name_;
		handler* handler_;
		activity_logger* logger_;
		proto_priority priority_;
		std::unordered_map<lws*, std::shared_ptr<session>> sessions_;
		mutable std::mutex m_;
	};

	template <>
	struct lws_protocol<web_socket> : nonowning_lws_protocol<web_socket> {
		using nonowning_lws_protocol<web_socket>::nonowning_lws_protocol;
	};

	template <typename C>
	inline int isize(C const& coll) {
		auto const size = std::size(coll);
		static constinit auto const max_int =
		    static_cast<decltype(size)>((std::numeric_limits<int>::max)());
		if (size > max_int) return static_cast<int>(max_int);
		return static_cast<int>(size);
	}
}  // namespace ws
