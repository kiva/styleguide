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

# defaults
# cli argument processing
#while getopts "" opt; do
#  case ${opt} in
#    \? ) usage ;;
#    *  ) usage ;;
#  esac
#done

script_dir=$(dirname $0)
source $script_dir/bamboo_functions.sh

# traps, shell settings
trap exit_handler EXIT
set -xe


# Main

#begin ": patternlab-kiva deployment"

# Grab any variables from environment, including secrets
# TODO: these should be coming from the environment.  Until then, this isn't really deployable anywhere
host="qa-web-01"
user="devpush"
base_domain="TEMP-styleguide.kiva.org"

# all other prep of local working dir should be handled by Build step

# Copy code to nodes
stage_code ${host} ${user}

# enable vhost in apache
enable_vhost ${host} ${user} ${base_domain}

exit 0
