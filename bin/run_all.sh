#!/bin/bash

# RUN FROM PROJECT HOME DIRECTORY! (e.g., ./bin/run_all.sh)

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

echo "Running mongod, flask, and react..."

mkdir -p log/

# Start Node/React frontend
npm start 1>log/npm_out.log 2>log/npm_err.log &
echo "    Started React..."

# Start mongod
mongod --dbpath $DBPATH >log/mongod.log 2>&1 &
echo "    Started mongod with --dbpath=$DBPATH..."

# Start flask server backend
./bin/run_flask.sh 1>log/flask_out.log 2>log/flask_err.log &
echo "    Started Flask server..."

wait