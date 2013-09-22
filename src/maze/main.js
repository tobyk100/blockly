window.BlocklyApps = require('../base');
window.Maze = require('./maze');
var blocks = require('./blocks');

window.mazeMain = function(options) {

  if (!options) {
    options = {};
  }

  if (!options.readonly) {
    document.write(mazepage.start({}, null, Maze.config));
  }

  blocks.install(Blockly, Maze.config.skin);

  window.addEventListener('load', function() {
    if (options.readonly) {
      BlocklyApps.initReadonly();
    } else {
      Maze.init(options);
    }
  });

};
