const utils = require('../utils');

/**
 * Private function to make post request to get artist info
 * 
 * @param {Object} opt 
 */
module.exports = function(opt) {
  
  if (!utils.isset(opt.artist) && typeof opt.callback === "function") {
    return opt.callback({
      success: false,
      error: "Artist not specified."
    });
  }

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

  try {
    if (
      opt.artist == undefined ||
      (opt.artist == "" && typeof opt.callback == "function")
    ) {
      opt.callback({
        "@": { status: "error" },
        error: { "#": "Artist not specified." }
      });
    } else {
      http.get(
        {
          host: "ws.audioscrobbler.com",
          port: 80,
          path:
            "/2.0/?method=" +
            (opt.track != undefined && opt.track != "" ? "track" : "artist") +
            ".getinfo&api_key=" +
            this.api_key +
            "&autocorrect=1&username=" +
            this.username +
            "&artist=" +
            encodeURIComponent(opt.artist) +
            (opt.track == undefined || opt.track == ""
              ? ""
              : "&track=" + encodeURIComponent(opt.track))
        },
        function(res) {
          var body = "";
          res.on("data", function(chunk) {
            body += chunk;
          });
          res.on("end", function() {
            var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
            parser.parseString(body, function(err, result) {
              if (typeof opt.callback == "function") {
                opt.callback(result);
              }
            });
          });
        }
      );
    }
  } catch (e) {
    this.log("Exception getting track info: ", e);
  }
};
