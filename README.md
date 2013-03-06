[![build status](https://secure.travis-ci.org/jney/grunt-rework.png)](http://travis-ci.org/jney/grunt-rework)
# grunt-rework

[Grunt][grunt] plugin to [rework][rework] your css files.

## Getting Started

Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-rework`

Then add this line to your project's `gruntejs` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-rework');
```

Then specify what files to compress in your config:

```javascript
grunt.initConfig({
  rework: {
    'dest/index.css': 'src/index.css',
    options: {
      toString: {compress: true},
      use: [
        ['rework.keyframes'],
        ['rework.prefix', 'border-radius'],
        ['rework.prefix', 'box-shadow']
      ],
      vendors: ['-moz-', '-webkit-']
    }
  }
});
```
### Options

#### rework options

##### vendors(prefixes)

Define vendor prefixes that plugins may utilize.

##### use(fn)

Use the given plugin fn.

##### toString(options)

Return the string representation of the manipulated css. Optionally you may compress the output with .toString({ compress: true })

#### input/output files

`src` source string
`processName` can help you formating the output instead of using `dest`

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: http://gruntjs.com/getting-started
[rework]: https://github.com/visionmedia/rework

## Release History
* 0.0.3 New `use` syntax
* 0.0.2 Allow use of rework or own functions
* 0.0.1 First Release

## License
Copyright (c) 2013 Jean-Sébastien Ney
Licensed under the MIT license.
