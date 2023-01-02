// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <fmt/format.h>
#include <signal.h>  // NOLINT(modernize-deprecated-headers)
#include <sys/wait.h>
#include <startup.hh>

using namespace std::literals;

using process = int;
process start_ws(std::filesystem::path const& executable,
                 std::vector<char*>& argv) {
	auto pid = fork();
	if (pid == 0) {
		execv(executable.c_str(), argv.data());
		_exit(1);
	}

	return pid;
}

void send_interrupt(process pid) {
	kill(pid, SIGINT);
}

void wait_for_process(std::filesystem::path const& executable, process pid) {
	if (pid < 0) {
		fprintf(stderr, "%s error: %d\n", executable.c_str(), pid);
	} else if (pid > 0) {
		fprintf(stderr, "%s pid: %d\n", executable.c_str(), pid);

		int status{};
		waitpid(pid, &status, 0);
		if (status) printf("%s returned: %d\n", executable.c_str(), status);
	}
}

#ifdef _WIN32
#define EXE(NAME) NAME ".exe"sv
#else
#define EXE(NAME) NAME ""sv
#endif

int main() {
	auto executable = exec_path().parent_path() / EXE("movies-ws");

	std::vector args_storage{
	    "movies-ws"s,
	    "--config"s,
	    [] {
		    auto const env = getenv("REPO_NAME");
		    return fmt::format("/data/{}.json", env ? env : "default");
	    }(),
	    "--port"s,
	    "9000"s,
	};

	std::vector<char*> args{};
	args.reserve(args_storage.size() + 1);
	for (auto& stg : args_storage)
		args.push_back(stg.data());
	args.push_back(nullptr);

	auto const id = start_ws(executable, args);
	setup_breaks([&] { send_interrupt(id); });
	wait_for_process(executable, id);
}