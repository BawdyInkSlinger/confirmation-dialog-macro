#! /usr/bin/bash

echo Executing: `basename "$0"`
set -uxe

grep -a "" /proc/*/cmdline | xargs -0 | grep -- 'onchange' | awk -F/ '{ system("kill " $3)}'

# kill the infinite tail in watch.sh
awk '{system("kill " $1)}' watch.sh.pids || true

rm watch.sh.pids || true
