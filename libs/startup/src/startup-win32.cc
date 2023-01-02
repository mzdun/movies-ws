// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#define NOMINMAX
#include <Windows.h>
#include "startup.hh"

std::filesystem::path exec_path() {
	wchar_t modpath[2048];
	GetModuleFileNameW(nullptr, modpath, sizeof(modpath) / sizeof(modpath[0]));
	return modpath;
}

static std::function<void()> stop_handler;

BOOL WINAPI CtrlHandler(DWORD fdwCtrlType) {
	switch (fdwCtrlType) {
		case CTRL_C_EVENT:
		case CTRL_CLOSE_EVENT:
		case CTRL_BREAK_EVENT:
			stop_handler();
			return TRUE;
		default:
			break;
	}
	return FALSE;
}

void setup_breaks(std::function<void()> const& handler) {
	stop_handler = handler;
	SetConsoleCtrlHandler(CtrlHandler, TRUE);
}
