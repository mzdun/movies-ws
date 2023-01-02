// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#include <fmt/format.h>
#include <signal.h>  // NOLINT(modernize-deprecated-headers)
#include <sys/wait.h>
#include <startup.hh>

using namespace std::literals;

int main() {
	auto executable = exec_path().parent_path() / "movies-ws";

	std::vector args{
	    "movies-ws"s,
	    "--config"s,
	    [] {
		    auto const env = getenv("REPO_NAME");
		    return fmt::format("/data/{}.json", env ? env : "default");
	    }(),
	    "--port"s,
	    "9000"s,
	};

	std::vector<char*> argv{};
	argv.reserve(args.size() + 1);
	for (auto& arg : args)
		argv.push_back(arg.data());
	argv.push_back(nullptr);

	auto const pid = fork();
	if (pid == 0) {
		execv(executable.c_str(), argv.data());
		_exit(1);
	} else if (pid < 0) {
		fprintf(stderr, "%s error: %d\n", executable.c_str(), pid);
	} else if (pid > 0) {
		fprintf(stderr, "%s pid: %d\n", executable.c_str(), pid);
		setup_breaks([&] { kill(pid, SIGINT); });

		int status{};
		waitpid(pid, &status, 0);
		if (status) printf("%s returned: %d\n", executable.c_str(), status);
	}
}
