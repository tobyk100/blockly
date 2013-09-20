window.BlocklyApps = require('../base');
window.Maze = require('./karel');
var blocks = require('./blocks');

window.karelMain = function(options) {

  if (!options) {
    options = {};
  }

  if (!options.readonly) {
    document.write(karelpage.start({}, null, Maze.config));
  }

  blocks.install(Blockly);

  window.addEventListener('load', function() {
    if (options.readonly) {
      BlocklyApps.initReadonly();
    } else {
      Maze.init();
    }
  });

};
