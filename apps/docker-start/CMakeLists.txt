set(SRCS main.cc)

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS})

add_executable(docker-start ${SRCS})
target_link_libraries(docker-start PRIVATE fmt::fmt startup)
target_include_directories(docker-start PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src)
target_compile_options(docker-start PRIVATE ${ADDITIONAL_WALL_FLAGS})
install(TARGETS docker-start)
