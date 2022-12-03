add_subdirectory(imdb)
add_subdirectory(tmdb)

if (EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/private/CMakeLists.txt")
    add_subdirectory(private)
endif()

set(PLUGINS ${PLUGINS} PARENT_SCOPE)
