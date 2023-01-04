configure_file("${CMAKE_CURRENT_SOURCE_DIR}/src/version.in" "${CMAKE_CURRENT_BINARY_DIR}/inc/server/version.hh" @ONLY)

set(LANGUAGES pl en-US)

set(SRCS
    inc/base/extended_info.hh
    inc/base/lngs.hh
    inc/base/str.hh
    inc/filters/filter.hh
    inc/full_text/engine.hh
    inc/server/fs_observer.hh
    inc/server/plugin.hh
    inc/server/server.hh
    inc/sorting/sort.hh
    src/base/extended_info.cc
    src/filters/base.cc
    src/filters/description.cc
    src/filters/internal.hh
    src/filters/on_off.cc
    src/filters/on_off.hh
    src/filters/range.cc
    src/filters/term.cc
    src/filters/tokens.cc
    src/full_text/engine.cc
    src/server/json_plugin.cc
    src/server/json_plugin.hh
    src/server/plugin.cc
    src/server/server.cc
    src/sorting/config.cc
    src/sorting/sort.cc
)

if (WIN32)
    list(APPEND SRCS
        src/server/fs_observer_win32.cc
    )
else()
    list(APPEND SRCS
        src/server/fs_observer_inotify.cc
    )
endif()

set(DATA_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../data")
get_filename_component(DATA_DIR "${DATA_DIR}" ABSOLUTE)

set(LNGS_DIR "${DATA_DIR}/strings")
set(TR_DIR "${DATA_DIR}/translations")
set(PLUGIN_DIR "${DATA_DIR}/plugins")
set(BIN_DIR "${CMAKE_CURRENT_BINARY_DIR}/../../bin")
get_filename_component(BIN_DIR "${BIN_DIR}" ABSOLUTE)

set(LNG_SOURCES server tags regions webapp)
set(PLUGIN_SOURCES imdb tmdb)

set(GEN_SRCS "${CMAKE_CURRENT_BINARY_DIR}/inc/regions/mapping.hh")
set(DATA_SRCS)
set(BIN_SRCS)

message(STATUS "${CMAKE_CURRENT_BINARY_DIR}/inc/regions/mapping.hh")

foreach(LNG_SOURCE ${LNG_SOURCES})
    list(APPEND GEN_SRCS
        "${CMAKE_CURRENT_BINARY_DIR}/src/${LNG_SOURCE}/resources.cc"
        "${CMAKE_CURRENT_BINARY_DIR}/inc/${LNG_SOURCE}/lngs.hh"
    )
    list(APPEND DATA_SRCS "${TR_DIR}/${LNG_SOURCE}.pot" "${LNGS_DIR}/${LNG_SOURCE}.lngs")

    foreach(LANG ${LANGUAGES})
        set(__po "${TR_DIR}/${LNG_SOURCE}/${LANG}.po")
        set(__lng "${BIN_DIR}/lngs/${LNG_SOURCE}.${LANG}")
        if(EXISTS ${__po})
            list(APPEND DATA_SRCS ${__po})
            list(APPEND BIN_SRCS ${__lng})
        endif()
    endforeach()
endforeach()

foreach(PLUGIN_SOURCE ${PLUGIN_SOURCES})
    list(APPEND DATA_SRCS "${PLUGIN_DIR}/${PLUGIN_SOURCE}.json")
    list(APPEND BIN_SRCS "${BIN_DIR}/plugins/${PLUGIN_SOURCE}.json")
endforeach()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SRCS})
source_group(TREE ${CMAKE_CURRENT_BINARY_DIR} FILES ${GEN_SRCS} PREFIX gen)
source_group(TREE ${BIN_DIR} FILES ${BIN_SRCS} PREFIX gen/bin)
source_group(TREE ${DATA_DIR} FILES ${DATA_SRCS} PREFIX data)

