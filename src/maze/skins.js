/**
 * Load Skin for Maze.
 */

var CONFIGS = {

  astro: {
    look: '#FFF'
  },

  pegman: {
    background: false,
    look: '#000'
  },

  farmer: {
    look: '#000'
  },

  pvz: {
    look: '#FFF'
  },

  birds: {
    look: '#FFF'
  },

  mouse: {
    look: '#FFF'
  },

  panda: {
    look: '#000'
  }

};

exports.load = function(skin) {
  var config = CONFIGS[skin.id];
  // Images
  skin.tiles = skin.root + 'tiles.png',
  skin.goal = skin.root + 'goal.png',
  skin.obstacle = skin.root + 'obstacle.png',
  // Settings
  skin.graph = config.graph,
  skin.look = config.look,
  skin.dirt = function(n) {
    var MAX = 10;
    var MIN = -MAX;
    var prefix;
    if (n < MIN) {
      prefix = '-';
    } else if (n > MAX) {
      prefix = '';
    } else {
      prefix = '' + n;
    }
    //TODO: This really should be a dirt sprite sheet.
    return skin.root + prefix + 'check.png';
  }
  if (config.background !== false) {
    skin.background = skin.root + 'background.png';
  }
  return skin;
};
