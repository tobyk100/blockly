# Blockly 20 Hour Curriculum

Blockly is a web-based, graphical programming editor. Users can drag blocks
together to build an application. No typing required. Credit goes to these
awesome [developers](https://code.google.com/p/blockly/wiki/Credits#Engineers)
and a small army of
[translators](https://code.google.com/p/blockly/wiki/Credits#Translators).

This repository contains the source code for the
[Blockly](https://code.google.com/p/blockly/) based 20 hour curriculum and Hour
of Code. Information about Blockly can be found in the
[wiki](https://code.google.com/p/blockly/w/list).

- [Installation](#installation)
- [Project Layout](#project-layout)
- [Contribute to Blockly](#to-contribute)
- [Merge trunk from Google Code](#merge-trunk)

## Installation

1. `git clone https://github.com/code-dot-org/blockly.git`
2. To host the apps locally run app.yaml with appengine gui or
   [dev_appserver.py](https://developers.google.com/appengine/downloads).
  - Note: The apps can be run as static html files by navigating your browser
    to the index.html file found in each app's directory.
3. You only need to rebuild an app if you change a template (.soy) file. There
   is a block comment at the top of each template file with build instructions.

## Project Layout There are various apps in the static/ directory, including
Maze, Turtle, and Karel. Each app has an index.html file, where you can find
the javascript dependencies. Each app has an <app>.js file -- containing game
dynamics and graphics rendering -- and a template.soy [Closure
Template](https://developers.google.com/closure/templates/). The apps each
define an object literal, e.g. Maze = {}, and these objects depend on two more
objects, Blockly and BlocklyApps. BlocklyApps is defined in static/common.js
and Blockly is defined in static/blockly\_compressed.js. To see the source code
for Blockly visit the Google Code [repo](https://code.google.com/p/blockly/).
This github repo does not contain the source code for blockly\_compressed.js,
you can consider it a black box with documentation and source code at Google
Code. Blockly uses the [Google Closure
Library](https://developers.google.com/closure/) and the build script for the
Closure Compiler is at the Google Code
[repo](https://code.google.com/p/blockly/). In summary, the apps depend on
common.js, which depends on blockly\_compressed.js, which depends on Google
Closure.

## To Contribute

### First, helpful links

1. [Web based tutorial](http://try.github.io/levels/1/challenges/1)
2. [Create a repo](https://help.github.com/articles/create-a-repo)
3. [Forking](https://help.github.com/articles/fork-a-repo)
4. [Pull Requests](https://help.github.com/articles/using-pull-requests)

### Quick Start

1. [Install and set up git](https://help.github.com/articles/set-up-git)
2. Fork this repository (see upper right of page).
3. Clone your new repo `git clone https://github.com/<username>/blockly.git`
4. Change directory to the newly cloned repo with `cd blockly`
5. Add this repo as a remote: `git remote add codedotorg
   https://github.com/code-dot-org/blockly.git`
6. [Hack]
7. Merge in most up-to-date changes, repeat as needed:
  1. `git fetch codedotorg`
  2. `git merge codedotorg/mooc`
8. Push changes to your fork, repeat as desired.
9. Initiate pull request on your fork's page, targeting this repository.
10. Find the pull request you initiated and assign it to someone. This requires
    that you are a collaborator on the project.

### Additional Tips

  - After submitting a pull request, start a new branch with `git checkout -b
    new_feature`. This allows you to keep working without affecting the pull
    request.
  - Once you have forked your own repository, you can makes as many commits,
    and push them to github, as you like. These will be pushed to your own repo
    and won't affect this shared repo. 
  - Once you have issued a pull request any additional pushes you make to your
    repo will automatically update the pull request. This is like running gcl
    update multiple times for the same change list.
  - Use `git rebase --interactive` to clean up messy commits before issuing a
    pull request. 
  - To use a global gitignore file read these
    [instructions](http://robots.thoughtbot.com/post/18739402579/global-gitignore).

## Merge Trunk

  1. Track the svn repo with `git svn init
     https://blockly.googlecode.com/svn/trunk/`
  1. See the effect by running `cat .git/config` before and after the above
     command.
  2. Fetch the repo now called 'svn': `git svn fetch svn`, this will take a
     couple minutes.
  4. Checkout a local branch which tracks the remote svn branch: `git checkout
     -b trunk git-svn`
  5. You can now treat your local branch `trunk` like any other git branch. To
     fetch further revisions from the svn repo use `git svn fetch`.
