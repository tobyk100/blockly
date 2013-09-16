module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      all: ['build', 'dist']
    },

    copy: {
      all: {
        files: [
          {expand: true, cwd: 'src/', src: ['**/*.js'], dest: 'dist/'},
          {expand: true, cwd: 'css/', src: ['**/*.css'], dest: 'dist/'},
          {expand: true, cwd: 'lib/blockly', src: ['*.js'], dest: 'dist/'},
          {expand: true, cwd: 'lib/prettify', src: ['*'], dest: 'dist/'},
          {expand: true, cwd: 'lib/soy', src: ['*.js'], dest: 'dist/_soy/'},
          {expand: true, cwd: 'static/', src: ['**'], dest: 'dist/'}
        ]
      }
    },

    soycompile: {
      all: {
        expand: true,
        cwd: 'src/',
        src: ["**/*.soy"],
        dest: "build/templates/",
        options: {
          jarPath: "lib/soy/"
        }
      }
    },

    concat: {
      templates_maze: {
        src: ['build/templates/common.js', 'build/templates/maze/**/*.js'],
        dest: 'dist/maze/generated/en_us.js'
      },
      templates_turtle: {
        src: ['build/templates/common.js', 'build/templates/turtle/**/*.js'],
        dest: 'dist/turtle/generated/en_us.js'
      },
      templates_bird: {
        src: ['build/templates/common.js', 'build/templates/bird/**/*.js'],
        dest: 'dist/bird/generated/en_us.js'
      },
      templates_karel: {
        src: ['build/templates/common.js', 'build/templates/karel/**/*.js'],
        dest: 'dist/karel/generated/en_us.js'
      },
    },

    connect: {
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
    },

    watch: {
      content: {
        files: ['src/**/*.js', 'lib/**/*.js', 'static/**/*'],
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
    },

    jshint: {
      options: {
        browser: true,
        globals: {
          Blockly: true
        }
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-soy-compile');

  grunt.registerTask('build:templates', ['soycompile', 'concat']);
  grunt.registerTask('build', ['build:templates', 'concat', 'copy:all']);

  grunt.registerTask('dev', ['connect:server', 'watch']);

  grunt.registerTask('default', ['clean:all', 'build']);

};
