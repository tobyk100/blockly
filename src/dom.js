exports.addReadyListener = function(callback) {
  if (document.readyState === "complete") {
    setTimeout(callback, 1);
  } else {
    window.addEventListener('load', callback, false);
  }
};
