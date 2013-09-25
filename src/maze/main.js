window.BlocklyApps = require('../base');
window.Maze = require('./maze');
var blocks = require('./blocks');

window.mazeMain = function(options) {

  if (!options) {
    options = {};
  }

  //TODO: Untangle app initialization & template rendering, move this in there.
  if (options.helpHtml) {
    Maze.config.helpHtml = options.helpHtml;
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
