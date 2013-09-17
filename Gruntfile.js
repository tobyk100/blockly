var config = {};

var APPS = [
  'maze',
  'turtle',
  'bird',
  'karel'
];

config.clean = {
  all: ['build', 'dist']
};

config.copy = {
  static: {
    files: [
      {expand: true, cwd: 'css/', src: ['**/*.css'], dest: 'dist/'},
      {expand: true, cwd: 'static/', src: ['**'], dest: 'dist/'}
    ]
  },
  vendor: {
    files: [
      {expand: true, cwd: 'lib/blockly', src: ['*.js'], dest: 'dist/'},
      {expand: true, cwd: 'lib/prettify', src: ['*'], dest: 'dist/'},
      {expand: true, cwd: 'lib/soy', src: ['*.js'], dest: 'dist/_soy/'},
    ]
  }
};

config.soycompile = {
  all: {
    expand: true,
    cwd: 'src/',
    src: ["**/*.soy"],
    dest: "build/templates/",
    options: {
      jarPath: "lib/soy/"
    }
  }
};

config.messages = {
  all: {
    locales: ['en_us'],
    srcBase: 'i18n',
    destBase: 'build'
  }
};

config.concat = {};
APPS.forEach(function(app) {
  config.concat['templates_' + app] = {
    src: ['build/templates/common.js', 'build/templates/' + app + '/**/*.js'],
    dest: 'dist/' + app + '/generated/en_us.js'
  };
});

config.browserify = {}
APPS.forEach(function(app) {
  var src = 'src/' + app + '/main.js';
  var dest = 'dist/' + app + '/' + app + '.js';
  var files = {};
  files[dest] = [src];
  config.browserify[app] = {files: files};
});

config.connect = {
  server: {
    options: {
      base: 'dist',
      middleware: function(connect, options) {
        return [
          require('connect-livereload')(),
          connect.static(options.base),
          connect.directory(options.base)
        ];
      }
    }
  }
};

config.watch = {
  src: {
    files: ['src/**/*.js'],
    tasks: ['browserify']
  },
  content: {
    files: ['lib/**/*.js', 'static/**/*'],
    tasks: ['copy']
  },
  templates: {
    files: ['src/**/*.soy'],
    tasks: ['build:templates']
  },
  dist: {
    files: ['dist/**/*'],
    options: {
      livereload: true
    }
  }
};

config.jshint = {
  options: {
    browser: true,
    globals: {
      Blockly: true
    }
  },
  all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
};

module.exports = function(grunt) {

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-soy-compile');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.loadTasks('tasks');

  grunt.registerTask('build:templates', ['soycompile', 'concat']);

  grunt.registerTask('build', [
    'messages',
    'build:templates',
    'concat',
    'browserify',
    'copy'
  ]);

  grunt.registerTask('dev', ['connect:server', 'watch']);

  grunt.registerTask('default', ['clean:all', 'build']);

};
