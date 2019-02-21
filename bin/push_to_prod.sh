#!/bin/bash

# Usage: First positional argument should be hostname
#        Second positional argument should be destination
if [[ -z "$DC_HOST" || -z "$DC_WEBPAGE_DIR" ]]; then
    echo "ERROR: INVALID USAGE"
    echo ""
    echo "\$DC_HOST and \$DC_WEBPAGE_DIR must be set with"
    echo "the target hostname and destination directory for"
    echo "the production output. For example, in your ~/.bashrc"
    echo "you might add:"
    echo ""
    echo "    export DC_HOST='user@hostname'"
    echo "    export DC_WEBPAGE_DIR='/webpages/user'"
    echo ""
    exit 1
fi

# Put built webpage in $DC_WEBPAGE_DIR/questioner/
scp -r build $DC_HOST:$DC_WEBPAGE_DIR
ssh $DC_HOST << EOF
    rm -rf $DC_WEBPAGE_DIR/questioner
    mv $DC_WEBPAGE_DIR/build $DC_WEBPAGE_DIR/questioner
EOF
