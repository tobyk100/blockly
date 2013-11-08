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
  'ontouchend': {
    'mouse': 'onmouseup',
    'ie10': 'onmspointerup',
    'ie11': 'onpointerup'
  },
  'ontouchstart': {
    'mouse': 'onmousedown',
    'ie10': 'onmspointerdown',
    'ie11': 'onpointerdown'
  }
};

exports.isTouchSupported = function() {
  var touchSupported = 'ontouchstart' in document.documentElement ||
                        (window.navigator.msMaxTouchPoints &&
                         window.navigator.msMaxTouchPoints > 1);
  return touchSupported;
};

// For the given element, extend the current mouse handler to handle touch
// events. This should be handled automatically by browser but Blockly captures
// certain touch events and keeps them from bubbling.
exports.aliasTouchToMouse = function(element, standardTouchEvent) {
  var aliases = TOUCH_MAP[standardTouchEvent];

  var isIE11Touch = window.navigator.pointerEnabled;
  var ie11TouchEvent = aliases.ie11;

  var isIE10Touch = window.navigator.msPointerEnabled;
  var ie10TouchEvent = aliases.ie10;

  var mouseEvent = aliases.mouse;

  if (isIE11Touch & !element[ie11TouchEvent]) {
    element[ie11TouchEvent] = element[mouseEvent];
  } else if (isIE10Touch & !element[ie10TouchEvent]) {
    element[ie10TouchEvent] = element[mouseEvent];
  } else if (!element[standardTouchEvent]) {
    element[standardTouchEvent] = element[mouseEvent];
  }
};

exports.isMobile = function() {
  var reg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/;
  return reg.test(window.navigator.userAgent);
};
