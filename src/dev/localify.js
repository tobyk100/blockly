// A browserify transform which converts resolves "current" locale paths.
module.exports = function(locale) {

  var through = require('through');

  return function(file) {
    var buffer = '';
    return through(function(data) {
      buffer += data;
    }, function() {
      this.queue(buffer.replace('locale/current', 'locale/' + locale));
      this.queue(null);
    });
  };

};
