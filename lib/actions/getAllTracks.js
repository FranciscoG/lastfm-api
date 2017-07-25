Lastfm.prototype.getAllTracks = function(opt) {
  var lastfm = this;
  var the_callback = opt.callback;
  var tracks = [];
  opt.callback = function(result) {
    if(result['@'].status == 'failed') {
      the_callback({
        success: false,
        reason: result.error['#']
      });
    } else {
      var numPages = result.artisttracks['@'].totalPages;
      for(var i=0;i<result.artisttracks.track.length;i++) {
        if(tracks.indexOf(result.artisttracks.track[i].name) < 0)
          tracks.push(result.artisttracks.track[i].name);
      }
      if(result.artisttracks['@'].page < numPages) {
        opt.page++;
        lastfm.getTracks(opt);
      } else {
        the_callback({success: true, artist: result.artisttracks['@'].artist, tracks: tracks});
      }
    }
  };
  opt.page = 1;
  this.getTracks(opt);
};