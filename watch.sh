#! /usr/bin/bash

echo Executing: `basename "$0"`
set -uxe

# "trap - SIGINT SIGTERM EXIT" stops trapping these signals to prevent recursion
trap "trap - SIGINT SIGTERM EXIT; ./watch-cleanup.sh; exit" SIGINT SIGTERM EXIT

npx concurrently --names "sass,tweego,ts" "npm run watch-sass-files" "npm run watch-twee-files" "npm run watch-typescript-files" &

# print the background jobs
# jobs -l

echo -n "$$" >> watch.sh.pids

# wait forever
tail -f /dev/null