Lastfm.prototype.unloveTrack = function(opt) {
  var options = Object.assign(opt || {}, {method: 'track.unlove'});
  this.doScrobble(options);
};