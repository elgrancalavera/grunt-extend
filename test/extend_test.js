'use strict';

var grunt = require('grunt');
var fs = require('fs');
var path = require('path');

var read = function (filename) {
  return grunt.file.readJSON(filename);
};

var compare = function (filename, test) {
  test.expect(1);
  var actual = read(path.join('tmp', filename));
  var expected = read(path.join('test', 'expected', filename));
  test.deepEqual(actual, expected, 'Should be deeply equal: "' + filename + '".');
  test.done();
};

exports.extend = {
  json_files: function (test) {
    var dir = fs.readdirSync('tmp');
    test.expect(dir.length);
    grunt.util._.each(dir, function (filename) {
      var ok = true;
      try {
        read(path.join('tmp', filename));
      } catch (e) {
        ok = false;
      }
      test.ok(ok, 'All generated files should be JSON.');
    });
    test.done();
  },
  empty: function (test) {
    compare('config-empty.json', test);
  },
  default: function (test) {
    compare('config-default.json', test);
  },
  extended: function (test) {
    compare('config-base.json', test);
  },
  optional: function (test) {
    compare('config-optional.json', test);
  },
  deep: function (test) {
    compare('config-deep.json', test);
  }
};
