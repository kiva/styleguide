#!/bin/bash

flag="$1"

if [ "$flag" == "--unlink" ] || [ "$flag" == "-u" ]; then
    echo "Unlinking styleguide"
    echo "Resetting your bower components in kiva/main"
    cd /kiva/main/sites/www_kiva/client/bower_components
    git checkout -f styleguide/
    echo "Resetting your export folder"
    cd /kiva/styleguide
    git checkout HEAD export
elif [ "$flag" == "--compile" ] || [ "$flag" == "-c" ]; then
    echo "Exporting your files for use in Kiva Main"
    cd /kiva/styleguide
    grunt export
    echo "Running grunt compile"
    cd /kiva/main/sites/www_kiva
    grunt compile
elif [ "$flag" == "--help" ] || [ "$flag" == "-h" ]; then
    echo "To link your local styleguide run:"
    echo "./scripts/local_styleguide.sh"
    echo "To unlink your local styleguide run:"
    echo "./scripts/local_styleguide.sh -u"
    echo "To export your changes over to your kiva main repo run:"
    echo "./scripts/local_styleguide.sh -c"
else
    cd /kiva/styleguide
    bower link
    cd /kiva/main/sites/www_kiva
    bower uninstall styleguide
    bower link styleguide
    echo "To unlink, re-run this file again with the --unlink or -u flag"
    echo "./scripts/local_styleguide.sh --unlink"
    echo "To see all of the commands and what they do, run this file with the --help or -h flag"
    echo "./scripts/local_styleguide.sh --help"
fi