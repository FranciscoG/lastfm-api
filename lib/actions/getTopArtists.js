

Lastfm.prototype.getTopArtists = function(opt) {
  var lastfm = this;
  var the_callback = opt.callback;
  delete opt.callback;
  lastfm.doGet({
    method: 'user.gettopartists',
    args: opt,
    callback: function(result) {
      if(typeof the_callback === 'function')
      {
        if (result['@'].status == 'ok') {
          the_callback({
            success: true,
            topArtists: result.topartists.artist
          });
        } else {
          the_callback({
            success: false,
            error: result.error['#']
          });
        }
      }
    }
  });
};