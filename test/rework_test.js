'use strict';

var grunt = require('grunt');

exports.rework = {
  main: function(test) {
    test.expect(1);

    var expectA = 'backgound{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;-moz-box-shadow:0 1px 8px 0 black;-webkit-box-shadow:0 1px 8px 0 black;box-shadow:0 1px 8px 0 black}';
    var resultA = grunt.file.read('test/expected/index.css');
    test.equal(expectA, resultA, 'should rework your css');

    test.done();
  }
};
