set(PROJECT_SOURCES
    src/main.cc
    src/service.cc
    src/service.hh
)

if (WIN32)
    list(APPEND PROJECT_SOURCES
        win32/movies-ws.rc
        win32/movies-ws.ico
        )
endif()
source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${PROJECT_SOURCES})

add_executable(movies-ws ${PROJECT_SOURCES})

target_link_libraries(movies-ws PRIVATE mbits::args websocket server startup ${MODS})
target_include_directories(movies-ws PRIVATE ${CMAKE_CURRENT_BINARY_DIR} ${CMAKE_CURRENT_SOURCE_DIR}/src)
target_compile_options(movies-ws PRIVATE ${ADDITIONAL_WALL_FLAGS})
install(TARGETS movies-ws)
