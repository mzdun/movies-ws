cmake_minimum_required(VERSION 3.15)
project (movies
  DESCRIPTION "WebSocket server for movies library"
  VERSION 0.11.0
  LANGUAGES CXX
)

set(PROJECT_VERSION_SHORT "${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}")
set(PROJECT_VERSION_STABILITY "" # or "-alpha", or "-beta", or "-rc.1", or "-rc.2"
    CACHE STRING "" FORCE)

set(MOVIES_TIDY OFF CACHE BOOL "Use clang-tidy")

list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CONAN_CMAKE_SILENT_OUTPUT TRUE)
set_property(GLOBAL PROPERTY USE_FOLDERS ON)

include(output-dirs)

find_package(Protobuf CONFIG REQUIRED)
find_package(Libwebsockets CONFIG REQUIRED)
find_package(ICU CONFIG REQUIRED)
find_package(SQLiteCpp CONFIG REQUIRED)
find_package(mbits-lngs CONFIG REQUIRED)
find_package(mbits-utfconv CONFIG REQUIRED)
find_package(mbits-args CONFIG REQUIRED)
find_package(tangle CONFIG REQUIRED)
find_package(Python3 COMPONENTS Interpreter REQUIRED)
find_program(DOCKER_EXECUTABLE docker)

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

if (MOVIES_TIDY)
  find_program(CLANG_TIDY_EXE NAMES "clang-tidy" "clang-tidy-12")
  message(STATUS "clang-tidy: ${CLANG_TIDY_EXE}")

  set(CLANG_TIDY_OMIT
    abseil-*
    altera-*
    android-*
    boost-*
    darwin-*
    fuchsia-*
    google-*
    hicpp-*
    linuxkernel-*
    llvm-*
    llvmlibc-*
    mpi-*
    objc-*
    zircon-*

    clang-diagnostic-gnu-zero-variadic-macro-arguments
    misc-non-private-member-variables-in-classes
    readability-braces-around-statements
    readability-implicit-bool-conversion
    readability-named-parameter
    readability-use-anyofallof
    readability-convert-member-functions-to-static
    readability-qualified-auto
    readability-function-cognitive-complexity
    cppcoreguidelines-macro-usage
    cppcoreguidelines-avoid-magic-numbers
    cppcoreguidelines-avoid-c-arrays
    cppcoreguidelines-pro-*
    modernize-use-trailing-return-type
    modernize-avoid-c-arrays
    modernize-use-nullptr

    clang-analyzer-*
  )
  string(REPLACE ";" ",-" CLANG_TIDY_OMIT "${CLANG_TIDY_OMIT}")
  set(CLANG_TIDY_COMMAND
    ${CLANG_TIDY_EXE}
    -extra-arg=-std=c++2b
    --use-color
    -checks=*,-${CLANG_TIDY_OMIT})
endif()

add_subdirectory(libs)
add_subdirectory(extras)
add_subdirectory(apps)

if (MOVIES_TIDY)
  set_target_properties(server movies-ws websocket PROPERTIES CXX_CLANG_TIDY "${CLANG_TIDY_COMMAND}")
endif()

include(prepare_pack)

if (DOCKER_EXECUTABLE AND TARGET docker-start)
  configure_file(data/docker/Dockerfile.in packages/Dockerfile @ONLY)

  set(DOCKER_TAG ghcr.io/mzdun/movies-ws)

  add_custom_target(container
    COMMAND
      ${DOCKER_EXECUTABLE} build
      -t "${DOCKER_TAG}:${PROJECT_VERSION}${PROJECT_VERSION_STABILITY}"
      ${PROJECT_BINARY_DIR}/packages
    COMMAND
      ${DOCKER_EXECUTABLE} tag
      "${DOCKER_TAG}:${PROJECT_VERSION}${PROJECT_VERSION_STABILITY}"
      "${DOCKER_TAG}:latest"
    DEPENDS
      ${PROJECT_BINARY_DIR}/packages/Dockerfile
      docker-start
      movies-ws
  )

  message(STATUS "Docker: ${DOCKER_TAG}:${PROJECT_VERSION}${PROJECT_VERSION_STABILITY}")
endif()