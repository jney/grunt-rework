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
      var srcFiles = grunt.file.expand(file.src);

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

        // if sourcemapAsObject is true, write source map into its own file
        if(options.toString && options.toString.sourcemapAsObject) {
          // if sourceMapFilename isn't set use dest with '.map' suffix
          var mapDest = options.toString.sourceMapFilename || dest + '.map';

          // if sourceMapURL isn't set use sourceMapFilename
          var sourceMapURL = options.toString.sourceMapURL || options.toString.sourceMapFilename;
          res.code = res.code + '\n/*# sourceMappingURL=' + sourceMapURL + ' */';

          // if sourceMapRootpath is set, use it as prefix for res.map.sources
          if(options.toString.sourceMapRootpath) {
            var sourceMapRootpath = options.toString.sourceMapRootpath;
            // append '/' if necessary
            if(sourceMapRootpath.charAt(sourceMapRootpath.length - 1) !== '/') {
              sourceMapRootpath += '/';
            }
            res.map.sources.forEach(function(source, i) {
              res.map.sources[i] = sourceMapRootpath + source;
            });
          }

          grunt.file.write(dest, res.code);
          grunt.file.write(mapDest, JSON.stringify(res.map));

          grunt.log.writeln('File "' + dest + '" created.');
          grunt.log.writeln('File "' + mapDest + '" created.');
        } else {
          grunt.file.write(dest, res);

          grunt.log.writeln('File "' + dest + '" created.');
        }

        nextFile();
      }, next);
    }, done);
  });
};
