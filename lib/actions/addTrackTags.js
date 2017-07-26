/**
 *  Add user provided tags to a specific track
 * 
 * @param {Object} opt
 * @param {string} opt.artist
 * @param {string} opt.track
 * @param {string} opt.tags - A comma delimited list of user supplied tags to apply to this track. Accepts a maximum of 10 tags.
 * @param {function} [opt.callback] - A function which receives a single object, of the form { success: true|false[, error: 'text description of the error']}. 
 * @memberof LastfmApi
 */
function addTrackTags(opt) {
  var options = Object.assign(opt || {}, {method: 'track.addTags'});
  this.doScrobble(options);
};

module.exports = addTrackTags;