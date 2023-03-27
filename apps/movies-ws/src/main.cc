// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX
#include <libwebsockets.h>

#include <fmt/format.h>
#include <args/parser.hpp>
#include <base/logger.hh>
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
int main(int argc, char** argv) try {
	using movies::logger;

#ifdef _WIN32
	SetConsoleOutputCP(CP_UTF8);
#endif

	unsigned short port{9876};  // NOLINT(readability-magic-numbers)
	movies::server_cfg cfg{};

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

		cfg.read(cfg_path);
	}

	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, nullptr);
	fmt::print("\nmovies-ws version {}\n\n", version::string_ui);

	auto backend = std::make_shared<movies::server>(cfg);
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

	backend->load();
	service.init(port, cfg);
	{
		auto const infos = cfg.dirs.infos.generic_u8string();
		auto const images = cfg.dirs.images.generic_u8string();
		auto const videos = cfg.dirs.videos.generic_u8string();
		logger().info("title: {}", movies::as_ascii_view(cfg.title));
		logger().info("infos: {}", movies::as_ascii_view(infos));
		logger().info("images: {}", movies::as_ascii_view(images));
		logger().info("videos: {}", movies::as_ascii_view(videos));
		logger().info("http://localhost:{}{}/", service.port(), cfg.prefix);
	}
	service.run();
	logger().info("goodbye!");
} catch (std::exception& ex) {
	std::cerr << "Exception: " << ex.what() << '\n';
}
