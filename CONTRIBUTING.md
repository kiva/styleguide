# Styleguide Release Workflow

## How to get styleguide templates/css/js into a given branch of the kiva repo

### In styleguide repo:

1. Make a feature branch off of master 
2. commit work to feature branch
3. create pull request to master
4. get a code review and merge pull request
5. `git checkout master`
6. `git pull`
7. `grunt release` (optionally `:minor` or `:major`)

### In kiva main repo (any branch):

1. `git pull`
2. `bower install git@github.com:kiva/styleguide` (optional `#versionSpec`) - this may update other packages too
3. `git add sites/www_kiva/client/bower_components/styleguide/`
4. `git commit` -  from here out, it's just like any other kiva/kiva code change