window.BlocklyApps = require('../base');
window.Maze = require('./maze');
var blocks = require('./blocks');

window.mazeMain = function(options) {

  if (!options) {
    options = {};
  }

  if (!options.readonly) {
    document.write(mazepage.start({}, null, {
      page: BlocklyApps.PAGE,
      level: BlocklyApps.LEVEL,
      menu: BlocklyApps.DISPLAY_NAV,
      skin: BlocklyApps.SKIN_ID,
      interstitials: BlocklyApps.INTERSTITIALS,
      baseUrl: BlocklyApps.BASE_URL
    }));
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
