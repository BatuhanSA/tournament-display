#!/bin/bash

readonly THIS_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd | xargs realpath)"
readonly ROOT_DIR="${THIS_DIR}/.."
readonly RESULTS_DIR="${ROOT_DIR}/tournament/results"

function main() {
    if [[ $# -ne 0 ]]; then
        echo "USAGE: $0"
        exit 1
    fi

    set -e
    trap exit SIGINT

    local index_html="<html>\n"
    for name in $(ls -1 "${RESULTS_DIR}") ; do
        index_html+="<li><a href='${name}'></a></li>\n"
    done

    index_html+="</html>"
    echo -e "$index_html" > "${RESULTS_DIR}/index.html"
    return $?
}

[[ "${BASH_SOURCE[0]}" == "${0}" ]] && main "$@"
