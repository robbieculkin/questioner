#!/bin/bash

# Subprocesses spawned here will be killed if parent is killed
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# Handle possible space-separated `--option argument
DBPATH="/data/db"
POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --dbpath)
    DBPATH="$2"
    shift
    shift
    ;;
    *)
    POSITIONAL+=("$1")
    shift
    ;;
esac
done
set -- "${POSITIONAL[@]}"

mkdir -p log/

# Start mongod
mongod --dbpath $DBPATH >log/mongod.log 2>&1 &

# Start flask server backend
./run_flask.sh 1>log/flask_out.log 2>log/flask_err.log &

# Start Node/React frontend
npm start 1>/dev/null 2>log/npm_err.log &

wait