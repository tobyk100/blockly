// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="projectMessage">CS First</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="help">Help</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="hintTitle">Hint:</span><span id="emptyBlocksErrorMessage">Remove empty blocks.</span><span id="tooFewBlocksMsg">You are using all of the necessary types of blocks, but try using more  of these types of blocks to complete this level.</span><span id="tooManyBlocksMsg">This level can be solved with <span id="idealNumberMessage"></span> blocks.</span><span id="missingBlocksErrorMsg">Try one or more of the blocks below to solve this level.</span><span id="levelIncompleteError">You are using all of the necessary types of blocks but not in the right way.</span><span id="nextLevelMsg">Congratulations! You have completed this level.</span><span id="finalLevelMsg">Congratulations! You have solved the final level.</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};


apps.menu = function(opt_data, opt_ignored, opt_ijData) {
  return (! opt_data.menu) ? ' class="hide" ' : '';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="moveForward">move forward</span><span id="turnLeft">turn left</span><span id="turnRight">turn right</span><span id="doCode">do</span><span id="elseCode">else</span><span id="pathAhead">if path ahead</span><span id="pathLeft">if path to the left</span><span id="pathRight">if path to the right</span><span id="repeatUntil">repeat until</span><span id="moveForwardTooltip">Move me forward one space.</span><span id="q2wrong">No - Try tracking my direction while following the program.</span><span id="q2right">That\'s right!</span><span id="q5wrong">No - Try tracking my direction while following the program.</span><span id="q5right">That\'s right!</span><span id="q9wrong">No - Try tracking my direction while following the program.</span><span id="q9right">That\'s right!</span><span id="turnTooltip">Turns me left or right by 90 degrees.</span><span id="ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="capacity0">You have<span id=\'capacityNumber\'>0</span> blocks left.</span><span id="capacity1">You have <span id=\'capacityNumber\'>1</span> block left.</span><span id="capacity2">You have <span id=\'capacityNumber\'>%1</span>blocks left.</span><span id="nextLevel">Congratulations! You have completed this level.</span><span id="finalLevel">Congratulations! You have solved the final level.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span><span id="numBlocksNeeded">This level can be solved with %1 blocks.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_ijData.mode == 2) ? '<script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/adp_maze.js"><\/script>' : '') + mazepage.messages(null, null, opt_ijData) + '<table width="100%" ' + apps.menu({menu: opt_ijData.menu}, null, opt_ijData) + 'style="border-bottom: 1px solid #DBDBDB;"><tr><td><h1><span id="title"><a href="https://sites.google.com/site/computersciencefirst/">CS First</a> : Maze</span> &nbsp; ';
  var iLimit270 = opt_ijData.mode == 2 ? 19 : 11;
  for (var i270 = 1; i270 < iLimit270; i270++) {
    output += ' ' + ((i270 == opt_ijData.level) ? (i270 > (opt_ijData.mode == 2 ? 19 : 11) - 2) ? '<span class="selected doubleDigit tab">' + soy.$$escapeHtml(i270) + '</span>' : '<span class="selected tab">' + soy.$$escapeHtml(i270) + '</span>' : (i270 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i270) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '&mode=' + soy.$$escapeHtml(opt_ijData.mode) + '">' + soy.$$escapeHtml(i270) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i270) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '&mode=' + soy.$$escapeHtml(opt_ijData.mode) + '">' + soy.$$escapeHtml(i270) + '</a>');
  }
  output += '</h1></td><td class="farSide">&nbsp;&nbsp;<button id="helpButton" onclick="BlocklyApps.showHelp(true, ' + soy.$$escapeHtml(opt_ijData.level) + ', false);">Help</button>&nbsp;&nbsp;<button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex;"><br><img class="stars feedback" id="star1" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'star1.png"><img class="stars feedback" id="star2" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'star2.png"><img class="stars feedback" id="star3" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'star3.png"><ul id="levelFeedbackText"><span id="hintTitle" class="feedback" style="display: none; margin-left: -30px">Hints:</span><li id="nextLevelMsg" style="display: none; margin-left: -40px;">Congratulations! You have completed this level.</li><li id="finalLevelMsg" style="display: none; margin-left: -40px;">Congratulations! You have solved the final level.</li><li id="emptyBlocksError" class="feedback" style="display: none">Remove empty blocks.</li><li id="missingBlocksError" class="feedback" style="display: none">Try one or more of the blocks below to solve this level.</li><li id="tooManyBlocksError" class="feedback" style="display: none">This level can be solved with <span id="idealNumberMessage"></span> blocks.</li><li id="tooFewBlocksError" class="feedback" style="display: none">You are using all of the necessary types of blocks, but try using more  of these types of blocks to complete this level.</li><li id="levelIncompleteError" class="feedback" style="display: none">You are using all of the necessary types of blocks but not in the right way.</li></ul><iframe id="feedbackBlocks" class="feedback" style="margin-left: 50px; height: 80px; width: 500px; border: none; display: none;" src=""></iframe><div id="interstitial" style="display: none;"><div style="margin-left: 50px;"><div id="reinfbubble"><span id="reinfMsg">';
  if (opt_ijData.mode == 1) {
    switch (opt_ijData.level) {
      case 1:
        output += '<span class="preInter">Watch the video below and learn how to use blocks to make me move.</span>';
        break;
      case 2:
        output += '<span class="postInter">Which direction am I facing after this program ends?</span>';
        break;
      case 3:
        output += 'A repeat block repeats the blocks inside it until I reach the red marker.';
        break;
      case 5:
        output += '<span class="preInter">Here is an \'if\' block: I will turn in a particular direction if there is a path in that direction. For example if there is a path to the left, I will turn left.</span><span class="postInter">We can place \'if\' blocks inside \'repeat\' blocks. Where am I when this program ends? Click on the correct picture below.</span>';
        break;
      case 6:
        output += '<strong>Remember:</strong><ul><li>\'repeat\' blocks perform an action multiple times without additional blocks.</li><li>\'if\' blocks check if there is a path in a certain direction.</li></ul>';
        break;
      case 9:
        output += '<span class="preInter">Here is an \'if-else\' block: I move forward if there is a path ahead, otherwise I turn left.</span><span class="postInter">Will the blocks below move me to the red marker?</span>';
        break;
    }
  }
  output += '</span></div><img id="pegman_bubble" height=42 width=55 src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/pegman_bubble.png"></div>';
  if (opt_ijData.mode == 1) {
    switch (opt_ijData.level) {
      case 1:
        output += '<iframe class="video" src=""></iframe>';
        break;
      case 2:
        output += '<p class="postInter" style="border: 2px solid black; width: 470px; margin-left: 20px;"><img src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/dirs.png" style="margin-left: 30px; padding-bottom: 4px;"><img src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/dirs2.png"><iframe style="height: 133px; width: 170px; border: none;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_turn%22%20x%3D%2226%22%20y%3D%2222%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E"></iframe></p>';
        break;
      case 3:
        output += '<p class="preInter"><iframe style="height: 110px; width: 180px; border: none; margin-left: 110px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_forever%22%20x%3D%2220%22%20y%3D%2222%22%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E""></iframe><br><iframe class="video" src=""></iframe></p>';
        break;
      case 5:
        output += '<p class="preInter"><iframe style="height: 110px; width: 180px; border: none; margin-left: 60px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_if%22%20x%3D%2215%22%20y%3D%2214%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathLeft%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E"></iframe><br><iframe class="video" src=""></iframe></p><p class="postInter" style="border: 2px solid black; width: 530px; margin-left: 30px;"><img style="margin-top: 10px; margin-left: 20px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/repeat_block2.png"><iframe style="height: 180px; width: 230px; border: none; margin-left: 60px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_forever%22%20x%3D%2210%22%20y%3D%2212%22%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_if%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathRight%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cnext%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E"></iframe><br></p>';
        break;
      case 9:
        output += '<p class="preInter"><iframe style="height: 133px; width: 170px; border: none; margin-left: 60px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_ifElse%22%20x%3D%226%22%20y%3D%2216%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathForward%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E"></iframe></p><p class="postInter"><img style="margin-left: 40px; height: 300px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/ifelse.png"><iframe style="height: 300px; width: 290px; border: none;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock%20type%3D%22maze_ifElse%22%20x%3D%2222%22%20y%3D%2221%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathForward%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_ifElse%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathLeft%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_if%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathRight%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E"></iframe></p>';
        break;
    }
  }
  if (opt_ijData.mode == 1) {
    switch (opt_ijData.level) {
      case 2:
        output += '<p class="quiz postInter"><input type="radio" name="q2" id="q21" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q2w\')"><label for="q21" style="font-weight: bold">N</label><br><input type="radio" name="q2" id="q22" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q2w\')"><label for="q22" style="font-weight: bold">E</label><br><input type="radio" name="q2" id="q23" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q2w\')"><label for="q23" style="font-weight: bold">S</label><br><input type="radio" name="q2" id="q24" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q2r\')"><label for="q24" style="font-weight: bold">W</label><br></p>';
        break;
      case 5:
        output += '<p class="quiz postInter" style="margin-left: 115px; margin-bottom: 20px;"><img style="margin-left: 50px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/repeat_blocka1.png" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q5w\')"><img style="margin-left: 50px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/repeat_blocka2.png" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q5r\')"><img style="margin-left: 50px;" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/repeat_blocka3.png" onclick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q5w\')"></p>';
        break;
      case 9:
        output += '<p class="quiz postInter"><input type="radio" name="q9" id="q91" onClick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q9r\')"><label for="q91" style="font-weight: bold">Yes</label><br><input type="radio" name="q9" id="q92" onClick="BlocklyApps.showReinfQuizFeedback(' + soy.$$escapeHtml(opt_ijData.level) + ', \'q9w\')"><label for="q92" style="font-weight: bold">No</p>';
        break;
    }
  }
  output += '<div id="reinfQuizFeedback" style="display: none;"><div style="padding-bottom: 0.7ex; text-align: center;"><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div></div></div><br><div id="returnToLevelButton" style="display: none;">' + apps.ok(null, null, opt_ijData) + '</div><div style="text-align: center"><button id="tryAgainButton" class="launch" style="display: none" onclick="BlocklyApps.goToNextLevelOrReset(false);">Try again</button><button id="continueButton" class="launch" style="display: none" onclick="BlocklyApps.goToNextLevelOrReset(true);">Continue</button></div></div></div><div id="visualization"><div id="hintBubble"><div id="hint">';
  if (opt_ijData.mode == 1) {
    switch (opt_ijData.level) {
      case 1:
        output += 'A program is a sequence of statements. Stack a couple of \'move forward\' blocks together to help me reach the goal.';
        break;
      case 2:
        output += 'What should I do to follow the path?';
        break;
      case 3:
        output += 'Computers have limited memory. Reach the end of this path using only two blocks.';
        break;
      case 4:
        output += 'Reach the goal using only five blocks.';
        break;
      case 5:
        output += 'I will have to turn left when I cannot go straight. Use an \'if\' block to see if their is a path in another direction.';
        break;
      case 6:
        output += 'An \'if\' condition will do something only if the condition is true.  Try turning left if there is a path to the left.';
        break;
      case 7:
        output += 'A small change to the blocks from the previous maze will solve this level.';
        break;
      case 8:
        output += 'You can use more than one \'if\' statement.';
        break;
      case 9:
        output += 'If-else blocks will do one thing or the other.';
        break;
      case 10:
        output += 'Use the \'if-else\' block to help me get out of the maze!';
        break;
    }
  } else if (opt_ijData.mode == 2) {
    switch (opt_ijData.level) {
      case 1:
        output += 'A program is a sequence of statements. Stack a couple of \'move forward\' blocks together to help me reach the goal.';
        break;
      case 2:
        output += 'A program is a sequence of statements. Stack a couple of \'move forward\' blocks together to help me reach the goal.';
        break;
      case 3:
        output += 'What should I do to follow the path?';
        break;
      case 4:
        output += 'What should I do to follow the path?';
        break;
      case 5:
        output += 'Try to reach the end of this path using only two blocks.';
        break;
      case 6:
        output += 'Try to reach the end of this path using only three blocks.';
        break;
      case 7:
        output += 'Try to reach the end of this path using only two repeat blocks.';
        break;
      case 8:
        output += 'Try to reach the end of this path using only two repeat blocks.';
        break;
      case 9:
        output += 'Try to reach the end of this path using the new repeat block.';
        break;
      case 10:
        output += 'Try to reach the end of this path using only three blocks.';
        break;
      case 11:
        output += 'Reach the goal using only five blocks.';
        break;
      case 12:
        output += 'Reach the goal using only five blocks.';
        break;
      case 13:
        output += 'I will have to turn left when I cannot go straight. Use an \'if\' block to see if their is a path in another direction.';
        break;
      case 14:
        output += 'I will have to turn right when I cannot go straight. Use an \'if\' block to see if their is a path in another direction.';
        break;
      case 15:
        output += 'An \'if\' condition will do something only if the condition is true.  Try turning right if there is a path to the right.';
        break;
      case 16:
        output += 'An \'if\' condition will do something only if the condition is true.  Try turning right if there is a path to the right.';
        break;
      case 17:
        output += 'If-else blocks will do one thing or the other.';
        break;
      case 18:
        output += 'Use the \'if-else\' block to help me get out of the maze!';
        break;
    }
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table id="gameButtons" width="400" style="padding-top: 10px;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="See generated JavaScript code." onclick="BlocklyApps.showCode();"><img src=\'' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'media/1x1.gif\' alt="code" class="code icon21"></button><button id="linkButton" class="notext" style="display: none;" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src=\'' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'media/1x1.gif\' alt="link" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'media/1x1.gif" class="run icon21">Run</button></button><button id="resetButton" class="launch" onclick="BlocklyApps.resetButtonClick();" style="display: none"><img src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'media/1x1.gif" class="stop icon21">Reset</button></td></tr></table><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'blockly_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'javascript_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.mode == 1) ? (opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 5) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 5 && opt_ijData.level < 9) ? '<block type="maze_if"></block>' : '') + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '' : (opt_ijData.mode == 2) ? ((opt_ijData.level > 4 && opt_ijData.level < 9) ? '<block type="controls_repeat"><title name="TIMES">5</title></block>' : '') + ((opt_ijData.level > 8) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 13) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level == 14) ? '<block type="maze_if"><title name="DIR">isPathRight</title></block>' : (opt_ijData.level > 13 && opt_ijData.level < 17) ? '<block type="maze_if"></block>' : '') + ((opt_ijData.level > 16) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'blockly_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.baseUrl) + 'maze/blocks.js"><\/script><div id="blockly"></div>';
};
