Lastfm.prototype.getArtistInfo = function(opt) {
  opt = opt || {};
  opt.track = '';
  if(opt.artist == undefined || opt.artist == '' && typeof opt.callback == 'function') {
    opt.callback({
      success: false,
      error: 'Artist not specified.'
    });
  } else if(typeof opt.callback == 'function') {
    var the_callback = opt.callback;
    this._isTheMethodCaller = true;
    this._getInfo(Object.assign(opt, {
      callback: function(result) {
        this._isTheMethodCaller = false;
        if(result['@'].status == 'ok') {
          the_callback({
            success: true,
            artistInfo: result.artist
          });
        } else {
          the_callback({
            success: false,
            error: result.error['#']
          });
        }
      }
    }));
  }
};