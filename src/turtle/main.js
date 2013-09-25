window.BlocklyApps = require('../base');
window.Turtle = require('./turtle');
var blocks = require('./blocks');

window.turtleMain = function(options) {

  if (!options) {
    options = {};
  }

  var config = {
    page: Turtle.PAGE,
    level: Turtle.LEVEL,
    baseUrl: BlocklyApps.BASE_URL
  };

  if (options.helpHtml) {
    config.helpHtml = options.helpHtml;
  }

  document.write(turtlepage.start({}, null, config));

  blocks.install(Blockly);

  window.addEventListener('load', function() {
    if (options.readonly) {
      BlocklyApps.initReadonly();
    } else {
      Turtle.init(options);
    }
  });

};
