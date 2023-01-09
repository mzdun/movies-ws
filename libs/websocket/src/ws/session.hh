// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <fmt/format.h>
#include <any>
#include <list>
#include <ws/ws.hh>

namespace ws {
	class session : public connection,
	                private std::enable_shared_from_this<session> {
	public:
		explicit session(lws* wsi, unsigned id, activity_logger* logger);
		void send(std::span<unsigned char> payload,
		          bool is_binary,
		          ws::conn_stats const&) override;
		session* get_session() override { return this; }

		unsigned id() const noexcept { return id_; }
		std::string const& name() const noexcept { return name_; }
		void name(std::string const& id) { name_ = id; }
		std::string const& ip() const noexcept { return ip_; }
		void ip(std::string const& id) { ip_ = id; }

		template <typename Type>
		void attach(Type&& value) {
			data_ = std::forward<Type>(value);
		}
		template <typename Type>
		Type data() const {
			return std::any_cast<Type>(data_);
		}

		void on_write();
		void on_read(void* in, size_t len, handler* handler);

		template <typename... T>
		void log(fmt::format_string<T...> fmt, T&&... args) {
			vlog(fmt, fmt::make_format_args(args...));
		}

	private:
		void vlog(fmt::string_view fmt, fmt::format_args args);

		lws* wsi_;
		unsigned id_{};
		activity_logger* logger_;

		struct message {
			std::vector<unsigned char> payload{};
			bool is_binary{true};

			void store(std::span<unsigned char> data, bool is_binary);
			bool write(lws* wsi);
		};

		std::list<message> outbound_{};
		std::vector<unsigned char> inbound_{};
		std::any data_{};
		std::string ip_{};
		std::string name_{};
		mutable std::mutex m_{};
	};
}  // namespace ws
