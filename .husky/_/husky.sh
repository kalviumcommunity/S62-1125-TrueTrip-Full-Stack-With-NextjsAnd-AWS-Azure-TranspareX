#!/usr/bin/env sh
if [ -z \"\\" ]; then
    debug() { :; }
else
    debug() { echo \"husky: \\"; }
fi

command_exists() {
    command -v \"\\" >/dev/null 2>&1
}

load_user_script() {
    local script=\"\\"
    if [ -f \"\\" ]; then
        debug \"running \\"
        . \"\\"
    else
        debug \"skipping \ (not found)\"
    fi
}

main() {
    if [ -z \"\\" ]; then
        load_user_script \"\\"
        for hook in \"\/\"/??-*; do
            load_user_script \"\\"
        done
    fi
}

main
