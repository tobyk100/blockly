/**
 * Blockly Apps: Maze
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Maze application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

var BlocklyApps = require('../base');
var levels = require('./levels');
var msg = require('../../build/en_us/i18n/karel');
var skins = require('../skins');
var tiles = require('../tiles');

var Direction = tiles.Direction;

/**
 * Create a namespace for the application.
 */
var Maze = module.exports;

var levelId = BlocklyApps.getStringParamFromUrl('level', '1_1');
var level = levels[levelId];

Maze.MAX_REINF = 0;
Maze.REINF = BlocklyApps.getNumberParamFromUrl('reinf', 1, Maze.MAX_REINF);

var skinId = BlocklyApps.getStringParamFromUrl('skin', 'farmer');
var skin = skins.load(BlocklyApps.BASE_URL, skinId);

exports.config = {
  skin: skin,
  level: level,
  interstitials: BlocklyApps.INTERSTITIALS,
  baseUrl: BlocklyApps.BASE_URL
};

/**
 * Milliseconds between each animation frame.
 */
var stepSpeed;

/**
 * The types of squares in the maze, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Maze.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3,
  OBSTACLE: 4,
  STARTANDFINISH: 5
};

/**
 * Load level configuration.
 */
Maze.map = level.map;
BlocklyApps.IDEAL_BLOCK_NUM = level.ideal;
Maze.initialBallMap = level.initialBalls;
Maze.finalBallMap = level.finalBalls;
Maze.startDirection = level.startDirection;
/**
 * Blocks that are expected to be used on each level.
 * The block will be displayed as feedback in the order below.
 * 'test' is the string that will be searched for in the code.
 * 'type' is the type of block to be generated as feedback.
 * 'params' are optional and create a more specific block of the given type.
 */
BlocklyApps.REQUIRED_BLOCKS = level.requiredBlocks;

//The number of blocks to show as feedback.
BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG = 1;

BlocklyApps.INTERSTITIALS = level.interstitials || {};

// Default Scalings
Maze.scale = {
  'snapRadius': 1,
  'stepSpeed': 5
};

// Override scalars.
for (var key in level.scale) {
  Maze.scale[key] = level.scale[key];
}

Maze.map.unshift(new Array(Maze.map[0].length));
Maze.initialBallMap.unshift(new Array(Maze.initialBallMap[0].length));
Maze.finalBallMap.unshift(new Array(Maze.finalBallMap[0].length));

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Maze.ROWS = Maze.map.length;
Maze.COLS = Maze.map[0].length;
Maze.SQUARE_SIZE = 50;
Maze.PEGMAN_HEIGHT = 52;
Maze.PEGMAN_WIDTH = 49;

Maze.MAZE_WIDTH = Maze.SQUARE_SIZE * Maze.COLS;
Maze.MAZE_HEIGHT = Maze.SQUARE_SIZE * Maze.ROWS;
Maze.PATH_WIDTH = Maze.SQUARE_SIZE / 3;

/**
 * PIDs of animation tasks currently executing.
 */
Maze.pidList = [];

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Maze.tile_SHAPES = {
  '10010': [4, 0],  // Dead ends
  '10001': [3, 3],
  '11000': [0, 1],
  '10100': [0, 2],
  '11010': [4, 1],  // Vertical
  '10101': [3, 2],  // Horizontal
  '10110': [0, 0],  // Elbows
  '10011': [2, 0],
  '11001': [4, 2],
  '11100': [2, 3],
  '11110': [1, 1],  // Junctions
  '10111': [1, 0],
  '11011': [2, 1],
  '11101': [1, 2],
  '11111': [2, 2],  // Cross
  'null0': [4, 3],  // Empty
  'null1': [3, 0],
  'null2': [3, 1],
  'null3': [0, 3],
  'null4': [1, 3]
};

