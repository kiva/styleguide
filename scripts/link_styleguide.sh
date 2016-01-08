cd /kiva/styleguide
bower link
cd /kiva/main/sites/www_kiva
bower uninstall styleguide
bower link styleguide
echo "To undo, and you have not edited your kiva/main repo:"
echo "cd /kiva/main & git checkout -f"
