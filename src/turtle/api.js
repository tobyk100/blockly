var BlocklyApps = require('../base');

exports.moveForward = function(distance, id) {
  BlocklyApps.log.push(['FD', distance, id]);
};

exports.moveBackward = function(distance, id) {
  BlocklyApps.log.push(['FD', -distance, id]);
};

exports.jumpForward = function(distance, id) {
  BlocklyApps.log.push(['JF', distance, id]);
};

exports.jumpBackward = function(distance, id) {
  BlocklyApps.log.push(['JF', -distance, id]);
};

exports.turnRight = function(angle, id) {
  BlocklyApps.log.push(['RT', angle, id]);
};

exports.turnLeft = function(angle, id) {
  BlocklyApps.log.push(['RT', -angle, id]);
};

exports.penUp = function(id) {
  BlocklyApps.log.push(['PU', id]);
};

exports.penDown = function(id) {
  BlocklyApps.log.push(['PD', id]);
};

exports.penWidth = function(width, id) {
  BlocklyApps.log.push(['PW', Math.max(width, 0), id]);
};

exports.penColour = function(colour, id) {
  BlocklyApps.log.push(['PC', colour, id]);
};

exports.hideTurtle = function(id) {
  BlocklyApps.log.push(['HT', id]);
};

exports.showTurtle = function(id) {
  BlocklyApps.log.push(['ST', id]);
};