Maze.drawMap = function() {
  var svg = document.getElementById('svgMaze');

  // Draw the outer square.
  var square = document.createElementNS(Blockly.SVG_NS, 'rect');
  square.setAttribute('width', Maze.MAZE_WIDTH);
  square.setAttribute('height', Maze.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#CCB');
  svg.appendChild(square);

  // Adjust outer element size.
  svg.setAttribute('width', Maze.MAZE_WIDTH);
  svg.setAttribute('height', Maze.MAZE_HEIGHT);

  // Adjust hint bubble width.
  var hintBubble = document.getElementById('hintBubble');
  hintBubble.style.width = (Maze.MAZE_WIDTH - 20) + 'px';

  // Adjust button table width.
  var buttonTable = document.getElementById('gameButtons');
  buttonTable.style.width = Maze.MAZE_WIDTH + 'px';

  // Fill-in hint bubble.
  var hint = document.getElementById('hint');
  hint.innerHTML = msg[level.instructions]();

  if (skin.background) {
    var tile = document.createElementNS(Blockly.SVG_NS, 'image');
    tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                        skin.background);
    tile.setAttribute('height', Maze.MAZE_HEIGHT);
    tile.setAttribute('width', Maze.MAZE_WIDTH);
    tile.setAttribute('x', 0);
    tile.setAttribute('y', 0);
    svg.appendChild(tile);
  }

  if (skin.graph) {
    // Draw the grid lines.
    // The grid lines are offset so that the lines pass through the centre of
    // each square.  A half-pixel offset is also added to as standard SVG
    // practice to avoid blurriness.
    var offset = Maze.SQUARE_SIZE / 2 + 0.5;
    for (var k = 0; k < Maze.ROWS; k++) {
      var h_line = document.createElementNS(Blockly.SVG_NS, 'line');
      h_line.setAttribute('y1', k * Maze.SQUARE_SIZE + offset);
      h_line.setAttribute('x2', Maze.MAZE_WIDTH);
      h_line.setAttribute('y2', k * Maze.SQUARE_SIZE + offset);
      h_line.setAttribute('stroke', skin.graph);
      h_line.setAttribute('stroke-width', 1);
      svg.appendChild(h_line);
    }
    for (var k = 0; k < Maze.COLS; k++) {
      var v_line = document.createElementNS(Blockly.SVG_NS, 'line');
      v_line.setAttribute('x1', k * Maze.SQUARE_SIZE + offset);
      v_line.setAttribute('x2', k * Maze.SQUARE_SIZE + offset);
      v_line.setAttribute('y2', Maze.MAZE_HEIGHT);
      v_line.setAttribute('stroke', skin.graph);
      v_line.setAttribute('stroke-width', 1);
      svg.appendChild(v_line);
    }
  }

  // Draw the tiles making up the maze map.

  // Return a value of '0' if the specified square is wall, obstacle or out of
  // bounds, '1' otherwise (empty, start, finish).
  var normalize = function(x, y) {
    return ((Maze.map[y] === undefined) ||
            (Maze.map[y][x] === undefined) ||
            (Maze.map[y][x] == Maze.SquareType.WALL) ||
            (Maze.map[y][x] == Maze.SquareType.OBSTACLE)) ? '0' : '1';
  };

  // Compute and draw the tile for each square.
  var tileId = 0;
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      // Compute the tile index.
      var tile = normalize(x, y) +
          normalize(x, y - 1) +  // North.
          normalize(x + 1, y) +  // West.
          normalize(x, y + 1) +  // South.
          normalize(x - 1, y);   // East.

      // Draw the tile.
      if (!Maze.tile_SHAPES[tile]) {
        // Empty square.  Use null0 for large areas, with null1-4 for borders.
        if (tile == '00000' && Math.random() > 0.3) {
          tile = 'null0';
        } else {
          tile = 'null' + Math.floor(1 + Math.random() * 4);
        }
      }
      var left = Maze.tile_SHAPES[tile][0];
      var top = Maze.tile_SHAPES[tile][1];
      // Tile's clipPath element.
      var tileClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
      tileClip.setAttribute('id', 'tileClipPath' + tileId);
      var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
      clipRect.setAttribute('width', Maze.SQUARE_SIZE);
      clipRect.setAttribute('height', Maze.SQUARE_SIZE);

      clipRect.setAttribute('x', x * Maze.SQUARE_SIZE);
      clipRect.setAttribute('y', y * Maze.SQUARE_SIZE);

      tileClip.appendChild(clipRect);
      svg.appendChild(tileClip);
      // Tile sprite.
      var tile = document.createElementNS(Blockly.SVG_NS, 'image');
      tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                          skin.tiles);
      tile.setAttribute('height', Maze.SQUARE_SIZE * 4);
      tile.setAttribute('width', Maze.SQUARE_SIZE * 5);
      tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
      tile.setAttribute('x', (x - left) * Maze.SQUARE_SIZE);
      tile.setAttribute('y', (y - top) * Maze.SQUARE_SIZE);
      svg.appendChild(tile);
      tileId++;
    }
  }

  // Pegman's clipPath element, whose (x, y) is reset by Maze.displayPegman
  var pegmanClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
  pegmanClip.setAttribute('id', 'pegmanClipPath');
  var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
  clipRect.setAttribute('id', 'clipRect');
  clipRect.setAttribute('width', Maze.PEGMAN_WIDTH);
  clipRect.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanClip.appendChild(clipRect);
  svg.appendChild(pegmanClip);

  // Add pegman.
  var pegmanIcon = document.createElementNS(Blockly.SVG_NS, 'image');
  pegmanIcon.setAttribute('id', 'pegman');
  pegmanIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                            skin.avatar);
  pegmanIcon.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanIcon.setAttribute('width', Maze.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
  pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
  svg.appendChild(pegmanIcon);

  // Add obstacles.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.map[y][x] == Maze.SquareType.OBSTACLE) {
        var obsIcon = document.createElementNS(Blockly.SVG_NS, 'image');
        obsIcon.setAttribute('height', 40);
        obsIcon.setAttribute('width', 40);
        obsIcon.setAttributeNS(
          'http://www.w3.org/1999/xlink', 'xlink:href',
          skin.obstacle);
        obsIcon.setAttribute('x',
                             Maze.SQUARE_SIZE * (x + 0.5) -
                             obsIcon.getAttribute('width') / 2);
        obsIcon.setAttribute('y',
                             Maze.SQUARE_SIZE * (y + 0.6) -
                             obsIcon.getAttribute('height'));
        svg.appendChild(obsIcon);
      }
    }
  }
};

