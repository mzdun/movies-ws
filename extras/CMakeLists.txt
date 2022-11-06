add_subdirectory(imdb)

if (EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/private/CMakeLists.txt")
    add_subdirectory(private)
endif()

set(PLUGINS ${PLUGINS} imdb PARENT_SCOPE)
