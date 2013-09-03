# Blockly

Blockly is a web-based, graphical programming editor. Users can drag blocks together to build an application. No typing required. Credit goes to these awesome [developers](https://code.google.com/p/blockly/wiki/Credits#Engineers) and a small army of [translators](https://code.google.com/p/blockly/wiki/Credits#Translators).

This repository contains the source code for the [Blockly](https://code.google.com/p/blockly/) based 20 hour curriculum and Hour of Code. Information about Blockly can be found in the [wiki](https://code.google.com/p/blockly/w/list).

- [Contribute to Blockly](#to-contribute)
- [Merge trunk from Google Code](#merge-trunk)

## To Contribute

### Quickstart

1. Fork and clone this Repository.
2. Add this repo as a remote: `git remote add codedotorg https://github.com/code-dot-org/blockly.git`
3. [Hack]
4. Merge in most up-to-date changes, repeat as needed:
  1. `git fetch codedotorg master`
  2. `git merge codedotorg/master`
4. Push changes to your fork, repeat as desired.
5. Initiate pull request on your fork's page, targeting this repository.
6. Find the pull request you initiated and assign it to someone. This requires that you are a collaborator on the project.

### Additional Tips

- After submitting a pull request, start a new branch with `git checkout -b new_feature`. This allows you to keep working without affecting the pull request.
- Once you have forked your own repository, you can makes as many commits, and push them to github, as you like. These will be pushed to your own repo and won't affect this shared repo. 
- Once you have issued a pull request any additional pushes you make to your repo will automatically update the pull request. This is like running gcl update multiple times for the same change list.
- Use `git rebase --interactive` to clean up messy commits before issuing a pull request. 

## Merge Trunk

1. Track the svn repo with `git svn init https://blockly.googlecode.com/svn/trunk/`
  1. See the effect by running `cat .git/config` before and after the above command.
2. Fetch the repo now called 'svn': `git svn fetch svn`, this will take a couple minutes.
4. Checkout a local branch which tracks the remote svn branch: `git checkout -b trunk git-svn`
5. You can now treat your local branch `trunk` like any other git branch. To fetch further revisions from the svn repo use `git svn fetch`.