/**
 * Initialize Blockly and the maze.  Called on page load.
 */
Maze.init = function(config) {
  if (config == null) {
    config = {};
  }
  BlocklyApps.init(config);

  var rtl = BlocklyApps.isRtl();
  var toolbox = document.getElementById('toolbox');

  /**
   * The richness of block colours, regardless of the hue.
   * MOOC blocks should be brighter (target audience is younger).
   * Must be in the range of 0 (inclusive) to 1 (exclusive).
   * Blockly's default is 0.45.
   */
  Blockly.HSV_SATURATION = 0.6;

  Blockly.inject(document.getElementById('blockly'),
      {path: BlocklyApps.BASE_URL,
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});
  Blockly.loadAudio_(['maze/win.mp3', 'maze/win.ogg'], 'win');
  Blockly.loadAudio_(['maze/whack.mp3', 'maze/whack.ogg'], 'whack');
  Blockly.SNAP_RADIUS *= Maze.scale.snapRadius;

  Maze.drawMap();

  window.addEventListener('scroll', function() {
      BlocklyApps.onResize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', BlocklyApps.onResize);
  BlocklyApps.onResize();
  Blockly.svgResize();

  // Locate the start and finish squares.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.map[y][x] == Maze.SquareType.START) {
        Maze.start_ = {x: x, y: y};
      } else if (Maze.map[y][x] == Maze.SquareType.FINISH) {
        Maze.finish_ = {x: x, y: y};
      // Nan's
      } else if (Maze.map[y][x] == Maze.SquareType.STARTANDFINISH) {
        Maze.start_ = {x: x, y: y};
        Maze.finish_ = {x: x, y: y};
      }
    }
  }

  // Init the balls so that all places are empty
  Maze.balls_ = new Array(Maze.ROWS);
  // Locate the balls in ball_map
  for (var y = 0; y < Maze.ROWS; y++) {
    Maze.balls_[y] = Maze.initialBallMap[y].slice(0);
  }

  var xml = '<xml>' + level.startBlocks + '</xml>';
  BlocklyApps.loadBlocks(xml);

  BlocklyApps.reset(true);
  Blockly.addChangeListener(function() {BlocklyApps.updateCapacity()});

  var interstitial = BlocklyApps.INTERSTITIALS.before;
  if (interstitial) {
    BlocklyApps.showHelp(false, undefined);
  } else {
    document.getElementById('helpButton').setAttribute('disabled', 'disabled');
  }
};

