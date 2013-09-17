#!/bin/bash

java -jar lib/soy/SoyMsgExtractor.jar --outputFile i18n/common.xlf --srcs src/common.soy
java -jar lib/soy/SoyMsgExtractor.jar --outputFile i18n/bird.xlf --srcs src/bird/template.soy
java -jar lib/soy/SoyMsgExtractor.jar --outputFile i18n/maze.xlf --srcs src/maze/template.soy
java -jar lib/soy/SoyMsgExtractor.jar --outputFile i18n/turtle.xlf --srcs src/turtle/template.soy
java -jar lib/soy/SoyMsgExtractor.jar --outputFile i18n/karel.xlf --srcs src/karel/templateLevel2.soy,src/karel/templateLevel1.soy,src/karel/template.soy

function move_json {
  mkdir -p i18n/$1
  mv en_us.json keys.json qqq.json i18n/$1
}

i18n/xliff_to_json.py --xlf i18n/common.xlf --templates src/common.soy --lang en_us
move_json common

i18n/xliff_to_json.py --xlf i18n/bird.xlf --templates src/bird/template.soy --lang en_us
move_json bird

i18n/xliff_to_json.py --xlf i18n/maze.xlf --templates src/maze/template.soy --lang en_us
move_json maze

i18n/xliff_to_json.py --xlf i18n/turtle.xlf --templates src/turtle/template.soy --lang en_us
move_json turtle

i18n/xliff_to_json.py --xlf i18n/karel.xlf --templates src/karel/template.soy src/karel/templateLevel*.soy --lang en_us
move_json karel

node ./script/merge_i18n_json.js

for app in common bird maze turtle karel; do
  rm i18n/$app/{en_us,keys,qqq}.json
  mv i18n/$app/{merged,en_us}.json
done
