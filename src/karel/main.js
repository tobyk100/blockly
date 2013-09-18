window.BlocklyApps = require('../base');
window.Maze = require('./karel');
var blocks = require('./blocks');

document.write(karelpage.start({}, null, {
  page: BlocklyApps.PAGE,
  level: BlocklyApps.LEVEL,
  menu: BlocklyApps.DISPLAY_NAV,
  maxLevel: BlocklyApps.MAX_LEVEL,
  skin: BlocklyApps.SKIN_ID,
  baseUrl: BlocklyApps.BASE_URL
}));

blocks.install(Blockly);
