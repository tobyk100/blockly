module.exports = function(grunt) {
  'use strict';

  var path = require('path');
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

      // Generate javascript message functions.
      var mf = new MessageFormat(locale);
      files.forEach(function(file) {
        var messages = grunt.file.readJSON(file.src[0]);
        var code = 'var MessageFormat = require("messageformat");';
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