/**
 * Reset the maze to the start position and kill any pending animation tasks.
 * @param {boolean} first True if an opening animation is to be played.
 */
BlocklyApps.reset = function(first) {
  // Kill all tasks.
  for (var x = 0; x < Maze.pidList.length; x++) {
    window.clearTimeout(Maze.pidList[x]);
  }
  Maze.pidList = [];

  // Move Pegman into position.
  Maze.pegmanX = Maze.start_.x;
  Maze.pegmanY = Maze.start_.y;

  if (first) {
    Maze.pegmanD = Maze.startDirection + 1;
    Maze.scheduleFinish(false);
    Maze.pidList.push(window.setTimeout(function() {
      stepSpeed = 100;
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD++;
    }, stepSpeed * 5));
  } else {
    Maze.pegmanD = Maze.startDirection;
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4);
  }

  // Make 'look' icon invisible and promote to top.
  var lookIcon = document.getElementById('look');
  lookIcon.style.display = 'none';
  lookIcon.parentNode.appendChild(lookIcon);
  var paths = lookIcon.getElementsByTagName('path');
  for (var i = 0, path; path = paths[i]; i++) {
    path.setAttribute('stroke', skin.look);
  }

  // Nan's
  // Move the init ball marker icons into position.
  var ballId = 0;
  var svg = document.getElementById('svgMaze');
  var pegmanIcon = document.getElementById('pegman');
  for (var y = 0; y < Maze.ROWS; y++) {
    // Reset current ball map with initial.
    Maze.balls_[y] = Maze.initialBallMap[y].slice(0);
    for (var x = 0; x < Maze.COLS; x++) {
      // Remove all balls from svg element, less efficient than checking if we
      // need to remove, but much easier to code.
      var ballIcon = document.getElementById('ball' + ballId);
      if (ballIcon !== null) {
        svg.removeChild(ballIcon);
      }
      // Place ball if one exists in cell.
      if (Maze.balls_[y][x] !== 0 && Maze.balls_[y][x] !== undefined) {
        ballIcon = document.createElementNS(Blockly.SVG_NS, 'image');
        ballIcon.setAttribute('id', 'ball' + ballId);
        Maze.setBallImage(ballIcon, x, y);
        ballIcon.setAttribute('height', 50);
        ballIcon.setAttribute('width', 42);
        svg.insertBefore(ballIcon, pegmanIcon);
        ballIcon.setAttribute('x',
            Maze.SQUARE_SIZE * (x + 0.5) - ballIcon.getAttribute('width') / 2);
        ballIcon.setAttribute('y',
            Maze.SQUARE_SIZE * (y + 0.6) - ballIcon.getAttribute('height'));
      }
      ++ballId;
    }
  }
};

/**
 * Click the run button.  Start the program.
 */
Maze.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  Blockly.mainWorkspace.traceOn(true);
  BlocklyApps.reset(false);
  Maze.execute();
};

/**
 * Outcomes of running the user program.
 */
Maze.ResultType = {
  UNSET: 0,
  SUCCESS: 1,
  FAILURE: -1,
  TIMEOUT: 2,
  ERROR: -2
};

var displayFeedback = function() {
  BlocklyApps.displayFeedback({
    app: 'karel',
    skin: skin.id,
    feedbackType: Maze.testResults,
    finalLevel: false //TODO: Get from server or otherwise parameterize
  });
};

/**
 * Execute the user's code.  Heaven help us...
 */
