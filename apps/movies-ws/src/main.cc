// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX
#include <libwebsockets.h>

#include <fmt/format.h>
#include <args/parser.hpp>
#include <base/str.hh>
#include <io/file.hpp>
#include <server/lngs.hh>
#include <server/version.hh>
#include <service.hh>
#include <ws/session.hh>

#ifdef _WIN32
#include <Windows.h>

std::filesystem::path exec_path() {
	wchar_t modpath[2048];
	GetModuleFileNameW(nullptr, modpath, sizeof(modpath) / sizeof(modpath[0]));
	return modpath;
}

static movies::service* ptr;

BOOL WINAPI CtrlHandler(DWORD fdwCtrlType) {
	switch (fdwCtrlType) {
		case CTRL_C_EVENT:
		case CTRL_CLOSE_EVENT:
		case CTRL_BREAK_EVENT:
			lwsl_warn("signal intercepted\n");
			ptr->stop();
			return TRUE;
		default:
			break;
	}
	return FALSE;
}

void setup_breaks(movies::service& service) {
	ptr = &service;
	SetConsoleCtrlHandler(CtrlHandler, TRUE);
}

#else
#include <signal.h>

std::filesystem::path exec_path() {
	using namespace std::literals;
	std::error_code ec;
	static constexpr std::string_view self_links[] = {
	    "/proc/self/exe"sv,
	    "/proc/curproc/file"sv,
	    "/proc/curproc/exe"sv,
	    "/proc/self/path/a.out"sv,
	};
	for (auto path : self_links) {
		auto link = std::filesystem::read_symlink(path, ec);
		if (!ec) return link;
	}
	[[unlikely]];  // GCOV_EXCL_LINE[POSIX]
	return {};     // GCOV_EXCL_LINE[POSIX]
}

static movies::service* ptr;

void install(int sig, void signal_handler(int)) {
	struct sigaction handler;
	memset(&handler, 0, sizeof(handler));
	handler.sa_handler = signal_handler;
	sigfillset(&handler.sa_mask);
	::sigaction(sig, &handler, 0);
}

void setup_breaks(movies::service& service) {
	ptr = &service;
	auto const handler = +[](int) {
		lwsl_warn("signal intercepted\n");
		ptr->stop();
	};
	install(SIGINT, handler);
	install(SIGTERM, handler);
}

#endif

#define X_CREATE_HANDLER(NS, NAME, VAR) \
	handler.create_handler<NS::NAME##Handler>(&backend);

struct per_session_dispatcher : movies::rpc::dispatcher {
	void on_connect(ws::session& session) override {
		auto info = std::make_shared<movies::session_info>(
		    exec_path().parent_path() / "lngs"sv);

		std::string dbg;
		for (auto const& lng : info->langs()) {
			if (!dbg.empty()) dbg += ", ";
			dbg.append(lng);
		}
		lwsl_user("<%u>    => %s\n", session.id(), dbg.c_str());

		session.attach(std::move(info));
	}

	void on_disconnect(ws::session&) override {}
};

movies::service_cfg load(fs::path const& json_filename) {
	auto const data = io::contents(json_filename);
	auto node = json::read_json({data.data(), data.size()});
	auto json_prefix = cast<json::string>(node, u8"mount"s);
	auto json_path = cast<json::string>(node, u8"path"s);
	auto json_title = cast<json::string>(node, u8"title"s);

	movies::service_cfg result{};
	result.database = fs::weakly_canonical(
	    json_path ? json_filename.parent_path() / *json_path
	              : json_filename.parent_path());
	if (json_prefix) result.prefix.assign(movies::as_sv(*json_prefix));
	if (result.prefix.empty() || result.prefix.front() != '/')
		result.prefix.insert(result.prefix.begin(), '/');
	if (result.prefix.back() == '/') result.prefix.pop_back();
	if (json_title)
		result.title.assign(movies::as_sv(*json_title));
	else
		result.title.assign(movies::as_sv(json_filename.stem().u8string()));

	return result;
}

int main(int argc, char** argv) {
#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	unsigned short port{9876};
	movies::service_cfg cfg{};

	{
		std::filesystem::path cfg_path{};

		args::null_translator tr{};
		args::parser parser{"WebSocket server for movies library",
		                    args::from_main(argc, argv), &tr};
		parser.arg(port, "port")
		    .meta("<number>")
		    .help(fmt::format("select port to run on; defaults to {}", port))
		    .opt();
		parser.arg(cfg_path, "config")
		    .meta("<json>")
		    .help("describe the repository");
		parser.parse();

		if (cfg_path.is_relative())
			cfg_path = std::filesystem::weakly_canonical(cfg_path);

		cfg = load(cfg_path);
	}

	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, NULL);
	lwsl_user("movies-ws version %s\n", version::string_ui);

	movies::server backend{};
	per_session_dispatcher handler{};
	DB_HANDLERS(X_CREATE_HANDLER);
	UI_HANDLERS(X_CREATE_HANDLER);

	movies::service service{&handler};
	setup_breaks(service);
	backend.set_on_db_update(
	    [&](bool notify, std::span<std::string> const& lines) {
		    for (auto const& line : lines) {
			    lwsl_user("%s", line.c_str());
		    }
		    if (notify) {
			    lwsl_user("  -> Sending update\n");
			    service.emit_database_contents_change();
		    }
	    });

	backend.load(cfg.database);
	service.init(port, cfg);
	lwsl_user("%s\n", cfg.title.c_str());
	lwsl_user("%s\n", reinterpret_cast<char const*>(
	                      cfg.database.generic_u8string().c_str()));
	lwsl_user("http://localhost:%d%s/\n", service.port(), cfg.prefix.c_str());
	service.run();
	lwsl_user("goodbye!\n");
}
