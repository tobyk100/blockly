exports.clamp = function(x, min, max) {
  if (x < min) {
    return min;
  } else if (x > max) {
    return max;
  }
  return x;
};
