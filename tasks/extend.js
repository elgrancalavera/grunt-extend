/*
 * grunt-extend
 * https://github.com/grancalavera/grunt-extend
 *
 * Copyright (c) 2013 Leon Coto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fail = function () {
      grunt.fail.fatal('grunt-extend failed.');
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var pkg = grunt.file.readJSON('package.json');
  var desc = pkg.description;
  grunt.registerMultiTask('extend', desc, function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      defaults: {}
    });

    grunt.verbose.writeflags(options, 'Options');
    if (!this.files.length) {
        grunt.log.error('All targets must specify at least one file.');
        fail();
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      if (!f.dest) {
          grunt.log.error('All targets must specify a destination file.');
          fail();
      }
      var data = [{}, options.defaults];

      grunt.verbose.writeflags(options, 'opts:');
      grunt.verbose.writeflags(data, 'args:');

      grunt.util._.each(f.src, function (filename) {
        data.push(grunt.file.readJSON(filename));
      });

      if (options.deep) {
        data = grunt.util._.merge.apply(grunt.util._, data);
      } else {
        data = grunt.util._.extend.apply(grunt.util._, data);
      }

      grunt.file.write(f.dest, JSON.stringify(data, null, 4));
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