foreach(LNG_SOURCE ${LNG_SOURCES})
    set(__LNGS_FILES "${LNGS_DIR}/${LNG_SOURCE}.lngs")

    add_custom_command(OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/src/${LNG_SOURCE}/resources.cc"
        COMMAND ${CMAKE_COMMAND} -E make_directory "${CMAKE_CURRENT_BINARY_DIR}/src/${LNG_SOURCE}"
        COMMAND mbits::lngs
        ARGS res
            "${__LNGS_FILES}"
            --include "${LNG_SOURCE}/lngs.hh"
            -o "${CMAKE_CURRENT_BINARY_DIR}/src/${LNG_SOURCE}/resources.cc"
            -w
        DEPENDS "${__LNGS_FILES}"
        VERBATIM)

    add_custom_command(OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/inc/${LNG_SOURCE}/lngs.hh"
        COMMAND ${CMAKE_COMMAND} -E make_directory "${CMAKE_CURRENT_BINARY_DIR}/inc/${LNG_SOURCE}"
        COMMAND mbits::lngs
        ARGS enums
            "${__LNGS_FILES}"
            --resource
            -o "${CMAKE_CURRENT_BINARY_DIR}/inc/${LNG_SOURCE}/lngs.hh"
        DEPENDS "${__LNGS_FILES}"
        VERBATIM)

    add_custom_command(OUTPUT "${TR_DIR}/${LNG_SOURCE}.pot"
        COMMAND mbits::lngs
        ARGS pot "${__LNGS_FILES}" -o "${TR_DIR}/${LNG_SOURCE}.pot" -a "marcin.zdun@midnightbits.com"
        DEPENDS "${__LNGS_FILES}"
        VERBATIM)

    foreach(LANG ${LANGUAGES})
        set(__po "${TR_DIR}/${LNG_SOURCE}/${LANG}.po")
        set(__lng "${BIN_DIR}/lngs/${LNG_SOURCE}.${LANG}")
        if(EXISTS ${__po})
            message(STATUS "${__po} -> ${__lng}")

            add_custom_command(OUTPUT "${__lng}"
                COMMAND ${CMAKE_COMMAND} -E make_directory "${BIN_DIR}/lngs"
                COMMAND mbits::lngs
                ARGS make
                "${__LNGS_FILES}"
                -o "${__lng}"
                --msgs "${__po}"
                --lang "${TR_DIR}/llcc.txt"
                DEPENDS ${__po} "${__LNGS_FILES}"
                VERBATIM)
        endif()
    endforeach()
endforeach()

foreach(PLUGIN_SOURCE ${PLUGIN_SOURCES})
    add_custom_command(OUTPUT "${BIN_DIR}/plugins/${PLUGIN_SOURCE}.json"
        COMMAND ${CMAKE_COMMAND}
        ARGS -E copy "${PLUGIN_DIR}/${PLUGIN_SOURCE}.json" "${BIN_DIR}/plugins/${PLUGIN_SOURCE}.json"
        DEPENDS "${PLUGIN_DIR}/${PLUGIN_SOURCE}.json"
        VERBATIM)
endforeach()

set(REGIONS_DEPS
    "${DATA_DIR}/regions/build.py"
    "${DATA_DIR}/regions/regions-patch.json"
    "${DATA_DIR}/regions/subdivisions.json")

set(REGIONS_SECONDARY_OUTPUTS
    "${CMAKE_CURRENT_BINARY_DIR}/inc/regions/mapping.hh")

foreach(LANG ${LANGUAGES})
    string(REPLACE "-" ";" LANG_LIST ${LANG})
    list(POP_FRONT LANG_LIST SHORT_LANG)
    list(APPEND REGIONS_DEPS
        "${DATA_DIR}/regions/${SHORT_LANG}/countries.json"
        "${DATA_DIR}/regions/${SHORT_LANG}/world.json"
    )

    list(APPEND REGIONS_SECONDARY_OUTPUTS
        "${TR_DIR}/regions/${LANG}.po"
    )
    
endforeach()

add_custom_command(OUTPUT "${LNGS_DIR}/regions.lngs" ${REGIONS_SECONDARY_OUTPUTS}
    COMMAND "${Python3_EXECUTABLE}"
    ARGS "${DATA_DIR}/regions/build.py" "${CMAKE_CURRENT_BINARY_DIR}/inc/regions"
    DEPENDS ${REGIONS_DEPS}

    VERBATIM)

add_library(server STATIC ${SRCS} ${PROTO_SRCS} ${GEN_SRCS} ${BIN_SRCS} ${DATA_SRCS})
target_include_directories(server
    PUBLIC
    ${CMAKE_CURRENT_BINARY_DIR}/inc
    ${CMAKE_CURRENT_SOURCE_DIR}/inc
)
target_link_libraries(server PUBLIC
    ICU::data ICU::uc ICU::i18n
    SQLiteCpp
    mbits::liblngs mbits::utfconv
    tangle::tangle movies)
target_compile_options(server PRIVATE ${ADDITIONAL_WALL_FLAGS})
install(DIRECTORY "${BIN_DIR}/lngs" TYPE BIN)
