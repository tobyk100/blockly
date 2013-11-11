exports.addReadyListener = function(callback) {
  if (document.readyState === "complete") {
    setTimeout(callback, 1);
  } else {
    window.addEventListener('load', callback, false);
  }
};

exports.getText = function(node) {
  return node.innerText || node.textContent;
};

exports.setText = function(node, string) {
  if (node.innerText) {
    node.innerText = string;
  } else {
    node.textContent = string;
  }
};

exports.addClickTouchEvent = function(element, handler) {
  if ('ontouchend' in document.documentElement) {
    element.addEventListener('touchend', handler, false);
  }
  element.addEventListener('click', handler, false);
};

// A map from standard touch events to various aliases.
var TOUCH_MAP = {
  //  Incomplete list, add as needed.
  'onmouseup': {
    'standard': 'ontouchend',
    'ie10': 'onmspointerup',
    'ie11': 'onpointerup'
  },
  'onmousedown': {
    'standard': 'ontouchstart',
    'ie10': 'onmspointerdown',
    'ie11': 'onpointerdown'
  }
};

// For the given element, extend the current mouse handler to handle touch
// events. This should be handled automatically by browser but Blockly captures
// certain touch events and keeps them from bubbling.
exports.aliasTouchToMouse = function(element, mouseEvent) {

  var isIE11Touch = window.navigator.pointerEnabled;
  var isIE10Touch = window.navigator.msPointerEnabled;
  var isStandardTouch = 'ontouchend' in document.documentElement;

  var key;
  if (isIE11Touch) {
    key = "ie11";
  } else if (isIE10Touch) {
    key = "ie10";
  } else if (isStandardTouch) {
    key = "standard";
  }
  var touchEvent = TOUCH_MAP.mouseEvent.key;
  element.touchEvent = element.mouseEvent;
};

exports.isMobile = function() {
  var reg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/;
  return reg.test(window.navigator.userAgent);
};
