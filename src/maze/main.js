window.BlocklyApps = require('../base');
var maze = require('./maze');
var blocks = require('./blocks');

if (BlocklyApps.MODE == BlocklyApps.MODE_ENUM.ADAPTIVE) {
  BlocklyApps.MAX_LEVEL = 18;
  BlocklyApps.LEVEL =
    BlocklyApps.getNumberParamFromUrl('level', 1, BlocklyApps.MAX_LEVEL);
}

document.write(mazepage.start({}, null, {
  level: BlocklyApps.LEVEL,
  menu: BlocklyApps.DISPLAY_NAV,
  skin: BlocklyApps.SKIN_ID,
  mode: BlocklyApps.MODE
}));

blocks.install(Blockly);
