Lastfm.prototype.getPlays = function(opt) {
  var the_callback = opt.callback;
  this._isTheMethodCaller = true;
  this._getInfo(Object.assign(opt, {
    callback: function(result) {
      this._isTheMethodCaller = false;
      if(typeof the_callback == 'function') {
        if(result['@'].status == 'ok') {
          var ret = {
            success: true,
            plays: opt.track != undefined && opt.track != '' ? result.track.userplaycount : result.artist.stats.userplaycount,
            artist: opt.track != undefined && opt.track != '' ? result.track.artist.name : result.artist.name
          };
          if(ret.plays == undefined)
            ret.plays = 0;
          if(opt.track != undefined && opt.track != '')
            ret.track = result.track.name;
          the_callback(ret);
        } else {
          the_callback({
            success: false,
            error: result.error['#']
          });
        }
      }
    }
  }));
};