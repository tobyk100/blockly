// This file was automatically generated from templateLevel2.soy.
// Please don't edit this file by hand.

if (typeof page2 == 'undefined') { var page2 = {}; }


page2.hints = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  switch (opt_ijData.level) {
    case 1:
      output += 'Try using the given blocks to remove all the mounds on the ground.';
      break;
    case 2:
      output += 'You are now given a new function block, fill 5, in the Functions category. It will fill 5 shovelfuls to a hole. Use it to make the farmer fill in the hole.';
      break;
    case 3:
      output += 'Use the function block to make the farmer fill in all the holes.';
      break;
    case 4:
      output += 'Define a new function that fills a hole which needs 7 shovelfuls to make the farmer fill in all the holes.';
      break;
    case 5:
      output += 'Create a new function, remove 3, that removes 3 shovelfuls from a mound, and use it to help the farmer level out all the mounds.';
      break;
    case 6:
      output += 'Use the new functions, remove tower and fill tower, to level out the mounds and fill in the holes.';
      break;
    case 7:
      output += 'Create a new function, jump hurdle and remove 1, that helps the farmer jump the hurdle and remove 1 shovelful from a mound, and use it.';
      break;
    case 8:
      output += 'Use the function, jump hurdle and remove 1, to help the farmer jump the row of hurdles.';
      break;
    case 9:
      output += 'Use the function, remove 1 and jump hurdle, to make the farmer level out the mounds. Notice the difference between the given function in the current level and the function in the last level.';
      break;
  }
  return output;
};


page2.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<category name="Actions"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block><block type="maze_pickUpBall"></block><block type="maze_putDownBall"></block></category>' + page2.addProcedures(null, null, opt_ijData);
};


page2.addProcedures = function(opt_data, opt_ignored, opt_ijData) {
  return ((opt_ijData.level > 3) ? '<category name="Functions" custom="PROCEDURE"></category>' : (opt_ijData.level == 2 || opt_ijData.level == 3) ? '<category name="Functions"><block type="procedures_callnoreturn"><mutation name="fill 5"></mutation></block></category>' : '') + ((opt_ijData.level < 9) ? '<category name="Conditionals"><block type="maze_if"></block></category>' : (opt_ijData.level == 9) ? '<category name="Conditionals"><block type="maze_if"></block><block type="maze_ifElse"></block></category>' : '') + ((opt_ijData.level < 9) ? '<category name="Loops"><block type="maze_untilBlocked"></block><block type="controls_repeat"></block></category>' : '<category name="Loops"><block type="maze_untilBlockedOrNotClear"></block><block type="controls_repeat"></block></category>');
};

;
// This file was automatically generated from templateLevel1.soy.
// Please don't edit this file by hand.

if (typeof page1 == 'undefined') { var page1 = {}; }


page1.hints = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  switch (opt_ijData.level) {
    case 1:
      output += 'Help the farmer flatten the field so they can plant their crops. Move the farmer to the mound of dirt and remove it.';
      break;
    case 2:
      output += 'Move the farmer to the hole and fill it with two shovelfuls of dirt.';
      break;
    case 3:
      output += 'Make the farmer remove all the mounds, using as few blocks as possible.';
      break;
    case 4:
      output += 'Move the farmer to the hole and make them fill it until it is even.';
      break;
    case 5:
      output += 'Make the farmer fill in the hole. Check out the new option in the dropdown menu on the while block.';
      break;
    case 6:
      output += 'Make the farmer remove all the mounds, using as few blocks as possible.';
      break;
    case 7:
      output += 'It\'s dark outside and now the farmer can\'t tell how large the mound is. This means one of the options on the while loop has been taken away. Tell the farmer how many shovelfuls of dirt to remove.';
      break;
    case 8:
      output += 'It\'s still dark outside. Tell the farmer to fill in all the holes. Each hole needs 5 shovelfuls of dirt.';
      break;
    case 9:
      output += 'Remove the 4 the mounds.';
      break;
    case 10:
      output += 'Move the farmer along the field. If there is a mound, remove it, and if there is a hole, fill it in.';
      break;
  }
  return output;
};


