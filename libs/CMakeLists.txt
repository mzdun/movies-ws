set(TANGLE_TESTING OFF CACHE BOOL "Compile and/or run self-tests")
set(TANGLE_INSTALL OFF CACHE BOOL "Create install target(s)")
set(JSON_TESTING OFF CACHE BOOL "Compile and/or run self-tests")
set(JSON_INSTALL OFF CACHE BOOL "Install the library")
set(JSON_IGNORE_CONAN ON CACHE BOOL "Ignore conanbuildinfo")
set(MOVIES_IGNORE_CONAN ON CACHE BOOL "Ignore conanbuildinfo")

add_subdirectory(json)
add_subdirectory(movies)
add_subdirectory(server)
add_subdirectory(websocket)

set_target_properties(json movies io websocket proto server PROPERTIES FOLDER libs)
