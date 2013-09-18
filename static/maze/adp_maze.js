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
 * @fileoverview JavaScript for Blockly's Maze's adaptive version.
 * @author nan@code.org (Nan Li)
 */
'use strict';

// The maze square constants defined above are inlined here
// for ease of reading and writing the static mazes.
Maze.map = [
// Level 0.
 undefined,
// Level 1.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 1a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 2.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 4, 1, 3, 0, 0, 0],
  [0, 0, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 2a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 4, 3, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 3.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 3a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0]],
// Level 4.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 2, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 4a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [2, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 5.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 5a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0]],
// Level 6.
/**
 *  Note, the path continues past the start and the goal in both directions.
 *  This is intentional so kids see the maze is about getting from the start
 *  to the finish and not necessarily about moving over every part of the maze,
 *  'mowing the lawn' as Neil calls it.
 */
 [[0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0]],
// Level 6a.
 [[1, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 1, 1]],
// Level 7.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0]],
// Level 7a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 4, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 3, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 8.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0]],
// Level 8a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 4, 0],
  [0, 1, 1, 3, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 4, 1],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 9.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 4, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 9a.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 4, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 3, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]
][BlocklyApps.LEVEL];
// Add blank row at top for hint bubble.
Maze.map.unshift([0, 0, 0, 0, 0, 0, 0, 0]);

BlocklyApps.MAX_LEVEL = 18;
BlocklyApps.LEVEL =
    BlocklyApps.getNumberParamFromUrl('level', 1, BlocklyApps.MAX_LEVEL);
BlocklyApps.IDEAL_BLOCK_NUM = [undefined, //  0.
  2, 3, 5, 7, 2, 3, 5, 5, 2, 3, 5, 5, 4, 4, 4, 4, 6, 5][BlocklyApps.LEVEL];

BlocklyApps.REQUIRED_BLOCKS = [undefined, // 0.
  // Level 1.
  [{'test': 'moveForward', 'type': 'maze_moveForward'}],
  // Level 2.
  [{'test': 'moveForward', 'type': 'maze_moveForward'}],
  // Level 3.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 4.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
  // Level 5.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'for', 'type': 'controls_repeat'}],
  // Level 6.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'for', 'type': 'controls_repeat'}],
  // Level 7.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'for', 'type': 'controls_repeat'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
  // Level 8.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'for', 'type': 'controls_repeat'},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 9.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'while', 'type': 'maze_forever'}],
  // Level 10.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'while', 'type': 'maze_forever'}],
  // Level 11.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 12.
  [{'test': 'moveForward', 'type': 'maze_moveForward'},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 13.
  [{'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
  // Level 14.
  [{'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 15.
  [{'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 16.
  [{'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}},
   {'test': 'while', 'type': 'maze_forever'},
   {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
  // Level 17.
  [{'test': 'isPathForward', 'type': 'maze_ifElse',
    'titles': {'DIR': 'isPathForward'}},
   {'test': 'while', 'type': 'maze_forever'}],
  // Level 18.
  [{'test': 'isPathForward', 'type': 'maze_ifElse',
    'titles': {'DIR': 'isPathForward'}},
   {'test': 'while', 'type': 'maze_forever'}]][BlocklyApps.LEVEL];

BlocklyApps.INTERSTITIALS = undefined;
