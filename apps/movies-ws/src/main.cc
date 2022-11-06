#include <libwebsockets.h>

#include <service.hh>

#ifdef _WIN32
#define NOMINMAX
#include <Windows.h>
#undef min
#undef max
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

	movies::server backend{};
	backend.load(argv[1]);
	movies::rpc::dispatcher handler{};
	DB_HANDLERS(X_CREATE_HANDLER);
	UI_HANDLERS(X_CREATE_HANDLER);

	movies::service service{&handler};
	// backend.set_sink(&service);
	service.init();
	lwsl_user("http://localhost:%d\n", service.port());
	service.run();
}
