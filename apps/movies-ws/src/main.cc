// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX
#include <libwebsockets.h>

#include <fmt/format.h>
#include <args/parser.hpp>
#include <base/logger.hh>
#include <base/str.hh>
#include <io/file.hpp>
#include <server/lngs.hh>
#include <server/version.hh>
#include <service.hh>
#include <startup.hh>
#include <ws/session.hh>

#define X_CREATE_HANDLER(NS, NAME, VAR) \
	handler.create_handler<NS::NAME##Handler>(backend.get());

struct per_session_dispatcher : movies::rpc::dispatcher {
	void on_connect(ws::session& session) override {
		auto info = std::make_shared<movies::session_info>(
		    exec_path().parent_path() / "lngs"sv);

		session.log("   => {}", fmt::join(info->langs(), ", "));
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
	auto json_db = cast<json::string>(node, u8"db"s);
	auto json_watch_db = cast<json::string>(node, u8"watch-db"s);
	auto json_video_info_db = cast<json::string>(node, u8"video-info-db"s);

	movies::service_cfg result{};
	auto db_dir =
	    fs::weakly_canonical(json_db ? json_filename.parent_path() / *json_db
	                                 : json_filename.parent_path());

	result.database = fs::weakly_canonical(
	    json_path ? json_filename.parent_path() / *json_path
	              : json_filename.parent_path());
	result.watch_db = fs::weakly_canonical(
	    json_watch_db ? db_dir / *json_watch_db : db_dir / u8"watch.sqlite"sv);
	result.video_info_db = fs::weakly_canonical(
	    json_video_info_db ? db_dir / *json_video_info_db
	                       : db_dir / u8"video-info.sqlite"sv);

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

int main(int argc, char** argv) try {
	using movies::logger;

#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	unsigned short port{9876};  // NOLINT(readability-magic-numbers)
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

	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, nullptr);
	fmt::print("\nmovies-ws version {}\n\n", version::string_ui);

	auto backend = std::make_shared<movies::server>(cfg.title, cfg.watch_db,
	                                                cfg.video_info_db);
	per_session_dispatcher handler{};
	DB_HANDLERS(X_CREATE_HANDLER);
	UI_HANDLERS(X_CREATE_HANDLER);

	movies::service service{&handler};

	setup_breaks([&] {
		fmt::print("\n");
		logger().warn("signal intercepted");
		backend->set_on_db_update([&](bool notify,
		                              std::span<std::string> const& lines,
		                              std::source_location const& loc) {
			for (auto const& line : lines) {
				logger(loc).info("{}", line);
			}
			if (notify) {
				logger(loc).warn("  -> Shutting down");
			}
		});
		service.stop();
	});

	backend->set_on_db_update([&](bool notify,
	                              std::span<std::string> const& lines,
	                              std::source_location const& loc) {
		for (auto const& line : lines) {
			logger(loc).info("{}", line);
		}
		if (notify) {
			logger(loc).warn("  -> Sending update");
			service.emit_database_contents_change();
		}
	});

	backend->load(cfg.database);
	service.init(port, cfg);
	{
		auto const db = cfg.database.generic_u8string();
		logger().info("title: {}", cfg.title);
		logger().info("files: {}", movies::as_sv(db));
		logger().info("http://localhost:{}{}/", service.port(), cfg.prefix);
	}
	service.run();
	logger().info("goodbye!");
} catch (std::exception& ex) {
	std::cerr << "Exception: " << ex.what() << '\n';
}
