window.BlocklyApps = require('../base');
var bird = require('./bird');
var blocks = require('./blocks');

document.write(birdpage.start({}, null, {level: bird.LEVEL}));

blocks.install(Blockly);
