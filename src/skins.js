// avatar: A 1029x51 set of 21 avatar images.

exports.load = function(baseUrl, id) {
  var path = 'media/skins/' + id + '/';
  var root = baseUrl + path;
  var skin = {
    id: id,
    path: path,
    root: root,
    // Images
    avatar: root + 'avatar.png',
    tiles: root + 'tiles.png',
    goal: root + 'goal.png',
    obstacle: root + 'obstacle.png',
    staticAvatar: root + 'static_avatar.png',
    // Sounds
    //TODO: Blockly should accept absolute sound paths.
    startSound: [path + 'start.mp3', path + 'start.ogg'],
    winSound: [path + 'win.mp3', path + 'win.ogg'],
    failureSound: [path + 'failure.mp3', path + 'failure.ogg']
  };
  return skin;
};
