// avatar: A 1029x51 set of 21 avatar images.

exports.load = function(assetUrl, id) {
  var skinUrl = function(path) {
    return assetUrl('media/skins/' + id + '/' + path);
  };
  var skin = {
    id: id,
    assetUrl: skinUrl,
    // Images
    avatar: skinUrl('avatar.png'),
    tiles: skinUrl('tiles.png'),
    goal: skinUrl('goal.png'),
    obstacle: skinUrl('obstacle.png'),
    staticAvatar: skinUrl('static_avatar.png'),
    // Sounds
    startSound: [skinUrl('start.mp3'), skinUrl('start.ogg')],
    winSound: [skinUrl('win.mp3'), skinUrl('win.ogg')],
    failureSound: [skinUrl('failure.mp3'), skinUrl('failure.ogg')]
  };
  return skin;
};
