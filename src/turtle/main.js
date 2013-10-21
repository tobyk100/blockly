var appMain = require('../appMain');
window.Turtle = require('./turtle');
var blocks = require('./blocks');
var skins = require('../skins');
var levels = require('./levels');

window.turtleMain = function(options) {
  options.skin = skins.load(options.baseUrl, options.skinId);
  options.blocksModule = blocks;
  appMain(window.Turtle, levels, options);
};
