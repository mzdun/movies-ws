// Copyright (c) 2023 Marcin Zdun
// This code is licensed under MIT license (see LICENSE for details)

#pragma once
#include <SQLiteCpp/Database.h>
#include <filesystem>
#include <shared_mutex>
#include <span>

namespace movies {
	struct table_def {
		std::string_view name;
		std::span<std::string_view const> columns_and_constraints;
	};

	class sqlite {
	public:
		sqlite(std::filesystem::path const& path, unsigned version)
		    : db_{open(path)}, version_{version} {}

		bool check_schema();

	protected:
		~sqlite() = default;

		SQLite::Database& conn() noexcept { return db_; }
		SQLite::Database const& conn() const noexcept { return db_; }
		void create_tables(std::span<table_def const> tables);
		std::shared_mutex& mutex() const noexcept { return m_; }

	private:
		unsigned get_version();
		void set_version(unsigned);
		virtual bool update_schema(unsigned prev_version) = 0;

		static SQLite::Database open(std::filesystem::path const& path);

		SQLite::Database db_;
		unsigned version_;
		mutable std::shared_mutex m_{};
	};
}  // namespace movies
