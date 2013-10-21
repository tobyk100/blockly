var tiles = require('./tiles');
var Direction = tiles.Direction;
var SquareType = tiles.SquareType;

//TODO: This file should be void of logic like turtle/api.js
// Mentions of `Maze.` is bad.

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Maze.move().
 * @return {boolean} True if there is a path.
 */
var isPath = function(direction, id) {
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
  return square !== SquareType.WALL &&
        square !== SquareType.OBSTACLE &&
        square !== undefined;
};

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
var move = function(direction, id) {
  if (!isPath(direction, null)) {
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
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
var turn = function(direction, id) {
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

exports.moveForward = function(id) {
  move(0, id);
};

exports.moveBackward = function(id) {
  move(2, id);
};

exports.turnLeft = function(id) {
  turn(0, id);
};

exports.turnRight = function(id) {
  turn(1, id);
};

exports.isPathForward = function(id) {
  return isPath(0, id);
};
exports.noPathForward = function(id) {
  return !isPath(0, id);
};

exports.isPathRight = function(id) {
  return isPath(1, id);
};

exports.isPathBackward = function(id) {
  return isPath(2, id);
};

exports.isPathLeft = function(id) {
  return isPath(3, id);
};

exports.pilePresent = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  return Maze.dirt_[y][x] > 0;
};

exports.holePresent = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  return Maze.dirt_[y][x] < 0;
};

exports.currentPositionNotClear = function(id) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  return Maze.dirt_[y][x] !== 0;
};

exports.fill = function(id) {
  BlocklyApps.log.push(['putdown', id]);
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  Maze.dirt_[y][x] = Maze.dirt_[y][x] + 1;
};

exports.dig = function(id) {
  BlocklyApps.log.push(['pickup', id]);
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  Maze.dirt_[y][x] = Maze.dirt_[y][x] - 1;
};

exports.notFinished = function() {
  return !Maze.checkSuccess();
};
