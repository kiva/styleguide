#!/bin/bash

unlink="$1"

if [ "$unlink" == "--unlink" ] || [ "$unlink" == "-u" ]; then
    echo "Unlinking styleguide"
    echo "Resetting your bower components in kiva/main"
    cd /kiva/main/sites/www_kiva/client/bower_components & git checkout -f styleguide
else
    cd /kiva/styleguide
    bower link
    cd /kiva/main/sites/www_kiva
    bower uninstall styleguide
    bower link styleguide
    echo "To unlink, re-run this file again with the --unlink or -u flag"
    echo "e.g. ./scripts/local_styleguide.sh --unlink"
fi