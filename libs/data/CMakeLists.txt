configure_file("${CMAKE_CURRENT_SOURCE_DIR}/src/version.in" "${CMAKE_CURRENT_BINARY_DIR}/data/version.hh" @ONLY)

set(PROTO_SRCS
    proto/movie/rpc.v1.proto
)

set(SRCS
    src/ws/protobuf.cc
    src/ws/protobuf.hh
    src/ws/session.cc
    src/ws/session.hh
    src/ws/ws.cc
    src/ws/ws.hh
)

set(_PROTO_GEN)
foreach(_PROTO ${PROTO_SRCS})
    list(APPEND _PROTO_GEN
        "${CMAKE_CURRENT_BINARY_DIR}/${PROTO_SRCS}.cc"
        "${CMAKE_CURRENT_BINARY_DIR}/${PROTO_SRCS}.h"
    )
endforeach()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS} ${PROTO_SRCS})
source_group(TREE ${CMAKE_CURRENT_BINARY_DIR} FILES ${_PROTO_GEN})

add_library(data STATIC ${SRCS} ${PROTO_SRCS})
target_include_directories(data
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_link_libraries(data PUBLIC protobuf::libprotobuf Libwebsockets::websockets movies)
protobuf_generate(TARGET data)
