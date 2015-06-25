#!/bin/bash
#
# bamboo_functions.sh
#
# Description:  functions used by the bamboo_*.sh scripts.  Kept here
#               to make the scripts themselves more simple and more readable.


build_patternlab () {
	# public/ is in .gitignore; make sure it exists first
	mkdir -p public
	php core/builder.php --generate 
}

x_rsync="rsync -e ssh -avP --delete --exclude .git "

stage_code () {
	# rsync
	$x_rsync public/ ${1}@{$2}:/var/www/${3}
}

enable_vhost () {
	ssh -T ${1}@${2} "sudo a2ensite styleguide"
}

exit_handler () {
  exit_code=$?
  set +xe
  echo "#################"
  echo "exiting"

  case $exit_code in
    0) echo "SUCCESSFUL $(basename $0)"
       ;;
    11) echo "ABORTED $(basename $0), LOCK IN PLACE"
       ;;
    *) echo "PROBLEMS WITH DEPLOYMENT $(basename $0), exit code $exit_code, check logs"
       ;;
  esac

  exit $exit_code
}
