#define NOMINMAX
#include <libwebsockets.h>

#include <base/str.hh>
#include <io/file.hpp>
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

static constexpr auto error_message = R"(usage: movies-ws <db-config>

config: {
	port: unsigned short,
	path: rel | abs,
	mount?: string = "/",
	title?: string = "",
	adult?: bool | "mixed" = false,
}
)";

movies::service_cfg load(fs::path const& json_filename) {
	auto const data = io::contents(json_filename);
	auto node = json::read_json({data.data(), data.size()});
	auto json_port = cast<long long>(node, u8"port"s);
	auto json_prefix = cast<json::string>(node, u8"mount"s);
	auto json_path = cast<json::string>(node, u8"path"s);

	if (!json_port || !json_path || *json_port < 0 ||
	    static_cast<unsigned long long>(*json_port) >
	        std::numeric_limits<unsigned short>::max()) {
		std::fprintf(stderr, error_message);
		std::exit(1);
	}

	movies::service_cfg result{};
	result.database = fs::canonical(json_filename.parent_path() / *json_path);
	result.port = static_cast<int>(*json_port);
	if (json_prefix) result.prefix.assign(movies::as_sv(*json_prefix));
	if (result.prefix.empty() || result.prefix.front() != '/')
		result.prefix.insert(result.prefix.begin(), '/');
	if (result.prefix.back() == '/') result.prefix.pop_back();

	return result;
}

int main(int argc, char** argv) {
#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	if (argc < 2) {
		std::fprintf(stderr, error_message);
		return 1;
	}

	auto const cfg = load(argv[1]);

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

	backend.load(cfg.database);
	service.init(cfg);
	lwsl_user(
	    "http://localhost:%d%s/ %s\n", service.port(), cfg.prefix.c_str(),
	    reinterpret_cast<char const*>(cfg.database.generic_u8string().c_str()));
	service.run();
}
