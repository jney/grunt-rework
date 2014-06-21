module.exports = function(grunt) {
  'use strict';

  // Get a rework plugin
  var rework_import = require('rework-import')({
    path: 'test/fixtures/'
  });

  grunt.initConfig({
    nodeunit: {
      tests: ['test/*_test.js']
    },
    clean: {
      output: ['test/result']
    },
    rework: {
      css: {
        files: {
          'test/result/index.css': 'test/fixtures/index.css'
        }
      },
      options: {
        use: [
          rework_import
        ],
        toString: {compress: true}
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'rework:css', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
