

Lastfm.prototype.loveTrack = function(opt) {
  var options = Object.assign(opt || {}, {method: 'track.love'});
  this.doScrobble(options);
};