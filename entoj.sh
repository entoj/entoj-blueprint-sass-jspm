#!/bin/bash

# Prepare pathes
SELF=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Run
$SELF/node_modules/entoj-system/entoj.sh "$@" --configuration "$SELF/entoj-configuration.js"
