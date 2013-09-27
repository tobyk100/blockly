var appMain = require('../appMain');
window.Turtle = require('./turtle');
var blocks = require('./blocks');

window.turtleMain = function(options) {
  options.blocksModule = blocks;
  appMain(window.Turtle, options);
};
