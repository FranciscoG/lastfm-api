const _getInfo = require("../utils/_getInfo.js");
const utils = require("../utils");

/**
 * 
 * 
 * @param {Object} opt 
 * @param {string} opt.artist
 * @param {string} [opt.track]
 * @param {function} opt.callback
 * @memberof LastfmApi
 */
module.exports = function getArtistInfo(opt) {
  opt = opt || {};
  opt.track = "";

  if (typeof opt.callback !== "function") {
    return; 
  }
  
  if (!utils.isset(opt.artist)) {
    return opt.callback({
      success: false,
      error: "Artist not specified."
    });
  }

  var user_cb = opt.callback;

  // redefine the callback
  opt.callback = function(result) {
    if (result["@"].status == "ok") {
      user_cb({
        success: true,
        artistInfo: result.artist
      });
    } else {
      user_cb({
        success: false,
        error: result.error["#"]
      });
    }
  };

  _getInfo(opt).bind(this);
  
}