exports.addReadyListener = function(callback) {
  if (document.readyState === "complete") {
    setTimeout(callback, 1);
  } else {
    exports.addEventListener(window, 'load', callback, false);
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
  exports.addEventListener(element, 'click', handler, false);

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
  if (key) {
    var touchEvent = TOUCH_MAP.click[key];
    exports.addEventListener(element, touchEvent, handler, false);
  }
};

// A map from standard touch events to various aliases.
var TOUCH_MAP = {
  //  Incomplete list, add as needed.
  click: {
    standard: 'touchend',
    ie10: 'mspointerup',
    ie11: 'pointerup'
  },
  mousedown: {
    standard: 'touchstart',
    ie10: 'mspointerdown',
    ie11: 'pointerdown'
  }
};

exports.isMobile = function() {
  var reg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/;
  return reg.test(window.navigator.userAgent);
};

exports.windowMetrics = function() {
  return {
    width: window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
    height: window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
  };
};


exports.addEventListener = function(element, eventName, handler, useCapture) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, !!useCapture);
  } else {
    element.attachEvent('on' + eventName, handler);
  }
};

exports.getMetrics = function(element) {
  var width,
      height;
  if (window.getComputedStyle) {
    var style = window.getComputedStyle(element);
    width = parseInt(style.width, 10);
    height = parseInt(style.height, 10);
  } else {  // IE 8
    width = parseInt($(element).css('width'), 10);
    height = parseInt($(element).css('height'), 10);
  }

  return { width: width, height: height };
};
