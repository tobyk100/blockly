// This file was automatically generated from templateLevel2.soy.
// Please don't edit this file by hand.

if (typeof page2 == 'undefined') { var page2 = {}; }


page2.hints = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  switch (opt_ijData.level) {
    case 1:
      output += 'Try using the blocks to help me remove all the piles and fill in all the holes on the ground.';
      break;
    case 2:
      output += 'Use the new function block called "fill 5" to help me fill in this hole.';
      break;
    case 3:
      output += 'Use the function block to make me fill in all the holes.';
      break;
    case 4:
      output += 'Define a new function that removes 7 shovelfuls. Then use it to write a program that helps me remove all the piles.';
      break;
    case 5:
      output += 'Create a new function that removes 3 shovelfuls from a pile, and use it to help me level out all the piles.';
      break;
    case 6:
      output += 'Use the new functions, "fill 8" and "remove 8", to help me level out the pile and fill in the hole.';
      break;
    case 7:
      output += 'There\'s a cow in my field! Write a new function that helps me avoid the cow and remove the pile.';
      break;
    case 8:
      output += 'Use the function, "avoid the cow and remove 1", to help me remove all the piles.';
      break;
    case 9:
      output += 'Use one of the new functions to help me remove all of the piles on the ground with as few blocks as possible.';
      break;
    case 10:
      output += 'Move me across the field, and use the functions to help me remove all the piles and fill all the holes.';
      break;
    case 11:
      output += 'Use the new function, "remove 1 and avoid the cow", to make me level out the piles.';
      break;
  }
  return output;
};


page2.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<category name="Actions"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block><block type="maze_pickUpBall"></block><block type="maze_putDownBall"></block></category>' + page2.addProcedures(null, null, opt_ijData) + '<category name="Loops"><block type="maze_untilBlocked"></block><block type="controls_repeat"></block></category>';
};


page2.addProcedures = function(opt_data, opt_ignored, opt_ijData) {
  return ((opt_ijData.level > 3) ? '<category name="Functions" custom="PROCEDURE"></category>' : (opt_ijData.level == 2 || opt_ijData.level == 3) ? '<category name="Functions"><block type="procedures_callnoreturn"><mutation name="fill 5"></mutation></block></category>' : '') + ((opt_ijData.level < 9) ? '<category name="Conditionals"><block type="maze_if"></block></category>' : (opt_ijData.level > 8) ? '<category name="Conditionals"><block type="maze_if"></block><block type="maze_ifElse"></block></category>' : '');
};

;
// This file was automatically generated from templateLevel1.soy.
// Please don't edit this file by hand.

if (typeof page1 == 'undefined') { var page1 = {}; }


page1.hints = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  switch (opt_ijData.level) {
    case 1:
      output += 'Help me flatten the field on my farm so it\'s ready for planting. Move me to the pile of dirt to remove it.';
      break;
    case 2:
      output += 'Move me to the hole and fill it with two shovelfuls of dirt.';
      break;
    case 3:
      output += 'Move me to the pile of dirt and tell me how many shovelfuls to remove using as few blocks as possible.';
      break;
    case 4:
      output += 'Make me remove the 4 piles.';
      break;
    case 5:
      output += 'Make me fill in all the holes. Each hole needs 5 shovelfuls of dirt.';
      break;
    case 6:
      output += 'Make me remove all the piles of dirt, using as few blocks as possible. Check out the new option in the dropdown menu on the while block.';
      break;
    case 7:
      output += 'I don\'t know how many shovelfuls of dirt this hole needs. Write a program that makes me fill it until it\'s even.';
      break;
    case 8:
      output += 'Make me fill in the hole at the end of the field, using as few blocks as possible.';
      break;
    case 9:
      output += 'Make me remove all the piles, using as few blocks as possible.';
      break;
    case 10:
      output += 'It\'s nighttime, and I can\'t tell how large the piles are. Now I don\'t have all the options I used to have on the while block. Move me along the field, and if there is a pile, remove it.';
      break;
    case 11:
      output += 'It\'s still dark outside. Move me along the field. If there is a pile, remove it, and if there is a hole, fill it in.';
      break;
  }
  return output;
};


