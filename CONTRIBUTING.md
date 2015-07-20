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
    1. This requires having an environment variable named GITHUB_ACCESS_TOKE
    2. Go to https://github.com/settings/tokens
    3. 'Generate new token' with default permissions
    4. Copy token and assign to env variable GITHUB_ACCESS_TOKE
        1. On your VM, edit ~/.bash_profile to add line: `export GITHUB_ACCESS_TOKE=<token>`
        2. `source ~/.bash_profile`
8. Verify by seeing your new release at https://github.com/kiva/styleguide/releases

### In kiva main repo (any branch):

1. `git pull`
2. `bower install git@github.com:kiva/styleguide` (optional `#versionSpec`) - this may update other packages too
3. `git add sites/www_kiva/client/bower_components/styleguide/`
4. `git commit` -  from here out, it's just like any other kiva/kiva code change