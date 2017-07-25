Lastfm.prototype.scrobbleNowPlayingTrack = function(opt) {
  var options = Object.assign(opt || {}, {method: 'track.updateNowPlaying'});
  this.doScrobble(options);
};