Maze.execute = function() {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000;
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Maze.result = Maze.ResultType.UNSET;
  Maze.testResults = BlocklyApps.TestResults.NO_TESTS_RUN;

  // Check for empty top level blocks to warn user about bugs,
  // especially ones that lead to infinite loops.
  if (BlocklyApps.hasEmptyTopLevelBlocks()) {
    Maze.testResults = BlocklyApps.TestResults.EMPTY_BLOCK_FAIL;
    displayFeedback();
    return;
  }

  // Try running the user's code.  There are four possible outcomes:
  // 1. If pegman reaches the finish [SUCCESS], true is thrown.
  // 2. If the program is terminated due to running too long [TIMEOUT],
  //    false is thrown.
  // 3. If another error occurs [ERROR], that error is thrown.
  // 4. If the program ended normally but without solving the maze [FAILURE],
  //    no error or exception is thrown.
  try {
    eval(code);
    Maze.result = Maze.ResultType.FAILURE;
  } catch (e) {
    // A boolean is thrown for normal termination.
    // Abnormal termination is a user error.
    if (e === Infinity) {
      Maze.result = Maze.ResultType.TIMEOUT;
    } else if (e === true) {
      Maze.result = Maze.ResultType.SUCCESS;
    } else if (e === false) {
      Maze.result = Maze.ResultType.ERROR;
    } else {
      // Syntax error, can't happen.
      Maze.result = Maze.ResultType.ERROR;
      alert(e);
    }
  }
  
  // If we know they succeeded, mark levelComplete true
  // Note that we have not yet animated the succesful run
  BlocklyApps.levelComplete = (Maze.result == Maze.ResultType.SUCCESS);
  
  Maze.testResults = BlocklyApps.getTestResults();

  // Report result to server.
  BlocklyApps.report('maze', levelId,
      Maze.result === Maze.ResultType.SUCCESS, BlocklyApps.stripCode(code));

  // Fast animation if execution is successful.  Slow otherwise.
  stepSpeed = (Maze.result == Maze.ResultType.SUCCESS) ? 100 : 150;

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the maze and animate the transcript.
  BlocklyApps.reset(false);
  Maze.pidList.push(window.setTimeout(Maze.animate, 100));
};

/**
 * Iterate through the recorded path and animate pegman's actions.
 */
Maze.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Maze.pidList = [];

  var action = BlocklyApps.log.shift();
  if (!action) {
    BlocklyApps.highlight(null);
    if (Maze.result == Maze.ResultType.TIMEOUT) {
      displayFeedback();
    } else {
      window.setTimeout(function() {
        displayFeedback();
      }, 1000);
    }
    return;
  }
  BlocklyApps.highlight(action[1]);

  switch (action[0]) {
    case 'north':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY - 1, Maze.pegmanD * 4]);
      Maze.pegmanY--;
      break;
    case 'east':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX + 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX++;
      break;
    case 'south':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY + 1, Maze.pegmanD * 4]);
      Maze.pegmanY++;
      break;
    case 'west':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX - 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX--;
      break;
    case 'look_north':
      Maze.scheduleLook(Direction.NORTH);
      break;
    case 'look_east':
      Maze.scheduleLook(Direction.EAST);
      break;
    case 'look_south':
      Maze.scheduleLook(Direction.SOUTH);
      break;
    case 'look_west':
      Maze.scheduleLook(Direction.WEST);
      break;
    case 'fail_forward':
      Maze.scheduleFail(true);
      break;
    case 'fail_backward':
      Maze.scheduleFail(false);
      break;
    case 'left':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD - 1);
      break;
    case 'right':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 + 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD + 1);
      break;
    case 'finish':
      // Only schedule victory animation for certain conditions:
      switch (Maze.testResults) {
        case BlocklyApps.TestResults.FREE_PLAY:
        case BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL:
        case BlocklyApps.TestResults.ALL_PASS:
          Maze.scheduleFinish(true);
          break;
        default:
          break;
      }
      // window.setTimeout(Maze.giveFeedback, 1000);
      break;
    // Nan's
    case 'putdown':
      Maze.schedulePutDownBall();
      break;
    case 'pickup':
      Maze.schedulePickUpBall();
      break;
  }

  // Speeding up specific levels
  var scaledStepSpeed = stepSpeed * Maze.scale.stepSpeed;
  Maze.pidList.push(window.setTimeout(Maze.animate, scaledStepSpeed));
};

