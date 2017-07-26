var request = require("superagent");

// TODO: convert to handling the JSON response
function handleResponse(result, callback) {
  var tracks = [];
  var numPages = result.artisttracks["@"].totalPages;
  for (var i = 0; i < result.artisttracks.track.length; i++) {
    if (tracks.indexOf(result.artisttracks.track[i].name) < 0)
      tracks.push(result.artisttracks.track[i].name);
  }
  if (result.artisttracks["@"].page < numPages) {
    opt.page++;
    this.getTracks(opt);
  } else {
    callback({
      success: true,
      artist: result.artisttracks["@"].artist,
      tracks: tracks
    });
  }
}

/**
 * Get a list of tracks by a given artist scrobbled by this user, including scrobble time. 
 * Can be limited to specific timeranges, defaults to all time.
 * 
 * @param {Object} opt 
 * @param {string} opt.artist
 * @param {function} opt.callback
 */
function getTracks(opt) {
  var page = opt.page ? opt.page : 1;

  request
    .get("http://ws.audioscrobbler.com/2.0/")
    .query({
      method: "user.getartisttracks",
      page: page,
      api_key: this.options.api_key,
      autocorrect: "1",
      user: this.options.username,
      artist: encodeURIComponent(opt.artist),
      format: "json"
    })
    .end(function(err, res) {
      if (err || !res.ok) {
        this.log("ERROR", "getTracks", err);
        return opt.callback({
          success: false,
          error: err
        });
      }

      if (res.body.error) {
        return opts.callback({
          success: false,
          error: res.body.message
        });
      }

      handleResponse(res.body, opt.callback);
    });
}