page1.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block><block type="maze_pickUpBall"></block>' + ((opt_ijData.level > 1) ? '<block type="maze_putDownBall"></block>' + ((opt_ijData.level > 2) ? '<block type="controls_repeat"></block>' + ((opt_ijData.level > 9) ? '<block type="maze_if"></block>' : '') : '') + ((opt_ijData.level == 5 || opt_ijData.level == 10 || opt_ijData.level == 11) ? '<block type="maze_untilBlocked"></block>' : '') + ((opt_ijData.level > 5 && opt_ijData.level < 8) ? '<block type="maze_untilBlockedOrNotClear"></block>' : '') + ((opt_ijData.level == 8 || opt_ijData.level == 9) ? '<block type="maze_untilBlockedOrNotClear"><title name="DIR">isPathForward</title></block>' : '') : '');
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="moveForward">move forward</span><span id="putDownBall">fill 1</span><span id="putDown5">put down 5</span><span id="pickUpBall">remove 1</span><span id="while">while</span><span id="ballsPresent">there is a pile</span><span id="holesPresent">there is a hole</span><span id="turnLeft">turn left</span><span id="turnRight">turn right</span><span id="doCode">do</span><span id="elseCode">else</span><span id="pathAhead">path ahead</span><span id="pathLeft">path to the left</span><span id="pathRight">path to the right</span><span id="noPathAhead">path is blocked</span><span id="noPathLeft">no path to the left</span><span id="noPathRight">no path to the right</span><span id="repeatUntilBlocked">while path ahead</span><span id="repeatUntilFinish">repeat until finish</span><span id="repeatWhileCurrentNotClear">while</span><span id="moveForwardTooltip">Move me forward one space.</span><span id="q4wrong">No - Try tracking my direction while following the program.</span><span id="q4right">That\'s right! Good job.</span><span id="q5wrong">No - Try tracking my direction while following the program.</span><span id="q5right">You got it right!</span><span id="q10wrong">No - Try tracking my direction while following the program.</span><span id="q10right">That\'s right!</span><span id="turnTooltip">Turns me left or right by 90 degrees.</span><span id="ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="capacity0">You have<span id=\'capacityNumber\'>0</span> blocks left.</span><span id="capacity1">You have <span id=\'capacityNumber\'>1</span> block left.</span><span id="capacity2">You have <span id=\'capacityNumber\'>%1</span> blocks left.</span><span id="nextLevel">Congratulations! You have completed this level.</span><span id="finalLevel">Congratulations! You have solved the final level.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span><span id="putdownTower">put down tower</span><span id="pickupTower">pickup tower</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<div id="start_blocks" style="display:none">' + mazepage.startBlocks(null, null, opt_ijData) + '</div><table width="100%" ' + apps.menu({menu: opt_ijData.menu}, null, opt_ijData) + '><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Farmer&nbsp;&nbsp;' + soy.$$escapeHtml(opt_ijData.page) + '</span> &nbsp; ';
  var iLimit298 = opt_ijData.maxLevel + 1;
  for (var i298 = 1; i298 < iLimit298; i298++) {
    output += ' ' + ((i298 == opt_ijData.level) ? (i298 > 9) ? '<span class="selected doubleDigit tab">' + soy.$$escapeHtml(i298) + '</span>' : '<span class="selected singleDigit tab">' + soy.$$escapeHtml(i298) + '</span>' : (i298 < opt_ijData.level) ? '<a class="tab previous" href="?page=' + soy.$$escapeHtml(opt_ijData.page) + '&lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i298) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i298) + '</a>' : '<a class="tab" href="?page=' + soy.$$escapeHtml(opt_ijData.page) + '&lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i298) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i298) + '</a>');
  }
  output += '</h1></td><td class="farSide">&nbsp;&nbsp;<button id="helpButton" onclick="BlocklyApps.showHelp(true, ' + soy.$$escapeHtml(opt_ijData.level) + ', false);">Help</button>&nbsp;&nbsp;<button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex;"><br><img class="stars feedback" id="star1" src="../star1.png"><img class="stars feedback" id="star2" src="../star2.png"><img class="stars feedback" id="star3" src="../star3.png"><ul id="levelFeedbackText"><span id="hintTitle" class="feedback" style="display: none; margin-left: -30px">fooHints:</span><li id="nextLevelMsg" style="display: none; margin-left: -40px;">Congratulations! You have completed this level.</li><li id="finalLevelMsg" style="display: none; margin-left: -40px;">Congratulations! You have solved the final level.</li><li id="emptyBlocksError" class="feedback" style="display: none">Remove empty blocks.</li><li id="missingBlocksError" class="feedback" style="display: none">Try one or more of the blocks below to solve this level.</li><li id="tooManyBlocksError" class="feedback" style="display: none">This level can be solved with <span id="idealNumberMessage"></span> blocks.</li><li id="tooFewBlocksError" class="feedback" style="display: none">You are using all of the necessary types of blocks, but try using more  of these types of blocks to complete this level.</li><li id="levelIncompleteError" class="feedback" style="display: none">You are using all of the necessary types of blocks but not in the right way.</li></ul><iframe id="feedbackBlocks" class="feedback" style="margin-left: 50px; height: 80px; width: 500px; border: none; display: none;" src=""></iframe><div id="interstitial" style="display: none;"><div style="margin-left: 50px;"><div id="reinfbubble"><span id="reinfMsg"></span></div><img id="pegman_bubble" height=42 width=55 src="pegman_bubble.png"></div><div id="reinfQuizFeedback" style="display: none;"><div style="padding-bottom: 0.7ex; text-align: center;"><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div></div></div><br><div id="returnToLevelButton" style="display: none;">' + apps.ok(null, null, opt_ijData) + '</div><div style="text-align: center"><button id="tryAgainButton" class="launch" style="display: none" onclick="BlocklyApps.goToNextLevelOrReset(false);">Try again</button><button id="continueButton" class="launch" style="display: none" onclick="BlocklyApps.goToNextLevelOrReset(true);">Continue</button></div></div></div></div><br><br><div id="visualization"><div id="hintBubble"><div id="hint">' + ((opt_ijData.page == 1) ? page1.hints(null, null, opt_ijData) : page2.hints(null, null, opt_ijData)) + '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400" tyle="padding-top: 10px;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="See generated JavaScript code." onclick="BlocklyApps.showCode();"><img src=\'../media/1x1.gif\' class="code icon21"></button><button id="linkButton" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src=\'../media/1x1.gif\' class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../media/1x1.gif" class="run icon21"> Run</button></button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../media/1x1.gif" class="stop icon21">Reset</button></td></tr></table><script type="text/javascript" src="../blockly_compressed.js"><\/script><script type="text/javascript" src="../javascript_compressed.js"><\/script><script type="text/javascript" src="../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;">' + ((opt_ijData.page == 1) ? page1.toolbox(null, null, opt_ijData) : page2.toolbox(null, null, opt_ijData)) + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../blockly_compressed.js"><\/script><script type="text/javascript" src="../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};


