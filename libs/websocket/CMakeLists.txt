include(appstr.cmake)
set(JSAPI_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../extras/jsapi")
file(GLOB JSAPI_FILES ${JSAPI_DIR}/lib/*.ts ${JSAPI_DIR}/lib/proto/bundle.*)

option(WITH_JSAPI "Should building the server also build jsapi")

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
    ${JSAPI_DIR}/lib/appstr.ts
)

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
add_idl_mustache("${JSAPI_DIR}/lib/appstr.ts" typescript)

if (WITH_JSAPI)
  list(APPEND GEN_SRCS
      ${JSAPI_DIR}/dist/index.d.ts
  )

  add_custom_command(
    OUTPUT ${JSAPI_DIR}/node_modules/.yarn-integrity
    DEPENDS
      ${JSAPI_DIR}/yarn.lock
      ${JSAPI_DIR}/package.json
    COMMAND ${Python3_EXECUTABLE}
    ARGS ${JSAPI_DIR}/scripts/yarn.py --frozen-lockfile
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "Installing node_modules"
  )

  add_custom_command(
    OUTPUT ${JSAPI_DIR}/lib/proto/bundle.d.ts
    DEPENDS
      ${PROTO_SRCS}
      ${JSAPI_DIR}/node_modules/.yarn-integrity
    COMMAND ${Python3_EXECUTABLE}
    ARGS ${JSAPI_DIR}/scripts/yarn.py build:proto
    WORKING_DIRECTORY ${JSAPI_DIR}
    COMMENT "Generating lib/proto/bundle.*"
  )

  add_custom_command(
    OUTPUT ${JSAPI_DIR}/dist/index.d.ts
    DEPENDS ${JSAPI_FILES} ${JSAPI_DIR}/lib/proto/bundle.d.ts
    COMMAND ${Python3_EXECUTABLE}
    ARGS ${JSAPI_DIR}/scripts/yarn.py build:lib
    WORKING_DIRECTORY ${JSAPI_DIR}
    COMMENT "Generating dist/"
  )
endif()

add_library(proto STATIC ${PROTO_SRCS})
target_include_directories(proto
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_link_libraries(proto PUBLIC protobuf::libprotobuf)
protobuf_generate(TARGET proto)

add_library(websocket STATIC ${SRCS} ${GEN_SRCS})
target_include_directories(websocket
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_link_libraries(websocket PUBLIC proto websockets server)
target_compile_options(websocket PRIVATE ${ADDITIONAL_WALL_FLAGS})

if (UNIX AND NOT APPLE)
  target_link_libraries(websocket PUBLIC cap)
endif()
