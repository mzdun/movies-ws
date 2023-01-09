// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX

#include <fmt/chrono.h>
#include <base/str.hh>
#include <iostream>
#include <service.hh>
#include <ws/session.hh>

#ifdef _WIN32
using pid_t = DWORD;
inline pid_t getpid() noexcept {
	return GetCurrentProcessId();
}
inline pid_t gettid() noexcept {
	return GetCurrentThreadId();
}
#else
#include <sys/types.h>
#include <unistd.h>
#endif

extern std::filesystem::path exec_path();

namespace movies {
	namespace {
		consteval int width_from(auto value) {
			if (!value) return 0;
			int result = 0;
			while (value) {
				result++;
				value /= 10;
			}
			return result - 1;
		}

		void log(std::string_view discriminator,
		         fmt::string_view fmt,
		         fmt::format_args args) {
			fmt::memory_buffer buffer;
			auto it = std::back_inserter(buffer);

			using namespace std::chrono;
			auto const now = floor<milliseconds>(system_clock::now());
			using period = decltype(now)::duration::period;
			auto const subseconds =
			    now.time_since_epoch().count() % period::den;
			static constexpr auto width = width_from(period::den);

			it = fmt::format_to(
			    it, "{:%Y-%m-%d %H:%M:%S}.{:0{}} (P{}, T{}) {} ", now,
			    subseconds, width, getpid(), gettid(), discriminator);
			it = fmt::vformat_to(it, fmt, args);
			*it++ = '\n';
			*it++ = '\0';

			fputs(buffer.data(), stdout);
		}
	}  // namespace

	service::service(rpc::v1::dispatcher* proxy) : proxy_{proxy} {
		proxy->attach(this);
	}

	bool service::init(unsigned short port, service_cfg const& cfg) {
		auto const site = [] {
			std::error_code ec{};

			auto const path = exec_path() / ".." / "site";
			auto const canon = std::filesystem::weakly_canonical(path, ec);

			auto const u8path = (ec ? path : canon).generic_u8string();
			return std::filesystem::path{u8path};
		}();

		ctx_.static_files({
		    {cfg.prefix + "/"s, site},
		    {cfg.prefix + "/videos"s, cfg.database / "videos"sv},
		    {cfg.prefix + "/db"s, cfg.database / "db"sv},
		});
		ctx_.add_protocol(conn_);
		std::cerr << "SERVING FROM: "sv << as_sv(site.generic_u8string())
		          << '\n';

		return ctx_.build(port, cfg.prefix);
	}

	int service::port() const { return ctx_.def_vhost_port(); }

	void service::broadcast(std::span<unsigned char> payload, bool is_binary) {
		conn_.broadcast(payload, is_binary);
	}

	void service::run() {
		interrupted = false;
		while (!interrupted)
			if (ctx_.service()) interrupted = true;
	}

	void service::stop() { interrupted = true; }

	void service::activity_logger::vlog(ws::session* session,
	                                    fmt::string_view fmt,
	                                    fmt::format_args args) {
		auto const has_name = session && !session->name().empty();
		std::string faux_name{"-"};
		if (!has_name && session)
			faux_name = fmt::format("conn-{}", session->id());

		auto const has_ip = session && !session->ip().empty();

		movies::log(fmt::format("{} [{}] >", has_ip ? session->ip() : "-"sv,
		                        has_name ? session->name() : faux_name),
		            fmt, args);
	}
}  // namespace movies
