add_subdirectory(movies-ws)
if (UNIX AND NOT APPLE)
add_subdirectory(docker-start)
endif()
