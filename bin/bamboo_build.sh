#!/bin/bash
#
# bamboo_build.sh
#
# Description:  Build the patternlab app from bamboo.

script_dir=$(dirname $0)
source $script_dir/bamboo_functions.sh

# traps, shell settings
trap exit_handler EXIT
set -xe


# Main
#begin ": patternalb build"

# Run the patternlab generator
build_patternlab

exit 0
