var Direction = require('../tiles').Direction;

//TODO: Fix hacky level-number-dependent toolbox.
var toolbox = function(page, level) {
  return karelpage.toolbox({}, null, {
    page: page,
    level: level
  });
};

//TODO: Fix hacky level-number-dependent startBlocks.
var startBlocks = function(page, level) {
  return karelpage.startBlocks({}, null, {
    page: page,
    level: level
  });
};

// This tests for and creates the "move_forward" block.
var MOVE_FORWARD = {
    'test': function(block) {
      return block.type == 'maze_moveForward';},
    'type': 'maze_moveForward'
};

// This tests for and creates the "pickUpBall" block.
var PICK_UP_BALL = {'test': 'pickUpBall', 'type': 'maze_pickUpBall'};

// This tests for and creates the "putDownBall" block.
var PUT_DOWN_BALL = {'test': 'putDownBall', 'type': 'maze_putDownBall'};

// This tests for and creates the "controls_repeat" block.
var REPEAT = {
    'test': function(block) {
      return block.type == 'controls_repeat';},
    'type': 'controls_repeat'
};

// This tests for and creates the "maze_turn" block turning left.
var TURN_LEFT = {
  'test': 'turnLeft',
  'type': 'maze_turn',
  'titles': {'DIR': 'turnLeft'}
};

// This tests for and creates the "maze_turn" block turning right.
var TURN_RIGHT = {
  'test': 'turnRight',
  'type': 'maze_turn',
  'titles': {'DIR': 'turnRight'}
};

// This tests for and creates the "maze_untilBlocked" block.
var UNTIL_BLOCKED = {
  'test': 'while (Maze.isPathForward',
  'type': 'maze_untilBlocked'
};

// This tests for and creates the "maze_untilBlockedOrNotClear" block with the option "ballsPresent" selected.
var WHILE_OPT_BALLS_PRESENT = {
  'test': 'while (Maze.ballsPresent',
  'type': 'maze_untilBlockedOrNotClear',
  'titles': {'DIR': 'ballsPresent'}
};

// This tests for and creates the "maze_untilBlockedOrNotClear" block with the option "isPathForward" selected.
var WHILE_OPT_PATH_AHEAD = {
  'test': 'while (Maze.isPathForward',
  'type': 'maze_untilBlockedOrNotClear',
  'titles': {'DIR': 'isPathForward'}
};

// This tests for and creates the "karel_if" block.
var IF = {'test': 'if', 'type': 'karel_if'};

// This tests for and creates the "karel_if" block with the option "ballsPresent" selected.
var IF_OPT_BALLS_PRESENT = {
  'test': 'if (Maze.ballsPresent',
  'type': 'karel_if',
  'titles': {'DIR': 'ballsPresent'}
};

// This tests for and creates the "karel_if" block with the option "holesPresent" selected.
var IF_OPT_HOLES_PRESENT = {
  'test': 'if (Maze.holesPresent',
  'type': 'karel_if',
  'titles': {'DIR': 'holesPresent'}
};

// This tests for and creates the "karel_ifElse" block.
var IF_ELSE = {'test': '} else {', 'type': 'karel_ifElse'};

// This tests for and creates the "fill num" blcok.
var fill = function(num) {
  return {'test': 'fill_' + num + '();',
          'type': 'procedures_callnoreturn',
          'titles': {'NAME': 'fill ' + num}};
};

// This tests for and creates the "remove num" blcok.
var remove = function(num) {
  return {'test': 'remove_' + num + '();',
          'type': 'procedures_callnoreturn',
          'titles': {'NAME': 'remove ' + num}};
};

// This tests for and creates the "avoid the cow and remove 1" blcok.
var AVOID_OBSTACLE_AND_REMOVE = {
  'test': 'avoid_the_cow_and_remove_1();',
  'type': 'procedures_callnoreturn',
  'titles': {'NAME': 'avoid the cow and remove 1'}
};

// This tests for and creates the "remove 1 and avoid the cow" blcok.
var AVOID_OBSTACLE_AND_REMOVE = {
  'test': 'remove_1_and_avoid_the_cow();',
  'type': 'procedures_callnoreturn',
  'titles': {'NAME': 'avoid the cow and remove 1'}
};

// This tests for and creates the "remove piles" block.
var REMOVE_PILES = {
  'test': 'remove_piles();',
  'type': 'procedures_callnoreturn',
  'titles': {'NAME': 'remove piles'}
};

// This tests for and creates the "fill holes" block.
var FILL_HOLES = {
  'test': 'fill_holes();',
  'type': 'procedures_callnoreturn',
  'titles': {'NAME': 'fill holes'}
};

