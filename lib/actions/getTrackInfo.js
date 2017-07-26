
module.exports =  function getTrackInfo(opt) {
  opt = opt || {};
  if(opt.artist == undefined || opt.artist == '' && typeof opt.callback == 'function') {
    opt.callback({
      success: false,
      error: 'Artist not specified.'
    });
  } else if(opt.track == undefined || opt.track == '' && typeof opt.callback == 'function') {
    opt.callback({
      success: false,
      error: 'Track not specified.'
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
            trackInfo: result.track
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