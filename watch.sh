#! /usr/bin/bash

echo Executing: `basename "$0"`
set -uxe

# kill child processes when this process dies: https://stackoverflow.com/a/2173421/61624
# "trap - SIGINT SIGTERM EXIT" stops trapping these signals to prevent recursion
trap "trap - SIGINT SIGTERM EXIT; ./watch-cleanup.sh; exit" SIGINT SIGTERM EXIT

npx concurrently --names "sass,tweego,ts" "npm run watch-sass-files" "npm run watch-twee-files" "npm run watch-typescript-files" &

# print the background jobs
# jobs -l

echo -n "$$" >> watch.sh.pids

# wait forever: https://unix.stackexchange.com/a/42905/101311
tail -f /dev/null