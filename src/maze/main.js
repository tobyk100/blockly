window.BlocklyApps = require('../base');
window.Maze = require('./maze');
var blocks = require('./blocks');

window.mazeMain = function(options) {

  if (!options) {
    options = {};
  }

  if (BlocklyApps.MODE == BlocklyApps.MODE_ENUM.ADAPTIVE) {
    BlocklyApps.MAX_LEVEL = 18;
    BlocklyApps.LEVEL =
      BlocklyApps.getNumberParamFromUrl('level', 1, BlocklyApps.MAX_LEVEL);
  }

  if (options.readonly) {
    document.write(mazepage.readonly({}, null, {}));
  } else {
    document.write(mazepage.start({}, null, {
      level: BlocklyApps.LEVEL,
      menu: BlocklyApps.DISPLAY_NAV,
      skin: BlocklyApps.SKIN_ID,
      mode: BlocklyApps.MODE,
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
