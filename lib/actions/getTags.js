Lastfm.prototype.getTags = function(opt) {
  var the_callback = opt.callback;
  this._isTheMethodCaller = true;
  this._getInfo(Object.assign(opt, {
    callback: function(result) {
      this._isTheMethodCaller = false;
//      console.log("result: ", result);
      if(typeof the_callback == 'function') {
        if(result['@'].status == 'ok') {
          var tags = opt.track != undefined && opt.track != '' ? result.track.toptags.tag : result.artist.tags.tag;
          if(typeof tags == 'object' && !tags.length)
            tags = [tags];
          var args = {
              success: true,
              tags: tags || [],
              artist: opt.track != undefined && opt.track != '' ? result.track.artist.name : result.artist.name
            };
          if(opt.track != undefined && opt.track != '')
            args.track = result.track.name;
          the_callback(args);
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