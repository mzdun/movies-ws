cmake_minimum_required(VERSION 3.5)
project (movies-ws
  DESCRIPTION "WebSocket server for movies library"
  VERSION 0.1.0
  LANGUAGES CXX
)

set(PROJECT_VERSION_SHORT "${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}")
set(PROJECT_VERSION_STABILITY "" # or "-alpha", or "-beta", or "-rc.1", or "-rc.2"
    CACHE STRING "" FORCE)


list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
list(APPEND CMAKE_MODULE_PATH "${CMAKE_BINARY_DIR}/conan")
list(APPEND CMAKE_PREFIX_PATH "${CMAKE_BINARY_DIR}/conan")

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CONAN_CMAKE_SILENT_OUTPUT TRUE)
set_property(GLOBAL PROPERTY USE_FOLDERS ON)

include(conanbuildinfo)
conan_basic_setup(TARGETS)
find_package(Protobuf CONFIG REQUIRED)
find_package(Libwebsockets CONFIG REQUIRED)

set(STAGING "${CMAKE_BINARY_DIR}/staging/${PROJECT_VERSION}${PROJECT_VERSION_STABILITY}")

include(CTest)
enable_testing()

add_subdirectory(libs)
add_subdirectory(apps)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