mazepage.startBlocks = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_ijData.page == 1) {
    switch (opt_ijData.level) {
      case 1:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 2:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 3:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 4:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 5:
        output += '<block type="maze_untilBlocked" x="70" y="70"></block>';
        break;
      case 6:
        output += '<block type="maze_pickUpBall" x="70" y="70"></block>';
        break;
      case 7:
        output += '<block type="maze_turn" x="70" y="70"><title name="DIR">turnRight</title></block>';
        break;
      case 8:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 9:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 10:
        output += '<block type="maze_untilBlocked" x="70" y="70"></block>';
        break;
      case 11:
        output += '<block type="maze_untilBlocked" x="70" y="70"></block>';
        break;
    }
  } else {
    switch (opt_ijData.level) {
      case 2:
        output += mazepage.fillShovelfuls({shovelfuls: 5}, null, opt_ijData);
        break;
      case 3:
        output += mazepage.fillShovelfuls({shovelfuls: 5}, null, opt_ijData);
        break;
      case 4:
        output += mazepage.fillShovelfuls({shovelfuls: 5}, null, opt_ijData) + '<block type="procedures_defnoreturn" x="300" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove 7</title></block>';
        break;
      case 5:
        output += '<block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove 3</title></block>';
        break;
      case 6:
        output += mazepage.fillShovelfuls({shovelfuls: 8}, null, opt_ijData) + mazepage.removeShovelfuls({shovelfuls: 8}, null, opt_ijData);
        break;
      case 7:
        output += '<block type="procedures_callnoreturn" x="20" y="70" editable=false deletable=false><mutation name="avoid the cow and remove 1"></mutation></block><block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">avoid the cow and remove 1</title></block>';
        break;
      case 8:
        output += '<block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">avoid the cow and remove 1</title><statement name="STACK"><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_pickUpBall" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
      case 9:
        output += '<block type="maze_if" x="20" y="70"><title name="DIR">ballsPresent</title></block><block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove piles</title><statement name="STACK"><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">4</title><statement name="DO"><block type="maze_pickUpBall" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false></block></next></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">4</title><statement name="DO"><block type="maze_moveForward" editable=false deletable=false movable=false></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" x="300" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">fill holes</title><statement name="STACK"><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">2</title><statement name="DO"><block type="maze_putDownBall" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false></block></next></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">2</title><statement name="DO"><block type="maze_moveForward" editable=false deletable=false movable=false></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
      case 10:
        output += '<block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove piles</title><statement name="STACK"><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">4</title><statement name="DO"><block type="maze_pickUpBall" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false></block></next></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">4</title><statement name="DO"><block type="maze_moveForward" editable=false deletable=false movable=false></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" x="300" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">fill holes</title><statement name="STACK"><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">2</title><statement name="DO"><block type="maze_putDownBall" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false></block></next></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">2</title><statement name="DO"><block type="maze_moveForward" editable=false deletable=false movable=false></block></statement><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
      case 11:
        output += '<block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove 1 and avoid the cow</title><statement name="STACK"><block type="maze_pickUpBall" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnRight</title><next><block type="maze_moveForward" editable=false deletable=false movable=false><next><block type="maze_turn" editable=false deletable=false movable=false><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
    }
  }
  return output;
};


mazepage.fillShovelfuls = function(opt_data, opt_ignored, opt_ijData) {
  return '<block type="procedures_defnoreturn" x="20" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">fill ' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="STACK"><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="DO"><block type="maze_putDownBall" editable=false deletable=false movable=false></block></statement></block></statement></block>';
};


mazepage.removeShovelfuls = function(opt_data, opt_ignored, opt_ijData) {
  return '<block type="procedures_defnoreturn" x="300" y="200" editable=false deletable=false><mutation></mutation><title name="NAME">remove ' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="STACK"><block type="controls_repeat" editable=false deletable=false movable=false><title name="TIMES">' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="DO"><block type="maze_pickUpBall" editable=false deletable=false movable=false></block></statement></block></statement></block>';
};


mazepage.controlsFor = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return '<block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">' + (opt_data.upperLimit ? opt_data.upperLimit : 10) + '</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value>' + ((opt_data.doStatement) ? '<statement name="DO">' + opt_data.doStatement + '</statement>' : '') + '</block>';
};

;
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
