var ejs = require('ejs');
var through = require('through');

var compile = function(filename, template) {
  var code = 'module.exports= (function() {\n';
  code += '  var t = ';
  code += ejs.compile(template, {
    filename: filename,
    client: true,
    cache: false,
    compileDebug: false
  });
  code += ';\n';
  code += '  return function(locals) {\n';
  code += '    return t(locals, require("ejs").filters);\n'
  code += '  }\n';
  code += '}());';
  return code;
};

module.exports = function(filename) {

  if (!/\.ejs$/.test(filename)) {
    return through();
  }

  var template = '';
  var write = function(buffer) {
      template += buffer;
  };

  var end = function() {
    this.queue(compile(filename, template));
    this.queue(null);
  };

  return through(write, end);

};