/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Maze.schedule = function(startPos, endPos) {
  var deltas = [(endPos[0] - startPos[0]) / 4,
                (endPos[1] - startPos[1]) / 4,
                (endPos[2] - startPos[2]) / 4];
  Maze.displayPegman(startPos[0] + deltas[0],
                     startPos[1] + deltas[1],
                     Maze.constrainDirection16(startPos[2] + deltas[2]));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 2,
          startPos[1] + deltas[1] * 2,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 3,
          startPos[1] + deltas[1] * 3,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(endPos[0], endPos[1],
          Maze.constrainDirection16(endPos[2]));
    }, stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Maze.scheduleFail = function(forward) {
  var deltaX = 0;
  var deltaY = 0;
  switch (Maze.pegmanD) {
    case Direction.NORTH:
      deltaY = -0.25;
      break;
    case Direction.EAST:
      deltaX = 0.25;
      break;
    case Direction.SOUTH:
      deltaY = 0.25;
      break;
    case Direction.WEST:
      deltaX = -0.25;
      break;
  }
  if (!forward) {
    deltaX = -deltaX;
    deltaY = -deltaY;
  }
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX + deltaX,
                     Maze.pegmanY + deltaY,
                     direction16);
  Blockly.playAudio('whack', .5);
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX,
                       Maze.pegmanY,
                       direction16);
    }, stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX + deltaX,
                       Maze.pegmanY + deltaY,
                       direction16);
    Blockly.playAudio('whack', .5);
  }, stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, stepSpeed * 3));
};

/**
 * Schedule the animations and sound for a victory dance.
 * @param {boolean} sound Play the victory sound.
 */
Maze.scheduleFinish = function(sound) {
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
  if (sound) {
    Blockly.playAudio('win', .5);
  }
  stepSpeed = 150;  // Slow down victory animation a bit.
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 18);
    }, stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
    }, stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, stepSpeed * 3));
};

/**
 * Display Pegman at a the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 */
Maze.displayPegman = function(x, y, d) {
  var pegmanIcon = document.getElementById('pegman');
  pegmanIcon.setAttribute('x',
      x * Maze.SQUARE_SIZE - d * Maze.PEGMAN_WIDTH + 1);
  pegmanIcon.setAttribute('y',
      Maze.SQUARE_SIZE * (y + 0.5) - Maze.PEGMAN_HEIGHT / 2 - 8);

  var clipRect = document.getElementById('clipRect');
  clipRect.setAttribute('x', x * Maze.SQUARE_SIZE + 1);
  clipRect.setAttribute('y', pegmanIcon.getAttribute('y'));
};

/**
 * Schedule to put down a ball at pegman's current position.
 */
Maze.schedulePutDownBall = function() {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  var ballId = x + Maze.COLS * y;
  var ballIcon;
  var pegmanIcon = document.getElementById('pegman');
  if (Maze.balls_[y][x] < -1 || Maze.balls_[y][x] > 0) {
    // There is already a ball at the position
    ballIcon = document.getElementById('ball' + ballId);
    ++Maze.balls_[y][x];
    Maze.setBallImage(ballIcon, x, y);
    ballIcon.setAttribute('x', Maze.SQUARE_SIZE * (x + 0.5) -
                          ballIcon.getAttribute('width') / 2);
    ballIcon.setAttribute('y', Maze.SQUARE_SIZE * (y + 0.6) -
                          ballIcon.getAttribute('height'));
  } else if (Maze.balls_[y][x] == 0) {
    // If not, create a new ballIcon for the current location
    var svg = document.getElementById('svgMaze');
    ballIcon = document.createElementNS(Blockly.SVG_NS, 'image');
    ballIcon.setAttribute('id', 'ball' + ballId);
    ballIcon.setAttribute('height', 50);
    ballIcon.setAttribute('width', 42);
    svg.insertBefore(ballIcon, pegmanIcon);

    ++Maze.balls_[y][x];
    Maze.setBallImage(ballIcon, x, y);
    ballIcon.setAttribute('x', Maze.SQUARE_SIZE * (x + 0.5) -
                          ballIcon.getAttribute('width') / 2);
    ballIcon.setAttribute('y', Maze.SQUARE_SIZE * (y + 0.6) -
                          ballIcon.getAttribute('height'));
  } else if (Maze.balls_[y][x] == -1) {
    // Remove the ballIcon
    ballIcon = document.getElementById('ball' + ballId);
    var svg = document.getElementById('svgMaze');
    svg.removeChild(ballIcon);
     ++Maze.balls_[y][x];
  }
};

