# grunt-extend

This task extends JavaScript Objects with other JavaScript objects, pretty much
in the same way that `_.extend()` does it. Once the final object is created, the
task attempts to `JSON.stringify(yourObject)` and write it to a file.

Quite useful for:

- projects that generate multiple clients
- projects that share configuration values across multiple clients
- sharing base configuration values across environments



