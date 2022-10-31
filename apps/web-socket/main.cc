#include <libwebsockets.h>
#include <iostream>

int main(int, char**) {
	lws_set_log_level(LLL_USER | LLL_ERR | LLL_WARN, NULL);

	std::cout << "Hello, world!\n";
}
