module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var vm = require('vm');
  var MessageFormat = require('messageformat');

  grunt.registerMultiTask('messages', 'Compile messages', function() {

    var locales = this.data.locales;
    var srcBases = this.data.srcBases;
    var destBase = this.data.destBase;

    locales.forEach(function(locale) {

      // Resolve mapping from locale strings to generated code files.
      var patterns = srcBases.map(function(srcBase) {
        return srcBase + '/**/' + locale + '.json';
      });
      var files = grunt.file.expandMapping(patterns, destBase, {
        expand: true,
        rename: function(destBase, matchedPath) {
          var destPath;
          srcBases.forEach(function(srcBase) {
            if (matchedPath.substring(0, srcBase.length) === srcBase) {
              destPath = matchedPath.substring(srcBase.length);
            }
          });
          var filename = destPath.replace('/' + locale + '.json', '.js');
          return path.join(destBase, locale, filename);
        }
      });

      // Initialize MessageFormat.
      var language = locale.split('_')[0];
      var backend = fs.readFileSync(
          './node_modules/messageformat/locale/' + language + '.js', 'utf8');
      vm.runInNewContext(backend, {MessageFormat: MessageFormat});
      var mf = new MessageFormat(language);

      // Generate javascript message functions.
      files.forEach(function(file) {
        var messages = grunt.file.readJSON(file.src[0]);
        var code = 'var MessageFormat = require("messageformat");';
        code += backend;
        Object.keys(messages).forEach(function(key) {
          code += ';\n\n';
          var string = messages[key];
          code += 'exports.' + key + ' = ';
          code += mf.precompile(mf.parse(string));
        });
        grunt.file.write(file.dest, code);
      });
    });

  });

};
