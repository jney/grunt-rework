/*
 * grunt-rework
 * https://github.com/jney/grunt-rework
 *
 * Copyright (c) 2013 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var _ = grunt.util._;
  var rework = require('rework');

  grunt.registerMultiTask('rework', 'rework your css files', function() {
    var options = this.options();
    options.toString = options.toString || {};
    options.use = options.use || [];

    grunt.verbose.writeflags(options, 'Options');

    var async = grunt.util.async;
    var done = this.async();

    async.forEach(this.files, function(file, next) {
      var src = _.isFunction(file.src) ? file.src() : file.src;
      var srcFiles = grunt.file.expand(src);

      async.forEach(srcFiles, function(srcFile, nextFile) {
        var srcCode = grunt.file.read(srcFile);
        var css = rework(srcCode);

        options.use.forEach(function(plugin) {
          if (_.isFunction(plugin)){
            return css.use(plugin);
          }
          else {
            grunt.log.error('Rework plugins must be functions');
          }
        });

        var res = css.toString(options.toString);

        var dest = _.isFunction(options.processName) ? options.processName(srcFile, res) : file.dest;

        grunt.file.write(dest, res);

        grunt.log.writeln('File "' + dest + '" created.');

        nextFile();
      }, next);
    }, done);
  });
};
