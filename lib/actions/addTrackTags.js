Lastfm.prototype.addTrackTags = function(opt) {
  var options = Object.assign(opt || {}, {method: 'track.addTags'});
  this.doScrobble(options);
};