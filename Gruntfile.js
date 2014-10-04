module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: { /* simplest solution is just to minify in-place */
        src: ['www/js/*.js', '!www/js/*.min.js'],
        dest: 'www/js/main.min.js'
      }
    },
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'www/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'www/css/',
          ext: '.min.css'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'www',
          hostname: 'localhost',
          keepalive: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'connect']);

};