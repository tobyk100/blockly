var Direction = require('../tiles').Direction;

/*
 * Configuration for all levels.
 */
module.exports = {
  'pages': [
  // Page 0
  null,
  
  // Page 1
  {
  'levels': [
  // Level 0
  null,
  // Level 1
  {
    'interstitials': {
      before: {
        message: 'reinfMsg1',
        videoId: '0BybP3F7DhXrUSFRhMnBGLUVPZTA'
      }
    },
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
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
    'interstitials': {
      after: {
        message: 'reinfMsg3'
      }
    },
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
    'interstitials': {
      before: {
        message: 'reinfMsg2',
        videoId: '0BybP3F7DhXrUU2FCODdJdXRKVTQ'
      }
    },
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
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
    'interstitials': {
      before: {
        message: 'reinfMsg4',
        videoId: '0BybP3F7DhXrUSFRhMnBGLUVPZTA'
      },
      after: {
        message: 'reinfMsg5'
      }
    },
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
    'interstitials': {
      before: {
        message: 'reinfMsg6'
      }
    },
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
    'interstitials': {
      before: {
        message: 'reinfMsg8'
      },
      after: {
        message: 'reinfMsg9'
      }
    },
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
  }
  ]
  },
    // Page 2
    {
    'levels': [
        // Level 0
        null,
        // Level 1
        {
          'ideal': 2,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
          ],
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
          'ideal': 3,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 1, 1, 3, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 3
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 4, 1, 3, 0, 0, 0],
            [0, 0, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 4
        {
          'ideal': 7,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 4, 3, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 5
        {
          'ideal': 2,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'for', 'type': 'controls_repeat'}
          ],
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
        // Level 6
        {
          'ideal': 3,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'for', 'type': 'controls_repeat'}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 0]
          ]
        },
        // Level 7
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'for', 'type': 'controls_repeat'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 2, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 8
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'for', 'type': 'controls_repeat'},
            {'test': 'turnRight',
                'type': 'maze_turn',
                 'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 9
        {
          'ideal': 2,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'while', 'type': 'maze_forever'}
          ],
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
        // Level 10
        {
          'ideal': 3,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'while', 'type': 'maze_forever'}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 0]
          ]
        },
        // Level 11
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
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
        // Level 12
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'moveForward', 'type': 'maze_moveForward'},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 2, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 3, 0],
            [0, 0, 0, 0, 0, 0, 1, 1]
          ]
        },
        // Level 13
        {
          'ideal': 4,
          'requiredBlocks': [
            {'test': 'isPathLeft',
                'type': 'maze_if',
                'titles': {'DIR': 'isPathLeft'}},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnLeft',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnLeft'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 2, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 4, 0, 0]
          ]
        },
        // Level 14
        {
          'ideal': 4,
          'requiredBlocks': [
            {'test': 'isPathRight',
                'type': 'maze_if',
                'titles': {'DIR': 'isPathRight'}},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 4, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 3, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 15
        {
          'ideal': 4,
          'requiredBlocks': [
            {'test': 'isPathRight',
                'type': 'maze_if',
                'titles': {'DIR': 'isPathRight'}},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
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
            [0, 0, 0, 0, 4, 0, 0, 0]
          ]
        },
        // Level 16
        {
          'ideal': 4,
          'requiredBlocks': [
            {'test': 'isPathRight',
                'type': 'maze_if',
                'titles': {'DIR': 'isPathRight'}},
            {'test': 'while', 'type': 'maze_forever'},
            {'test': 'turnRight',
                'type': 'maze_turn',
                'titles': {'DIR': 'turnRight'}}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 4, 0],
            [0, 1, 1, 3, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 4, 1],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 17
        {
          'ideal': 6,
          'requiredBlocks': [
            {'test': 'isPathForward',
                'type': 'maze_ifElse',
                'titles': {'DIR': 'isPathForward'}},
            {'test': 'while', 'type': 'maze_forever'}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 0],
            [1, 1, 1, 4, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        // Level 18
        {
          'ideal': 5,
          'requiredBlocks': [
            {'test': 'isPathForward',
                'type': 'maze_ifElse',
                'titles': {'DIR': 'isPathForward'}},
            {'test': 'while', 'type': 'maze_forever'}
          ],
          'startDirection': Direction.EAST,
          'map': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 4, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 1, 1, 0],
            [0, 1, 3, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]
        }
      ]
    }
  ]
};