/**
 * Set the image based on the number of balls in the location.
 * @param ballIcon Ball icon that shows the number of balls at location [y,x].
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 */
Maze.setBallImage = function(ballIcon, x, y) {
  ballIcon.setAttributeNS(
    'http://www.w3.org/1999/xlink', 'xlink:href',
    skin.ball(Maze.balls_[y][x]))
};

/**
 * Schedule to put down a bll at pegman's current location.
 */
Maze.schedulePickUpBall = function() {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  var ballId = x + Maze.COLS * y;
  var ballIcon;
  var pegmanIcon = document.getElementById('pegman');
  if (Maze.balls_[y][x] > 1 || Maze.balls_[y][x] < 0) {
    // The ballIcon should still exist after picking up a ball
    Maze.balls_[y][x] = Maze.balls_[y][x] - 1;
    ballIcon = document.getElementById('ball' + ballId);
    Maze.setBallImage(ballIcon, x, y);
  } else if (Maze.balls_[y][x] == 0) {
    // Create ballIcon
    Maze.balls_[y][x] = Maze.balls_[y][x] - 1;
    var svg = document.getElementById('svgMaze');
    ballIcon = document.createElementNS(Blockly.SVG_NS, 'image');
    ballIcon.setAttribute('id', 'ball' + ballId);
    ballIcon.setAttribute('height', 50);
    ballIcon.setAttribute('width', 42);
    svg.insertBefore(ballIcon, pegmanIcon);

    Maze.setBallImage(ballIcon, x, y);
    ballIcon.setAttribute('x', Maze.SQUARE_SIZE * (x + 0.5) -
                          ballIcon.getAttribute('width') / 2);
    ballIcon.setAttribute('y', Maze.SQUARE_SIZE * (y + 0.6) -
                          ballIcon.getAttribute('height'));
  } else if (Maze.balls_[y][x] == 1) {
    // Need to remove this ballIcon
    ballIcon = document.getElementById('ball' + ballId);
    var svg = document.getElementById('svgMaze');
    svg.removeChild(ballIcon);
    Maze.balls_[y][x] = Maze.balls_[y][x] - 1;
  }
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Direction} d Direction (0 - 3).
 */
Maze.scheduleLook = function(d) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  switch (d) {
    case Direction.NORTH:
      x += 0.5;
      break;
    case Direction.EAST:
      x += 1;
      y += 0.5;
      break;
    case Direction.SOUTH:
      x += 0.5;
      y += 1;
      break;
    case Direction.WEST:
      y += 0.5;
      break;
  }
  x *= Maze.SQUARE_SIZE;
  y *= Maze.SQUARE_SIZE;
  d = d * 90 - 45;

  var lookIcon = document.getElementById('look');
  lookIcon.setAttribute('transform',
      'translate(' + x + ', ' + y + ') ' +
      'rotate(' + d + ' 0 0) scale(.4)');
  var paths = lookIcon.getElementsByTagName('path');
  lookIcon.style.display = 'inline';
  for (var x = 0, path; path = paths[x]; x++) {
    Maze.scheduleLookStep(path, stepSpeed * x);
  }
};

/**
 * Schedule one of the 'look' icon's waves to appear, then disappear.
 * @param {!Element} path Element to make appear.
 * @param {number} delay Milliseconds to wait before making wave appear.
 */
