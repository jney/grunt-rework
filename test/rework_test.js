'use strict';

var grunt = require('grunt');

exports.rework = {
  main: function(test) {
    test.expect(1);

    var expectA = 'backgound{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}';
    var resultA = grunt.file.read('test/expected/index.css');
    test.equal(expectA, resultA, 'should rework your css');

    test.done();
  }
};
