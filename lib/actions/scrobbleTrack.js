Lastfm.prototype.scrobbleTrack = function(opt) {
  var options = Object.assign(opt || {}, {method: 'track.scrobble'});
  this.doScrobble(options);
};