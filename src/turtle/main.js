var appMain = require('../appMain');
window.Turtle = require('./turtle');
var blocks = require('./blocks');
var levels = require('./levels');

window.turtleMain = function(options) {
  options.blocksModule = blocks;
  appMain(window.Turtle, levels, options);
};
