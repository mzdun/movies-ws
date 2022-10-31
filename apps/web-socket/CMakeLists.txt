set(PROJECT_SOURCES
    main.cc
)

if (WIN32)
    list(APPEND PROJECT_SOURCES
        win32/${PROJECT_NAME}.rc
        win32/${PROJECT_NAME}.ico
        )
endif()
source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${PROJECT_SOURCES})
list(APPEND PROJECT_SOURCES ${QM_FILES})

add_executable(${PROJECT_NAME} ${PROJECT_SOURCES})

target_link_libraries(${PROJECT_NAME} PRIVATE data)
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_BINARY_DIR} ${CMAKE_CURRENT_SOURCE_DIR})
