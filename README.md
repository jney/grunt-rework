# grunt-rework v0.1.0 [![build status][status-badge]][travis]

> [rework][rework] your css files with [Grunt][grunt].

## Getting Started

First, [setup your project with grunt][getting_started].

Then, install the `grunt-rework` plugin:

```
npm install --save-dev grunt-rework
```

Add this line to your Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-rework');
```

Then specify what files to rework in your Grunt config:

```javascript
var rework_import = require('rework-import');

grunt.initConfig({
  rework: {
    'dest/index.css': 'src/index.css',
    options: {
      toString: {compress: true},
      use: [
        rework_import
      ]
    },
    prod: {
      options: {
        toString: {
          compress: true
        }
      },
      files: {
       'dest/index.css': 'src/index.css',
      }
    }
  }
});
```

## rework task

#### Options

##### use
Type: `Array`
Default: `[]`

An array of rework plugin functions to use.

##### toString
Type: `Object`
Default: `{}`

Options to pass to rework's `toString` method.

If `toString.sourcemapAsObject` is set to `true`, you can use these additional options:

#### toString.sourceMapFilename
Type: `String`

Default: none

Write the source map to a separate file with the given filename. If not specified the destination file path will be used with a `.map` suffix.

#### toString.sourceMapURL
Type: `String`

Default: none

Override the default url that points to the sourcemap from the compiled css file.

#### toString.sourceMapRootpath
Type: `String`

Default: none

Adds this path onto the less file paths in the source map.


## Release History

* 0.1.0 Update to rework 1.0, remove vendors option, remove support for built-in rework plugin
* 0.0.5 Update rework version
* 0.0.3 New `use` syntax
* 0.0.2 Allow use of rework or own functions
* 0.0.1 First Release


## License
Copyright (c) 2013 Jean-Sébastien Ney
Licensed under the MIT license.


[grunt]: https://github.com/gruntjs/grunt
[getting_started]: http://gruntjs.com/getting-started
[rework]: https://github.com/visionmedia/rework
[travis]: http://travis-ci.org/jney/grunt-rework
[status-badge]: https://secure.travis-ci.org/jney/grunt-rework.png