module.exports = {

  // Formerly page 1
  '1_1': {
    'instructions': 'instructions1_1',
    'toolbox': toolbox(1, 1),
    'startBlocks': startBlocks(1, 1),
    'ideal': 5,
    'requiredBlocks': [
      [MOVE_FORWARD], [PICK_UP_BALL]
    ],
    'scale': {
      'snapRadius': 2.0
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_2': {
    'instructions': 'instructions1_2',
    'toolbox': toolbox(1, 2),
    'startBlocks': startBlocks(1, 2),
    'ideal': 3,
    'requiredBlocks': [
      [MOVE_FORWARD], [PUT_DOWN_BALL]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 2, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, -2, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_3': {
    'instructions': 'instructions1_3',
    'toolbox': toolbox(1, 3),
    'startBlocks': startBlocks(1, 3),
    'ideal': 3,
    'requiredBlocks': [
      [MOVE_FORWARD], [PICK_UP_BALL], [REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 2, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 10, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_4': {
    'instructions': 'instructions1_4',
    'toolbox': toolbox(1, 4),
    'startBlocks': startBlocks(1, 4),
    'ideal': 4,
    'requiredBlocks': [
      [MOVE_FORWARD], [PICK_UP_BALL], [TURN_LEFT], [REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 2, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_5': {
    'instructions': 'instructions1_5',
    'toolbox': toolbox(1, 5),
    'startBlocks': startBlocks(1, 5),
    'ideal': 5,
    'requiredBlocks': [
      [MOVE_FORWARD], [PUT_DOWN_BALL], [REPEAT], [UNTIL_BLOCKED]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 0, 0 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, -5, -5, -5, -5, -5, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_6': {
    'instructions': 'instructions1_6',
    'toolbox': toolbox(1, 6),
    'startBlocks': startBlocks(1, 6),
    'ideal': 3,
    'requiredBlocks': [
      [MOVE_FORWARD],
      [PICK_UP_BALL],
      [WHILE_OPT_BALLS_PRESENT, REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 1, 1, 1, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_7': {
    'instructions': 'instructions1_7',
    'toolbox': toolbox(1, 7),
    'startBlocks': startBlocks(1, 7),
    'ideal': 4,
    'requiredBlocks': [
      [TURN_RIGHT],
      [MOVE_FORWARD],
      [PUT_DOWN_BALL],
      [WHILE_OPT_BALLS_PRESENT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 2, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, -12, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_8': {
    'instructions': 'instructions1_8',
    'toolbox': toolbox(1, 8),
    'startBlocks': startBlocks(1, 8),
    'ideal': 3,
    'requiredBlocks': [
      [MOVE_FORWARD],
      [PUT_DOWN_BALL],
      [WHILE_OPT_PATH_AHEAD, REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, -1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_9': {
    'instructions': 'instructions1_9',
    'toolbox': toolbox(1, 9),
    'startBlocks': startBlocks(1, 9),
    'ideal': 9,
    'requiredBlocks': [
      [MOVE_FORWARD],
      [PICK_UP_BALL],
      [WHILE_OPT_PATH_AHEAD, REPEAT],
      [TURN_LEFT]
    ],
    'map': [
      [ 0, 0, 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 1, 1, 1, 1, 3, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 0, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 1, 1, 1, 1, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_10': {
    'instructions': 'instructions1_10',
    'toolbox': toolbox(1, 10),
    'startBlocks': startBlocks(1, 10),
    'ideal': 4,
    'requiredBlocks': [
      [MOVE_FORWARD],
      [PICK_UP_BALL],
      [IF_OPT_BALLS_PRESENT],
      [UNTIL_BLOCKED, REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 1, 0, 0, 1, 1, 0, 1 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '1_11': {
    'instructions': 'instructions1_11',
    'toolbox': toolbox(1, 11),
    'startBlocks': startBlocks(1, 11),
    'ideal': 6,
    'requiredBlocks': [
      [MOVE_FORWARD],
      [PICK_UP_BALL],
      [PUT_DOWN_BALL],
      [IF_OPT_BALLS_PRESENT],
      [IF_OPT_HOLES_PRESENT],
      [UNTIL_BLOCKED, REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 3, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, -1, 0, 0, -1, 1, 1, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  // Formerly page 2

  '2_1': {
    'instructions': 'instructions2_1',
    'toolbox': toolbox(2, 1),
    'startBlocks': startBlocks(2, 1),
    'ideal': null,
    'requiredBlocks': [
      [TURN_LEFT], [MOVE_FORWARD], [PICK_UP_BALL], [TURN_RIGHT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 0, 0, 0, 0 ],
      [ 1, -1, 1, 0, 0, 0, 0, 0 ],
      [ 1, -1, 1, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_2': {
    'instructions': 'instructions2_2',
    'toolbox': toolbox(2, 2),
    'startBlocks': startBlocks(2, 2),
    'ideal': 5,
    'requiredBlocks': [
      [MOVE_FORWARD], [fill(5)]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 3, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, -5, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_3': {
    'instructions': 'instructions2_3',
    'toolbox': toolbox(2, 3),
    'startBlocks': startBlocks(2, 3),
    'ideal': 7,
    'requiredBlocks': [
      [MOVE_FORWARD], [fill(5)], [UNTIL_BLOCKED, REPEAT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 0, 0 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, -5, -5, -5, -5, -5, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_4': {
    'instructions': 'instructions2_4',
    'toolbox': toolbox(2, 4),
    'startBlocks': startBlocks(2, 4),
    'ideal': 12,
    'requiredBlocks': [
      [PICK_UP_BALL],
      [REPEAT],
      [remove(7)],
      [MOVE_FORWARD],
      [TURN_LEFT],
      [TURN_RIGHT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 7, 0, 0, 0, 0 ],
      [ 0, 0, 7, 0, 0, 0, 0, 0 ],
      [ 0, 7, 0, 0, 0, 0, 0, 0 ],
      [ 7, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_5': {
    'instructions': 'instructions2_5',
    'toolbox': toolbox(2, 5),
    'startBlocks': startBlocks(2, 5),
    'ideal': 8,
    'requiredBlocks': [
      [PICK_UP_BALL],
      [REPEAT],
      [remove(3)],
      [MOVE_FORWARD]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 3, 0, 3, 0, 3, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_6': {
    'instructions': 'instructions2_6',
    'toolbox': toolbox(2, 6),
    'startBlocks': startBlocks(2, 6),
    'ideal': 10,
    'requiredBlocks': [
      [remove(8)], [fill(8)], [MOVE_FORWARD], [UNTIL_BLOCKED, REPEAT]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 8, 0, 0, 0, 0, 0, 0, -8 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_7': {
    'instructions': 'instructions2_7',
    'toolbox': toolbox(2, 7),
    'startBlocks': startBlocks(2, 7),
    'ideal': 10,
    'requiredBlocks': [
      [TURN_LEFT], [MOVE_FORWARD], [TURN_RIGHT], [PICK_UP_BALL]
    ],
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 4, 3, 0, 0, 0, 0, 0 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 0, 0, 0, 0, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_8': {
    'instructions': 'instructions2_8',
    'toolbox': toolbox(2, 8),
    'startBlocks': startBlocks(2, 8),
    'ideal': 12,
    'requiredBlocks': [
      [REPEAT], [AVOID_OBSTACLE_AND_REMOVE]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 4, 1, 4, 1, 4, 1, 0 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 0, 1, 0, 1, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_9': {
    'instructions': 'instructions2_9',
    'toolbox': toolbox(2, 9),
    'startBlocks': startBlocks(2, 9),
    'ideal': 24,
    'requiredBlocks': [
      [REMOVE_PILES],
      [MOVE_FORWARD],
      [IF_OPT_BALLS_PRESENT],
      [UNTIL_BLOCKED, REPEAT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 1, 0, 1, 1, 0 ],
      [ 1, 0, 1, 1, 0, 1, 1, 0 ],
      [ 1, 0, 1, 1, 0, 1, 1, 0 ],
      [ 1, 0, 1, 1, 0, 1, 1, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_10': {
    'instructions': 'instructions2_10',
    'toolbox': toolbox(2, 10),
    'startBlocks': startBlocks(2, 10),
    'ideal': 26,
    'requiredBlocks': [
      [REMOVE_PILES],
      [MOVE_FORWARD],
      [FILL_HOLES],
      [IF_OPT_BALLS_PRESENT],
      [IF_OPT_HOLES_PRESENT],
      [UNTIL_BLOCKED, REPEAT]
    ],
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 0, 1, 0, 0 ],
      [ 1, 0, 1, 0, 0, 1, 0, 0 ],
      [ 1, -1, 1, -1, -1, 1, -1, 0 ],
      [ 1, -1, 1, -1, -1, 1, -1, 0 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  },

  '2_11': {
    'instructions': 'instructions2_11',
    'toolbox': toolbox(2, 11),
    'startBlocks': startBlocks(2, 11),
    'ideal': 15,
    'scale': {
      'stepSpeed': 3
    },
    'map': [
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 2, 4, 1, 1, 4, 1, 4, 1 ]
    ],
    'startDirection': Direction.EAST,
    'initialBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 1, 0, 1, 0, 1 ]
    ],
    'finalBalls': [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  }

};
