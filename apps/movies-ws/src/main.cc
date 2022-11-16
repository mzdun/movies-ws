#define NOMINMAX
#include <libwebsockets.h>

#include <server/lngs.hh>
#include <service.hh>

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

int main(int argc, char** argv) {
#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	if (argc < 2) {
		std::fprintf(stderr, "usage: movies-ws <db-dir>\n");
		return 1;
	}

	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, NULL);

	movies::server backend{exec_path().parent_path() / "lngs"sv};
	movies::rpc::dispatcher handler{};
	DB_HANDLERS(X_CREATE_HANDLER);
	UI_HANDLERS(X_CREATE_HANDLER);

	movies::service service{&handler};
	backend.set_on_db_update(
	    [&](bool, std::span<std::string> const& lines) {
		    for (auto const& line : lines) {
			    lwsl_user("%s", line.c_str());
		    }
	    });

	backend.load(argv[1]);
	service.init();
	lwsl_user("http://localhost:%d\n", service.port());
	service.run();
}
