module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      all: ['build', 'dist']
    },

    copy: {
      all: {
        files: [
          {expand: true, cwd: 'src/', src: ['**/*.js'], dest: 'dist/'},
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
      //XXX Generated local names differ.
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
        dest: 'dist/bird/generated/en.js'
      },
      templates_karel: {
        src: ['build/templates/common.js', 'build/templates/karel/**/*.js'],
        dest: 'dist/karel/generated/en.js'
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-soy-compile');

  grunt.registerTask('build', ['soycompile', 'concat', 'copy:all']);

  grunt.registerTask('default', ['clean:all', 'build']);

};
