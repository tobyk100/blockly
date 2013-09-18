var Direction = require('../tiles').Direction;

/*
 * Configuration for all levels.
 */
module.exports = [
  // Level 0
  {},
  // Level 1
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUSFRhMnBGLUVPZTA',
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 2
  {
    'interstitials': [BlocklyApps.InterTypes.POST],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'moveForward', 'type': 'maze_moveForward'},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 3
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUU2FCODdJdXRKVTQ',
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 4
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    /**
     *  Note, the path continues past the start and the goal in both directions.
     *  This is intentional so kids see the maze is about getting from the start
     *  to the finish and not necessarily about moving over every part of the maze,
     *  'mowing the lawn' as Neil calls it.
     */
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 5
  {
    'interstitials': [BlocklyApps.InterTypes.PRE | BlocklyApps.InterTypes.POST],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUSFRhMnBGLUVPZTA',
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 6
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 7
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 8
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 6,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}},
      {'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0],
      [0, 2, 1, 1, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 9
  {
    'interstitials': [BlocklyApps.InterTypes.PRE | BlocklyApps.InterTypes.POST],
    'ideal': 6,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathForward', 'type': 'maze_ifElse',
                                'titles': {'DIR': 'isPathForward'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [3, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 10
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathForward', 'type': 'maze_ifElse',
                                'titles': {'DIR': 'isPathForward'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 3, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
];
