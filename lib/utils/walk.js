var fs = require('fs');
var path = require('path');

/**
 * a module for syncronously walking a directory and running a function each successful match of a file extension.
 * @module utils/walk
 */

/**
 * recursively walks a dir and looks for files matching provided extension
 * 
 * @param {string} dir - directory to begin walking in.  Requires an absoulte path,  relative path won't work
 * @param {string} ext - file extension to search for
 * @param {function} cb - will be run on each successful match. Gets passed file name (without extension) and full path
 */
function walk(dir, ext, cb) {
  fs.readdirSync(dir).forEach(function(file) {
    var _path = path.resolve(dir, file);

    // add the dot if missing
    ext = /^\./.test(ext) ? ext : '.' + ext;

    var check = fs.statSync(_path);

    if (check && check.isDirectory()) {
      walk(_path, ext);
    } else if (file && file.indexOf(ext) > -1) {
      cb(file.split('.')[0], _path);
    }
  });
}
module.exports = walk;
