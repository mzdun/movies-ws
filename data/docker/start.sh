#!/bin/bash

set -x
pid=0

int_handler() {
    if [ $pid -ne 0 ]; then
        kill -SIGINT "$pid"
        wait "$pid"
    fi
    exit 143; # 128 + 2 -- SIGINT
}

term_handler() {
    if [ $pid -ne 0 ]; then
        kill -SIGTERM "$pid"
        wait "$pid"
    fi
    exit 143; # 128 + 15 -- SIGTERM
}

trap 'kill ${!}; int_handler' SIGINT
trap 'kill ${!}; term_handler' SIGTERM

[[ -z "${REPO_NAME}" ]] && REPO='default' || REPO="${REPO_NAME}"
movies-ws --config /data/${REPO}.json --port 9000 &
pid="$!"

echo entering loop
while true
do
    tail -f /dev/null &
    wait ${!}
done
