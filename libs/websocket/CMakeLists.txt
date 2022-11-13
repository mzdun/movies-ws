include(appstr.cmake)
set(JSAPI_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../extras/jsapi/lib")

set(PROTO_SRCS
    proto/movies/appstr.v1.proto
    proto/movies/rpc.v1.proto
    proto/movies/filters.v1.proto
    proto/movies/info.v1.proto
    proto/movies/listing.v1.proto
    proto/movies/db.v1.proto
    proto/movies/ui.v1.proto
)

set(SRCS
    src/rpc/appstr.hh
    src/rpc/db.cc
    src/rpc/db.hh
    src/rpc/rpc.hh
    src/rpc/ui.cc
    src/rpc/ui.hh
    src/ws/protobuf.cc
    src/ws/protobuf.hh
    src/ws/session.cc
    src/ws/session.hh
    src/ws/ws.cc
    src/ws/ws.hh
)

set(GEN_SRCS
    ${CMAKE_CURRENT_BINARY_DIR}/src/rpc/appstr.cc
    ${JSAPI_DIR}/appstr.ts)

set(_PROTO_GEN)
foreach(_PROTO ${PROTO_SRCS})
    string(REGEX REPLACE "\\.proto$" ".pb" __PROTO ${_PROTO} )
    list(APPEND _PROTO_GEN
        "${CMAKE_CURRENT_BINARY_DIR}/${__PROTO}.cc"
        "${CMAKE_CURRENT_BINARY_DIR}/${__PROTO}.h"
    )
endforeach()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS} ${PROTO_SRCS})
source_group(TREE ${CMAKE_CURRENT_BINARY_DIR} FILES ${_PROTO_GEN})
source_group(appstr FILES ${GEN_SRCS})

add_idl_mustache("${CMAKE_CURRENT_BINARY_DIR}/src/rpc/appstr.cc" cxx_rpc)
add_idl_mustache("${CMAKE_CURRENT_SOURCE_DIR}/proto/movies/appstr.v1.proto" proto3)
add_idl_mustache("${JSAPI_DIR}/appstr.ts" typescript)

add_library(websocket STATIC ${SRCS} ${PROTO_SRCS} ${GEN_SRCS})
target_include_directories(websocket
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_link_libraries(websocket PUBLIC protobuf::libprotobuf Libwebsockets::websockets server)
protobuf_generate(TARGET websocket)
