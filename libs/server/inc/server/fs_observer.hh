// Copyright (c) 2022 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <chrono>
#include <filesystem>
#include <thread>

namespace movies {
	struct observer_callback {
		virtual ~observer_callback();
		virtual void on_files_changed() = 0;
	};

	enum class watch { idle, active, error };

	template <typename WatchHandle>
	inline void observe_directory(std::stop_token tok,
	                              observer_callback* cb,
	                              std::filesystem::path const& path) {
		using namespace std::chrono;

		WatchHandle handle{};
		if (!handle.open(path)) return;

		bool active = false;
		auto last_wake = steady_clock::now();

		while (!tok.stop_requested()) {
			if (active) {
				auto const now = steady_clock::now();
				if ((now - last_wake) >= seconds{10}) {
					active = false;
					cb->on_files_changed();
				}
			}
			auto const result = handle.watch_for(milliseconds{100});
			if (result == watch::error) return;

			if (result == watch::active && !active) {
				active = true;
				last_wake = steady_clock::now();
			}
		}
	}

	class observer {
	public:
		void observe(observer_callback&, std::filesystem::path const&);

	private:
		template <typename WatchHandle>
		void observe_impl(observer_callback& cb, std::filesystem::path const& path) {
			th_ = std::jthread{observe_directory<WatchHandle>, &cb, path};
		}

		std::jthread th_{};
	};

}  // namespace movies
