module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var MessageFormat = require('messageformat');

  grunt.registerMultiTask('messages', 'Compile messages', function() {

    var locales = this.data.locales;
    var srcBase = this.data.srcBase;
    var destBase = this.data.destBase;

    locales.forEach(function(locale) {
      var mf = new MessageFormat(locale);
      var pattern = srcBase + '/**/' + locale + '.json';
      var files = grunt.file.expandMapping(pattern, destBase, {
        expand: true,
        rename: function(destBase, destPath) {
          var filename = destPath.replace('/' + locale + '.json', '.js')
          return path.join(destBase, locale, filename);
        }
      });
      files.forEach(function(file) {

        var messages = grunt.file.readJSON(file.src[0]);

        var code = '';
        Object.keys(messages).forEach(function(key) {
          var string = messages[key].string;
          code += 'exports.' + key + ' = ';
          code += mf.precompile(mf.parse(string));
          code += ';\n\n';
        });

        grunt.file.write(file.dest, code);

      });
    });

  });

};
