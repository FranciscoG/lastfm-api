

module.exports = function getSimilarArtists(opt) {
  var lastfm = this;
  var the_callback = opt.callback;
  delete opt.callback;
  lastfm.doGet({
    method: 'artist.getsimilar',
    args: opt,
    callback: function(result) {
      if(typeof the_callback === 'function') {
        if (result['@'].status == 'ok') {
          the_callback({
            success: true,
            similarArtists: result.similarartists.artist
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