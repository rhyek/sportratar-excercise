#!/usr/bin/env bash
# set -e
__dirname=$(dirname $(readlink -f ${BASH_SOURCE[0]}))

cd packages/backend
pnpm codegen
