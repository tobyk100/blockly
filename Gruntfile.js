module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      build: ['build']
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/', src: ['**'], dest: 'build/'},
          {expand: true, cwd: 'static/', src: ['**'], dest: 'build/'}
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['clean:build', 'copy:build']);
  grunt.registerTask('default', ['build']);

};