page1.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block><block type="maze_pickUpBall"></block>' + ((opt_ijData.level > 1) ? '<block type="maze_putDownBall"></block>' + ((opt_ijData.level > 6) ? '<block type="controls_repeat"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_untilBlockedOrNotClear"></block>' + ((opt_ijData.level > 9) ? '<block type="maze_if"></block>' : '') : '') : '') + ((opt_ijData.level == 3 || opt_ijData.level == 4) ? '<block type="maze_whileNotClear"></block>' : '') + ((opt_ijData.level == 7 || opt_ijData.level == 8) ? '<block type="maze_untilBlocked"></block>' : '') + ((opt_ijData.level == 5 || opt_ijData.level == 6) ? '<block type="maze_untilBlockedOrNotClear"></block>' : '') : '');
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="start_blocks" style="display:none">' + mazepage.startBlocks(null, null, opt_ijData) + '</div><div id="MSG" style="display: none"><span id="moveForward">move forward</span><span id="putDownBall">fill 1</span><span id="putDown5">put down 5</span><span id="pickUpBall">remove 1</span><span id="while">while</span><span id="ballsPresent">current spot has a mound</span><span id="holesPresent">current spot has a hole</span><span id="turnLeft">turn left</span><span id="turnRight">turn right</span><span id="doCode">do</span><span id="elseCode">else</span><span id="pathAhead">path ahead</span><span id="pathLeft">path to the left</span><span id="pathRight">path to the right</span><span id="noPathAhead">path is blocked</span><span id="noPathLeft">no path to the left</span><span id="noPathRight">no path to the right</span><span id="repeatUntilBlocked">while path is not blocked</span><span id="repeatUntilFinish">repeat until finish</span><span id="repeatWhileCurrentNotClear">while current spot is uneven</span><span id="moveForwardTooltip">Move me forward one space.</span><span id="q4wrong">No - Try tracking my direction while following the program.</span><span id="q4right">That\'s right! Good job.</span><span id="q5wrong">No - Try tracking my direction while following the program.</span><span id="q5right">You got it right!</span><span id="q10wrong">No - Try tracking my direction while following the program.</span><span id="q10right">That\'s right!</span><span id="turnTooltip">Turns me left or right by 90 degrees.</span><span id="ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="capacity0">You have<span id=\'capacityNumber\'>0</span> blocks left.</span><span id="capacity1">You have <span id=\'capacityNumber\'>1</span> block left.</span><span id="capacity2">You have <span id=\'capacityNumber\'>%1</span> blocks left.</span><span id="nextLevel">Congratulations! You have completed this level.</span><span id="finalLevel">Congratulations! You have solved the final level.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span><span id="putdownTower">put down tower</span><span id="pickupTower">pickup tower</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved Blockly file.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span></div><table width="100%" ' + apps.menu({menu: opt_ijData.menu}, null, opt_ijData) + '><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Farmer</span> &nbsp; ';
  var iLimit306 = opt_ijData.maxLevel + 1;
  for (var i306 = 1; i306 < iLimit306; i306++) {
    output += ' ' + ((i306 == opt_ijData.level) ? (i306 > 9) ? '<span class="selected doubleDigit tab">' + soy.$$escapeHtml(i306) + '</span>' : '<span class="selected singleDigit tab">' + soy.$$escapeHtml(i306) + '</span>' : (i306 < opt_ijData.level) ? '<a class="tab previous" href="?page=' + soy.$$escapeHtml(opt_ijData.page) + '&lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i306) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i306) + '</a>' : '<a class="tab" href="?page=' + soy.$$escapeHtml(opt_ijData.page) + '&lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i306) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i306) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="levelFeedback"><div style="padding-bottom: 0.7ex;"><br><textarea id="levelFeedbackText" rows=3 cols=40 style="resize: none; border: 0; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;">';
  if (opt_ijData.page == 1) {
    switch (opt_ijData.level) {
      case 1:
      case 2:
        output += 'You could solve this level with fewer blocks. Can you find a solution with fewer blocks?';
        break;
      case 3:
        output += 'There is a solution using only 3 blocks. Can you find it? Try using the while block.';
        break;
      case 4:
        output += 'Can you use the while block to complete the level with only 4 blocks?';
        break;
      case 5:
        output += 'There is a solution using only 3 blocks. Can you find it? Did you try the new option on the while block?';
        break;
      case 6:
        output += 'Could you use two while blocks to complete this level with fewer total blocks?';
        break;
      case 7:
        output += 'There is a solution using only 3 blocks. Can you find it? Did you using the repeat block?';
        break;
      case 8:
        output += 'Can you find a solution using 4 blocks? Try putting a loop inside of another loop. Remember, loop blocks are green.';
        break;
      case 9:
        output += 'Can you find a solution using only 4 blocks? Try using one of the green loop blocks.';
        break;
      case 10:
        output += 'Can you find a solution using 6 blocks? Try including 2 if blocks.';
        break;
    }
  } else if (opt_ijData.page == 2) {
    switch (opt_ijData.level) {
      case 1:
        output += 'Use only the blocks you need to get to complete the level.';
        break;
      case 2:
      case 3:
      case 6:
      case 8:
      case 9:
        output += 'Try using the given function(s).';
        break;
      case 4:
      case 5:
      case 7:
        output += 'Try defining your own function and use it.';
        break;
    }
  }
  output += '</textarea><div id="interstitial" style="display: none;">' + ((opt_ijData.level == 2) ? '<img style="margin-left: 110px;" src="repeat_block.png">' : '') + '<br><div id="reinfbubble"><span id="reinfMsg">';
  switch (opt_ijData.level) {
  }
  output += '</span></div><img id="pegman_bubble" height=42 width=55 src="pegman_bubble.png">' + ((opt_ijData.level == 4) ? '<p><img border=2 src="dirs.png">&nbsp;<img src="dirs2.png"><br>' : '') + ((opt_ijData.level == 5) ? '<p><img style="margin-left: 110px;" src="ifblock.png"><br>' : '') + ((opt_ijData.level == 6) ? '<img style="margin-top: 10px;" border=2 src="repeat_block2.png"><br>' : '') + ((opt_ijData.level == 9) ? '<p><img style="margin-left: 60px; height: 150px; width: 260px;" src="if-else2.png"><br><br>' : '') + ((opt_ijData.level == 10) ? '<p><img style="margin-left: 10px; height: 350px; width: 490px;" src="ifelse.png"><br>' : '') + ((opt_ijData.level == 4) ? '<p><input type="radio" name="q4" id="q41" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> N</span><br><input type="radio" name="q4" id="q42" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> E</span><br><input type="radio" name="q4" id="q43" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> S</span><br><input type="radio" name="q4" id="q44" onclick="Maze.showReinfHelp(\'q4r\')"><span style="font-weight: bold"> W</span><br><br></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex;"><div style="text-align: center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()&nbsp"><span>OK</span></button></div></div>' : '') + ((opt_ijData.level == 6) ? '<p><img style="margin-left: 30px;" src="repeat_blocka1.png" onclick="Maze.showReinfHelp(\'q5w\')"><img style="margin-left: 20px;" src="repeat_blocka2.png" onclick="Maze.showReinfHelp(\'q5r\')"><img style="margin-left: 20px;" src="repeat_blocka3.png" onclick="Maze.showReinfHelp(\'q5w\')"></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex"><div style="text-align: center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex;"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()"><span>OK</span></button></div></div>' : '') + ((opt_ijData.level == 10) ? '<p><input type="radio" name="q8" id="q81" onClick="Maze.showReinfHelp(\'q10r\')"><span style="font-weight: bold"> Yes</span><br><input type="radio" name="q8" id="q82" onClick="Maze.showReinfHelp(\'q10w\')"><span style="font-weight: bold"> No</span><br><br></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex;"><div style="text-align:center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex;"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()"><span>OK</span></button></div></div>' : '') + '</div><br><br><div style="text-align: center"><button id="tryLevelAgainButton" class="launch" style="display: none" onclick="Maze.closeDialogButtonClick(false);">Try again</button><button id="nextLevelButton" class="launch" style="display: none" onclick="Maze.closeDialogButtonClick(true);">Continue</button></div></div></div><div id="visualization"><div id="hintBubble"><div id="hint">' + ((opt_ijData.page == 1) ? page1.hints(null, null, opt_ijData) : page2.hints(null, null, opt_ijData)) + '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="See generated JavaScript code." onclick="BlocklyApps.showCode();"><img src=\'../media/1x1.gif\' class="code icon21"></button><button id="linkButton" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src=\'../media/1x1.gif\' class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../media/1x1.gif" class="run icon21">  Run Program</button></button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><script type="text/javascript" src="../blockly_compressed.js"><\/script><script type="text/javascript" src="../javascript_compressed.js"><\/script><script type="text/javascript" src="../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div><div id="shadow"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;">' + ((opt_ijData.page == 1) ? page1.toolbox(null, null, opt_ijData) : page2.toolbox(null, null, opt_ijData)) + '</xml>';
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
        output += '<block type="maze_pickUpBall" x="70" y="70"></block>';
        break;
      case 4:
        output += '<block type="maze_turn" x="70" y="70"><title name="DIR">turnRight</title></block>';
        break;
      case 5:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 6:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 7:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 8:
        output += '<block type="maze_untilBlocked" x="70" y="70"></block>';
        break;
      case 9:
        output += '<block type="maze_moveForward" x="70" y="70"></block>';
        break;
      case 10:
        output += '<block type="maze_untilBlockedOrNotClear" x="70" y="70"></block>';
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
        output += mazepage.fillShovelfuls({shovelfuls: 5}, null, opt_ijData) + '<block type="procedures_defnoreturn" x="300" y="200"><mutation></mutation><title name="NAME">fill 7</title></block>';
        break;
      case 5:
        break;
      case 6:
        output += '<block type="procedures_defnoreturn" x="20" y="200"><mutation></mutation><title name="NAME">remove tower</title><statement name="STACK"><block type="maze_turn"><title name="DIR">turnLeft</title><next><block type="controls_repeat"><title name="TIMES">3</title><statement name="DO"><block type="maze_pickUpBall"><next><block type="maze_moveForward"></block></next></block></statement><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="controls_repeat"><title name="TIMES">3</title><statement name="DO"><block type="maze_moveForward"></block></statement><next><block type="maze_turn"><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" x="300" y="200"><mutation></mutation><title name="NAME">fill tower</title><statement name="STACK"><block type="maze_turn"><title name="DIR">turnLeft</title><next><block type="controls_repeat"><title name="TIMES">3</title><statement name="DO"><block type="maze_putDownBall"><next><block type="maze_moveForward"></block></next></block></statement><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="controls_repeat"><title name="TIMES">3</title><statement name="DO"><block type="maze_moveForward"></block></statement><next><block type="maze_turn"><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
      case 7:
        break;
      case 8:
        output += '<block type="procedures_defnoreturn" x="20" y="200"><mutation></mutation><title name="NAME">jump hurdle and remove 1</title><statement name="STACK"><block type="maze_turn"><title name="DIR">turnLeft</title><next><block type="maze_moveForward"><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_moveForward"><next><block type="maze_moveForward"><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_moveForward"><next><block type="maze_pickUpBall"><next><block type="maze_turn"><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
      case 9:
        output += '<block type="procedures_defnoreturn" x="20" y="200"><mutation></mutation><title name="NAME">remove 1 and jump hurdle</title><statement name="STACK"><block type="maze_pickUpBall"><next><block type="maze_turn"><title name="DIR">turnLeft</title><next><block type="maze_moveForward"><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_moveForward"><next><block type="maze_moveForward"><next><block type="maze_turn"><title name="DIR">turnRight</title><next><block type="maze_moveForward"><next><block type="maze_turn"><title name="DIR">turnLeft</title></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block>';
        break;
    }
  }
  return output;
};


mazepage.fillShovelfuls = function(opt_data, opt_ignored, opt_ijData) {
  return '<block type="procedures_defnoreturn" x="20" y="200"><mutation></mutation><title name="NAME">fill ' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="STACK"><block type="controls_repeat"><title name="TIMES">' + soy.$$escapeHtml(opt_data.shovelfuls) + '</title><statement name="DO"><block type="maze_putDownBall"></block></statement></block></statement></block>';
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
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
