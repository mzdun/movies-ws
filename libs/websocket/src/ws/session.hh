// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <any>
#include <list>
#include <ws/ws.hh>

namespace ws {
	class session : public connection,
	                private std::enable_shared_from_this<session> {
	public:
		explicit session(lws* wsi, unsigned id);
		void send(std::span<unsigned char> payload,
		          bool is_binary,
		          ws::conn_stats const&) override;
		session* get_session() override { return this; }

		unsigned id() const noexcept { return id_; }
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

	private:
		lws* wsi_;

		struct message {
			std::vector<unsigned char> payload{};
			bool is_binary{true};

			void store(std::span<unsigned char> data, bool is_binary);
			bool write(lws* wsi);
		};

		std::list<message> outbound_{};
		std::vector<unsigned char> inbound_{};
		unsigned id_{};
		std::any data_{};
		mutable std::mutex m_{};
	};
}  // namespace ws
