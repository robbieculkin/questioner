#!/bin/bash

# Subprocesses spawned here will be killed if parent is killed
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

mkdir -p log/

# Start mongod
mongod >log/mongod.log 2>&1 &

# Start flask server backend
./run_flask.sh 1>log/flask_out.log 2>log/flask_err.log &

# Start Node/React frontend
npm start 1>/dev/null 2>log/npm_err.log &

wait