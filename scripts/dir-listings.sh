#!/bin/bash

readonly THIS_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd | xargs realpath)"
readonly ROOT_DIR="${THIS_DIR}/.."
readonly RESULTS_DIR="${ROOT_DIR}/tournament/results"
readonly OUTPUT_FILE="${RESULTS_DIR}/index.html"

function main() {
    if [[ $# -ne 0 ]]; then
        echo "USAGE: $0"
        exit 1
    fi

    set -e
    trap exit SIGINT

    local results_dir_listing=""
    for name in $(ls -1 ${RESULTS_DIR}) ; do
        results_dir_listing+="<li><a href='${name}'></a></li>\n"
    done

    local index_html="<html><body>\n${results_dir_listing}</body></html>"
    echo -e "$index_html" > "${OUTPUT_FILE}"
    return $?
}

[[ "${BASH_SOURCE[0]}" == "${0}" ]] && main "$@"
