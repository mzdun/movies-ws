set(JSON_TESTING OFF CACHE BOOL "Compile and/or run self-tests")
set(JSON_INSTALL OFF CACHE BOOL "Install the library")
set(JSON_IGNORE_CONAN ON CACHE BOOL "Ignore conanbuildinfo")
set(MOVIES_IGNORE_CONAN ON CACHE BOOL "Ignore conanbuildinfo")

add_subdirectory(json)
add_subdirectory(movies)
add_subdirectory(data)

set_target_properties(json movies io data PROPERTIES FOLDER libs)
