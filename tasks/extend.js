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
        // just write the empty files by now to allow all tests to fail
        grunt.file.write(f.dest, '');
    });

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
