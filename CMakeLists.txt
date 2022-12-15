cmake_minimum_required(VERSION 3.5)
project (movies
  DESCRIPTION "WebSocket server for movies library"
  VERSION 0.3.0
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
find_package(ICU CONFIG REQUIRED)
find_package(SQLiteCpp CONFIG REQUIRED)
find_package(mbits-lngs CONFIG REQUIRED)
find_package(args REQUIRED)
find_package(Python3 COMPONENTS Interpreter REQUIRED)

find_program(LNGS_EXEC lngs HINTS ${CONAN_BIN_DIRS} REQUIRED)

set(STAGING "${CMAKE_BINARY_DIR}/staging/${PROJECT_VERSION}${PROJECT_VERSION_STABILITY}")

if (MSVC)
  set(ADDITIONAL_WALL_FLAGS
      /permissive-
      /D_CRT_SECURE_NO_WARNINGS
      /Zc:__cplusplus
      /W4
      /w14242
      /w14254
      /w14263
      /w14265
      /w14287
      /we4289
      /w14296
      /w14311
      /w14545
      /w14546
      /w14547
      /w14549
      /w14555
      /w14619
      /w14640
      /w14826
      /w14905
      /w14906
      /w14928
      /w14946)
else()
  set(ADDITIONAL_WALL_FLAGS
      -Wall -Wextra
      -Wno-missing-field-initializers
      -Wnon-virtual-dtor
      -Wold-style-cast
      -Wcast-align
      -Wunused
      -Woverloaded-virtual
      -Wpedantic
      -Wconversion
      -Wsign-conversion
      -Wnull-dereference
      -Wdouble-promotion
      -Wformat=2
  )
  if ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    list(APPEND ADDITIONAL_WALL_FLAGS -fcolor-diagnostics) # -Wlifetime
  else()
    list(APPEND ADDITIONAL_WALL_FLAGS
      -fdiagnostics-color
      -Wmisleading-indentation
      -Wduplicated-cond
      -Wduplicated-branches
      -Wlogical-op
      )
  endif()
endif()

include(CTest)
enable_testing()

set(PLUGINS)

add_subdirectory(libs)
add_subdirectory(extras)
add_subdirectory(apps)

include(prepare_pack)
