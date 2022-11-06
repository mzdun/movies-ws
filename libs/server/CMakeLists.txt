configure_file("${CMAKE_CURRENT_SOURCE_DIR}/src/version.in" "${CMAKE_CURRENT_BINARY_DIR}/inc/server/version.hh" @ONLY)

set(SRCS
    inc/base/extended_info.hh
    inc/base/str.hh
    inc/filters/filter.hh
    inc/full_text/engine.hh
    inc/server/plugin.hh
    inc/server/server.hh
    inc/sorting/sort.hh
    inc/utf/utf.hh
    src/base/extended_info.cc
    src/filters/base.cc
    src/filters/description.cc
    src/filters/internal.hh
    src/filters/on_off.cc
    src/filters/on_off.hh
    src/filters/range.cc
    src/full_text/engine.cc
    src/server/plugin.cc
    src/server/server.cc
    src/sorting/config.cc
    src/sorting/sort.cc
    src/utf/utf.cc
)

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS})

add_library(server STATIC ${SRCS} ${PROTO_SRCS})
target_include_directories(server
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}/inc
    ${CMAKE_CURRENT_SOURCE_DIR}/inc
)
target_link_libraries(server PUBLIC ICU::data ICU::uc ICU::i18n SQLiteCpp::SQLiteCpp browser movies)
