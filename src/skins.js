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
    // Sounds
    //TODO: Blockly should accept absolute sound paths.
    start_sound: [path + 'start.mp3', path + 'start.ogg'],
    win_sound: [path + 'win.mp3', path + 'win.ogg'],
    failure_sound: [path + 'failure.mp3', path + 'failure.ogg',
                    path + 'whack.mp3', path + 'whack.ogg']
  };
  return skin;
};
