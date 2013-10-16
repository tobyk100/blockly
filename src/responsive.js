var dialog = require('./dialog');

exports.scrollPastHeader = function() {
  var bubble = document.getElementById('bubble');
  var y = bubble.getBoundingClientRect().top;
  window.scroll(0, y);
};

exports.forceLandscape = function() {
  // set up event listeners to show/hide dialog based on orientation change.
  var orientationChange = function() {
    if (window.orientation % 180 === 0) {  // portrait
      var img = document.getElementById('rotateMobile')
        var modalStyle = {
          position: 'absolute',
          left: '5%',
          top: '5%',
          width: '90%',
          height: '90%'
        };
      dialog.show(img, null, true, true, modalStyle);
    } else {  // landscape.
      dialog.hide();
    }
  };
  window.addEventListener('orientationchange', orientationChange);
  orientationChange();
};
