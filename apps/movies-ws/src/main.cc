#define NOMINMAX
#include <libwebsockets.h>

#include <server/lngs.hh>
#include <service.hh>
#include <ws/session.hh>

#ifdef _WIN32
#include <Windows.h>

std::filesystem::path exec_path() {
	wchar_t modpath[2048];
	GetModuleFileNameW(nullptr, modpath, sizeof(modpath) / sizeof(modpath[0]));
	return modpath;
}
#else
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

int main(int argc, char** argv) {
#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	if (argc < 2) {
		std::fprintf(stderr, "usage: movies-ws <db-dir>\n");
		return 1;
	}

	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, NULL);

	movies::server backend{};
	per_session_dispatcher handler{};
	DB_HANDLERS(X_CREATE_HANDLER);
	UI_HANDLERS(X_CREATE_HANDLER);

	movies::service service{&handler};
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

	backend.load(argv[1]);
	service.init(argv[1]);
	lwsl_user("http://localhost:%d\n", service.port());
	service.run();
}
