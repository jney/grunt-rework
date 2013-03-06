module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    nodeunit: {
      tests: ["test/*_test.js"]
    },
    clean: {
      output: ['test/expected']
    },
    rework: {
      'test/expected/index.css': 'test/fixtures/index.css',
      options: {
        toString: {compress: true},
        use: [
          ['rework.keyframes'],
          ['rework.prefix', 'border-radius'],
          ['rework.prefix', 'box-shadow']
        ],
        vendors: ['-moz-', '-webkit-']
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
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'rework', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
