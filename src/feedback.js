/**
 * The way interstitials can be displayed. The values are used for bitwise
 * comparisons, so mutually exclusive choices must be different powers of two.
 */
exports.InterTypes = {
  NONE: 0,
  PRE: 1,          // Show interstitial when the page loads.
  POST: 2          // Show interstitial when the level is complete.
};
