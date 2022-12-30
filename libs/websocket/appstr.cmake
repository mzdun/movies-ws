set(DATA_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../data")
set(MUSTACHE_DIR "${DATA_DIR}/templates")
set(LNGS_FILE "${DATA_DIR}/strings/webapp.lngs")

function(add_idl_mustache OUTPUT MUSTACHE)
    add_custom_command(OUTPUT "${OUTPUT}"
        COMMAND mbits::lngs
        ARGS mustache
            "${LNGS_FILE}"
            -o "${OUTPUT}"
            --tmplt-dir "${MUSTACHE_DIR}"
            --tmplt ${MUSTACHE}
        MAIN_DEPENDENCY "${LNGS_FILE}"
        DEPENDS "${MUSTACHE_DIR}/${MUSTACHE}.mustache"
        VERBATIM)
    message(STATUS "{{> ${MUSTACHE}}} ${OUTPUT}")
endfunction()