Maze.scheduleLookStep = function(path, delay) {
  Maze.pidList.push(window.setTimeout(function() {
    path.style.display = 'inline';
    window.setTimeout(function() {
      path.style.display = 'none';
    }, stepSpeed * 2);
  }, delay));
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection4 = function(d) {
  if (d < 0) {
    d += 4;
  } else if (d > 3) {
    d -= 4;
  }
  return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection16 = function(d) {
  if (d < 0) {
    d += 16;
  } else if (d > 15) {
    d -= 16;
  }
  return d;
};

// API
// Human-readable aliases.

Maze.moveForward = function(id) {
  Maze.move(0, id);
};

Maze.moveBackward = function(id) {
  Maze.move(2, id);
};

Maze.turnLeft = function(id) {
  Maze.turn(0, id);
};

Maze.turnRight = function(id) {
  Maze.turn(1, id);
};

Maze.isPathForward = function(id) {
  return Maze.isPath(0, id);
};
Maze.noPathForward = function(id) {
  return !Maze.isPath(0, id);
};

Maze.isPathRight = function(id) {
  return Maze.isPath(1, id);
};

Maze.isPathBackward = function(id) {
  return Maze.isPath(2, id);
};

Maze.isPathLeft = function(id) {
  return Maze.isPath(3, id);
};
Maze.ballsPresent = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  if (Maze.balls_[y][x] > 0)
    return true;
  else
    return false;
};
Maze.holesPresent = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  if (Maze.balls_[y][x] < 0)
    return true;
  else
    return false;
};
Maze.currentPositionNotClear = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  if (Maze.balls_[y][x] != 0)
    return true;
  else
    return false;
};
// Core functions.

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Maze.move = function(direction, id) {
  if (!Maze.isPath(direction, null)) {
    BlocklyApps.log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
    throw false;
  }
  // If moving backward, flip the effective direction.
  var effectiveDirection = Maze.pegmanD + direction;
  var command;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Direction.NORTH:
      Maze.pegmanY--;
      command = 'north';
      break;
    case Direction.EAST:
      Maze.pegmanX++;
      command = 'east';
      break;
    case Direction.SOUTH:
      Maze.pegmanY++;
      command = 'south';
      break;
    case Direction.WEST:
      Maze.pegmanX--;
      command = 'west';
      break;
  }
  BlocklyApps.log.push([command, id]);
  // Nan's
  // Maze.checkSuccess(id);
};

// Nan's
Maze.checkSuccess = function(id) {
  // if (Maze.pegmanX == Maze.finish_.x && Maze.pegmanY == Maze.finish_.y) {
    // Nan's
    // Check to see whether the number of balls is the same as the target
    var succeed = true;
    for (var y = 0; y < Maze.ROWS; y++) {
      for (var x = 0; x < Maze.COLS; x++) {
        if (Maze.balls_[y][x] != Maze.finalBallMap[y][x]) {
            succeed = false;
            break;
        }
      }
    }
    if (succeed) {
        // Finished.  Terminate the user's program.
        BlocklyApps.log.push(['finish', null]);
        throw true;
    }
  // }

    // Nan's testing code for showing the corresponding xml
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var text = Blockly.Xml.domToText(xml);
}

Maze.notFinish = function(id) {
    return !Maze.checkSuccess(id);
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Maze.turn = function(direction, id) {
  if (direction) {
    // Right turn (clockwise).
    Maze.pegmanD++;
    BlocklyApps.log.push(['right', id]);
  } else {
    // Left turn (counterclockwise).
    Maze.pegmanD--;
    BlocklyApps.log.push(['left', id]);
  }
  Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Maze.move().
 * @return {boolean} True if there is a path.
 */
Maze.isPath = function(direction, id) {
  var effectiveDirection = Maze.pegmanD + direction;
  var square;
  var command;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Direction.NORTH:
      square = Maze.map[Maze.pegmanY - 1] &&
          Maze.map[Maze.pegmanY - 1][Maze.pegmanX];
      command = 'look_north';
      break;
    case Direction.EAST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX + 1];
      command = 'look_east';
      break;
    case Direction.SOUTH:
      square = Maze.map[Maze.pegmanY + 1] &&
          Maze.map[Maze.pegmanY + 1][Maze.pegmanX];
      command = 'look_south';
      break;
    case Direction.WEST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX - 1];
      command = 'look_west';
      break;
  }
  if (id) {
    BlocklyApps.log.push([command, id]);
  }
  return square !== Maze.SquareType.WALL && square !== undefined;
};

/**
 * Attempt to put down the ball marker.
 * @param {string} id ID of block that triggered this action.
 */
Maze.putDownBall = function(id) {
    BlocklyApps.log.push(['putdown', id]);
    var x = Maze.pegmanX;
    var y = Maze.pegmanY;
    Maze.balls_[y][x] = Maze.balls_[y][x] + 1;
    Maze.checkSuccess(id);
};

/**
 * Attempt to pick up the ball marker.
 * @param {string} id ID of block that triggered this action.
 */
Maze.pickUpBall = function(id) {
    BlocklyApps.log.push(['pickup', id]);
    var x = Maze.pegmanX;
    var y = Maze.pegmanY;
    Maze.balls_[y][x] = Maze.balls_[y][x] - 1;
    Maze.checkSuccess(id);
};
