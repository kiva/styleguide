#!/bin/bash
#
# bamboo_functions.sh
#
# Description:  functions used by the bamboo_*.sh scripts.  Kept here
#               to make the scripts themselves more simple and more readable.

base_dir=$(dirname ${script_dir})

build_patternlab () {
	pushd ${base_dir}
	npm install
	popd
}

x_rsync="rsync -e ssh -avP --delete --exclude .git "

# stage_code $host $user
stage_code () {
	# if $host is localhost, this is a no-op
	[[ "${1}" == "localhost" ]] && return
	# if $host is the same as $HOSTNAME, don't copy via ssh
	remote=""
	if [[ "${1}" != "${HOSTNAME}" ]]; then
		remote="${2}@${1}:"
	fi

	# rsync
	docroot="/var/www/styleguide.kiva.org/"
	echo "Staging code over to ${docroot} on '${1}'"
	pushd ${base_dir}
	${x_rsync} public/* ${remote}${docroot}
	# copy over bin/styleguide.conf too?
	popd
}

# enable_vhost $host $user $domain
enable_vhost () {
	pushd ${script_dir}
	# the better, more 12-factor approach to this would be to use environment variables
	#  to drive variable substitution into a VirtualHost template
	# This is the hack version
	conf_file="styleguide.conf"
	[[ "${3}" == "styleguide-vm.kiva.org" ]] && conf_file="styleguide.vm.conf"
	if [[ "${3}" == "styleguide-vm.kiva.org" || "${1}" == "${HOSTNAME}" ]]; then
		echo "Enabling styleguide vhost on localhost, for ${3}"
		sudo cp -uv ${conf_file} /etc/apache2/sites-available/styleguide
		sudo a2ensite styleguide && sudo apache2ctl graceful
	else
		echo "Enabling styleguide vhost on remote host, for ${3}"
		${x_rsync} ${conf_file} ${2}@${1}:/etc/apache2/sites-available/styleguide
		ssh -T ${2}@${1} "sudo a2ensite styleguide && sudo apache2ctl graceful"
	fi
	popd
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
