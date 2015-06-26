#!/bin/bash
#
# bamboo_deploy.sh
#
# Description:  Deploy the patternlab-kiva app from bamboo.

usage() {
  cat <<EOF
"$0: "
EOF
  exit 1
}

script_dir=$(dirname $0)
source $script_dir/bamboo_functions.sh

# traps, shell settings
trap exit_handler EXIT
set -xe


# Main

# Build
build_patternlab

# Deploy

# Grab any variables from environment, including secrets
# TODO: these should be coming from the environment.  Until then, this isn't really deployable anywhere
host="localhost"
user=`whoami`
base_domain="styleguide-vm.kiva.org"

# Copy code to nodes
stage_code ${host} ${user}

# enable vhost in apache
enable_vhost ${host} ${user} ${base_domain}

exit 0
