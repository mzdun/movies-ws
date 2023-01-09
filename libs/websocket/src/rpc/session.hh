// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once

#include <server/server.hh>
#include <ws/session.hh>

namespace movies {
	struct session {
		explicit session(ws::session& session)
		    : ptr_{session.data<session_info::ptr>()} {}
		bool lang_change(std::vector<std::string> const& langs) {
			return ref_.lang_change(langs);
		}
		std::vector<std::string> const& langs() const noexcept {
			return ref_.langs();
		}
		std::string const& lang_id() const noexcept { return ref_.lang_id(); }
		Strings const& tr() const noexcept { return ref_.tr(); }
		static std::string invent_id() { return session_info::invent_id(); }
		std::string const& client_id() const noexcept { return ptr_->client_id(); }
		void client_id(std::string const& id) { ptr_->client_id(id); }

	private:
		session_info::ptr ptr_;
		session_info& ref_{*ptr_};
		std::shared_lock<session_info> guard_{ref_};
	};
}  // namespace movies