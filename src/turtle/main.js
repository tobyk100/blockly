window.BlocklyApps = require('../base');
window.Turtle = require('./turtle');
require('./answers'); //XXX Mutates Turtle
var blocks = require('./blocks');

window.turtleMain = function() {

  document.write(turtlepage.start({}, null, {
    page: BlocklyApps.PAGE,
    level: BlocklyApps.LEVEL,
    baseUrl: BlocklyApps.BASE_URL
  }));

  blocks.install(Blockly);

};
