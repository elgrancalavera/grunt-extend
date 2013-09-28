# grunt-extend [![Build Status](https://travis-ci.org/elgrancalavera/grunt-extend.png?branch=master)](https://travis-ci.org/elgrancalavera/grunt-extend)

> Extends JavaScript Objects and JSON files with other JSON files, and writes them to a new JSON file

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-extend --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-extend');
```

## The "extend" task
This task extends JavaScript Objects and JSON files with other JSON files, using Lo-Dash
[`_.extend()`](http://lodash.com/docs#assign) and [`_.merge()`](http://lodash.com/docs#merge) internally. Once the final object
is created, the resulting object is written to a new JSON file.

Possible uses include:

- projects that generate multiple clients
- projects that share configuration values across multiple clients
- sharing base configuration values across environments

### Overview
In your project's Gruntfile, add a section named `extend` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  extend: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.defaults
Type: `Object`
Default value: `{}`

A JavaScript Object used as the base object in the extension chain. Setting
`options.defaults` as a property of the task will make all of the targets share
the same default options. Setting `options.defaults` inside a target will override
the task's default options for that target.

### Usage Examples

#### Generate an empty JSON file
The basic usage example is using an empty object as the default options and write
it to a JSON file:
```js
grunt.initConfig({
  extend: {
    options: {
      defaults: {}
    },
    empty: {
      files: {
        'tmp/config-empty.json': []
      }
    }
  }
});
```

#### Generate a JSON file from default options
This example uses the default options specified in `options.defaults` and writes
them to a JSON file:
```js
grunt.initConfig({
  extend: {
    options: {
      defaults: {
        coffee: true,
        options: ['a', 'b', 'c']
      }
    },
    defaultConfig: {
      files: {
        'tmp/config-default.json': []
      }
    }
  }
});
```

#### Extend the default options using one or more JSON files
It is possible to extend the default options with one or more JSON files, and
write the results to a new JSON file:
```js
grunt.initConfig({
  extend: {
    options: {
      defaults: {
        coffee: true,
        options: ['a', 'b', 'c']
      }
    },
    extendedConfig: {
      files: {
        'tmp/config-base.json': ['.config-base.json']
      }
    }
  }
});
```

#### Multiple targets
Extend is a mult-task, so you can specify multiple targets. Default options can
be overridden in individual targets:
```js
grunt.initConfig({
  extend: {
    options: {
      defaults: {
        coffee: true,
        options: ['a', 'b', 'c']
      }
    },
    empty: {
      options: {
        defaults: {}
      },
      files: {
        'tmp/config-empty.json': []
      }
    },
    defaultConfig: {
      files: {
        'tmp/config-default.json': []
      }
    },
    extendedConfig: {
      files: {
        'tmp/config-base.json': ['.config-base.json']
      }
    },
    multipleExtensions: {
      files: {
        'tmp/config-local.json': ['.config-base.json', '.config-local.json']
      }
    }
  }
});
```

#### Single target and multiple files
It is also possible to generate multiple files using a single target:
```js
grunt.initConfig({
  extend: {
    options: {
      defaults: {
        coffee: true,
        options: ['a', 'b', 'c']
      }
    },
    allEnvironments: {
      files: {
        'tmp/config-default.json': [],
        'tmp/config-base.json': ['.config-base.json'],
        'tmp/config-local.json': ['.config-base.json', '.config-local.json']
      }
    }
  }
});
```

#### Deep extend
In order to extend and object deeply, add `deep` to the targets options:
```js
grunt.initConfig({
  extend: {
    options: {
      deep: true,
      defaults: {
        coffee: true,
        options: ['a', 'b', 'c']
      }
    },
    extendedConfig: {
      files: {
        'tmp/config-base.json': ['.config-base.json']
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2013-09-38   v0.4.2   Fixing error in documentation.
 * 2013-08-13   v0.4.1   Removing jQuery as a dependency.
 * 2013-08-07   v0.3.0   Support for deep extends.
 * 2013-08-03   v0.2.1   Initial release.
 * 2013-08-03   v0.2.0   Initial release.
