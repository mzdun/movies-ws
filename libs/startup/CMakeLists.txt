set(SRCS
    inc/startup.hh
)

if (WIN32)
    list(APPEND SRCS src/startup-win32.cc)
else()
    list(APPEND SRCS src/startup-posix.cc)
endif()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS})

add_library(startup STATIC ${SRCS})
target_include_directories(startup PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/inc)
target_compile_options(startup PRIVATE ${ADDITIONAL_WALL_FLAGS})
