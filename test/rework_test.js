'use strict';

var grunt = require('grunt');

exports.rework = {
  main: function(test) {
    test.expect(1);

    var expectA = grunt.file.read('test/expected/index.css');
    var resultA = grunt.file.read('test/result/index.css');
    test.equal(expectA, resultA, 'should rework your css');

    test.done();
  }
};
