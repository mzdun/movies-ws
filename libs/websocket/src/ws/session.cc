// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include "ws/session.hh"

namespace ws {
	session::session(lws* wsi) : wsi_{wsi} {}

	void session::send(std::span<unsigned char> payload, bool is_binary) {
		{
			std::lock_guard lock{m_};
			outbound_.emplace_back();
			auto& out = outbound_.back();
			out.is_binary = is_binary;
			out.payload.resize(payload.size() + 2 * LWS_PRE);
			std::memcpy(out.payload.data() + LWS_PRE, payload.data(),
			            payload.size());
		}
		lwsl_warn("[%s] send %zu byte%s\n", lws_protocol_get(wsi_)->name,
		          payload.size(), payload.size() == 1 ? "" : "s");
		lws_callback_on_writable(wsi_);
	}

	void session::on_write() {
		message buffer;
		bool repeat{false};
		size_t size{};
		{
			std::lock_guard lock{m_};
			if (outbound_.empty()) return;
			size = outbound_.size();
			buffer = std::move(outbound_.front());
			outbound_.pop_front();
			repeat = !outbound_.empty();
		}

		if (!buffer.write(wsi_)) {
			// TODO: error reporting
		}

		if (repeat) {
			lws_callback_on_writable(wsi_);
		}
	}

	void session::on_read(void* in, size_t len, handler* handler) {
		auto const ptr = static_cast<unsigned char*>(in);
		auto const first = lws_is_first_fragment(wsi_);
		auto const last = lws_is_final_fragment(wsi_);
		// auto const binary = lws_is_first_fragment(wsi_);

		if (first && last) {
			// no crit section
			handler->handle({ptr, len}, lws_frame_is_binary(wsi_), this);
			return;
		}

		std::vector<unsigned char> inbound;
		bool is_binary{false};

		{
			std::lock_guard lock{m_};
			if (first) {
				inbound_.clear();
			}

			inbound_.insert(inbound_.end(), ptr, ptr + len);

			if (!last) return;

			std::swap(inbound, inbound_);
			is_binary = lws_frame_is_binary(wsi_);
		}

		handler->handle(inbound, is_binary, this);
	}

	void session::message::store(std::span<unsigned char> data, bool binary) {
		is_binary = binary;
		payload.resize(data.size() + 2 * LWS_PRE);
		std::memcpy(payload.data() + LWS_PRE, data.data(), data.size());
	}

	bool session::message::write(lws* wsi) {
		auto const written = lws_write(
		    wsi, payload.data() + LWS_PRE, payload.size() - 2 * LWS_PRE,
		    is_binary ? LWS_WRITE_BINARY : LWS_WRITE_TEXT);
		return written == payload.size();
	}
}  // namespace ws
