var dialog = require('./dialog');

exports.scrollPastHeader = function() {
  var bubble = document.getElementById('bubble');
  var y = bubble.getBoundingClientRect().top;
  window.scroll(0, y);
};

var getOrientation = function() {
  return (window.orientation % 180 === 0 ? 'portrait' : 'landscape');
};

exports.forceLandscape = function() {
  // set up event listeners to show/hide dialog based on orientation change.
  var orientationChange = function() {
    var orientation = getOrientation();
    if (orientation === 'portrait') {
      var img = document.getElementById('rotateMobile');
      dialog.show({
        content: img,
        style: {
          position: 'absolute',
          left: '5%',
          top: '5%',
          width: '90%',
          height: '90%'
        }
      });
    } else if (orientation === 'landscape') {
      dialog.hide();
    }
  };
  window.addEventListener('orientationchange', orientationChange);
  orientationChange();
};
