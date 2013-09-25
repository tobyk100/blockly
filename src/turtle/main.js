window.BlocklyApps = require('../base');
window.Turtle = require('./turtle');
require('./answers'); //XXX Mutates Turtle
var blocks = require('./blocks');

window.turtleMain = function(options) {

  if (!options) {
    options = {};
  }

  var config = {
    page: BlocklyApps.PAGE,
    level: BlocklyApps.LEVEL,
    baseUrl: BlocklyApps.BASE_URL
  };

  if (options.helpHtml) {
    config.helpHtml = options.helpHtml;
  }

  document.write(turtlepage.start({}, null, config));

  blocks.install(Blockly);

};
