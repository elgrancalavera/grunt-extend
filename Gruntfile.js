/*
 * grunt-extend
 * https://github.com/grancalavera/grunt-extend
 *
 * Copyright (c) 2013 Leon Coto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
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
      },
      // just point to a non-existing file, useful for local configurations
      // that might be added to .gitignore
      optionalExtenstion: {
        files: {
          'tmp/config-optional.json': ['.config-base.json', '.config-optional.json']
        }
      },
      extendDeep: {
        options: {
          deep: true,
          defaults: {
            coffee: false,
            options: []
          }
        },
        files: {
          'tmp/config-deep.json': ['.config-base.json', '.config-local.json', '.config-deep.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'extend', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
