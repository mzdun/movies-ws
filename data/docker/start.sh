#!/bin/bash

[[ -z "${REPO_NAME}" ]] && REPO='default' || REPO="${REPO_NAME}"
movies-ws --config /data/${REPO}.json --port 9000
