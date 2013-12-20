/*
 * grunt-rework
 * https://github.com/jney/grunt-rework
 *
 * Copyright (c) 2013 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*jslint evil:true*/

module.exports = function(grunt) {
  'use strict';

  var _ = grunt.util._;
  var rework = require('rework');

  grunt.registerMultiTask('rework', 'rework your css files', function() {
    var options = this.options();
    options.toString = options.toString || {};
    options.use = options.use || [];
    options.vendors = options.vendors || [];

    grunt.verbose.writeflags(options, 'Options');

    var async = grunt.util.async;
    var done = this.async();

    async.forEach(this.files, function(file, next) {
      var src = _.isFunction(file.src) ? file.src() : file.src;
      var srcFiles = grunt.file.expand(src);

      async.forEach(srcFiles, function(srcFile, nextF) {
        var srcCode = grunt.file.read(srcFile);
        var css = rework(srcCode).vendors(options.vendors);

        options.use.forEach(function (e) {
          e = e.slice();
          var fnName = e.shift();

          if (typeof fnName === 'function') {
            return css.use(fnName.apply(fnName, e));
          }

          var fnArgs = e.map(function (arg) {
            return JSON.stringify(arg);
          }).join(', ');

          css.use(eval(fnName + '(' + fnArgs + ')'));
        });

        // generate file to string
        var res = css.toString(options.toString);

        var dest = _.isFunction(options.processName) ?
          options.processName(srcFile, res) : file.dest;
        grunt.file.write(dest, res);
        grunt.log.writeln('File "' + dest + '" created.');
        nextF();
      }, next);
    }, done);
  });
};
