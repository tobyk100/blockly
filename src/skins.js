// avatar: A 1029x51 set of 21 avatar images.
// tiles: A 250x200 set of 20 map images.
// goal: A 20x34 goal image.
// background: An optional 400x450 background image, or false.
// graph: Colour of optional grid lines, or false.
// look: Colour of sonar-like look icon.

exports.load = function(baseUrl, id) {
  var path = 'media/skins/' + id + '/';
  var root = baseUrl + path;
  var skin = {
    id: id,
    root: root,
    // Images
    avatar: root + 'avatar.png',
    // Sounds
    //TODO: Blockly should accept absolute sound paths.
    win: [path + 'win.mpg', path + 'win.ogg'],
    whack: [path + 'whack.mpg', path + 'whack.ogg']
  };
  return skin;
};
