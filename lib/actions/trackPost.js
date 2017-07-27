var querystring = require("querystring");
var request = require("superagent");
var utils = require("../utils");

/**
 * Creates a hashed signature based user creds and other provided properties
 * 
 * @param {Object} config - LastfmApi.config
 * @param {Object} opts - options provided by current class method
 */
function makeSignature(config, opts) {
  var authToken = config.authToken
    ? config.authToken
    : utils.md5(config.username + utils.md5(config.password));
  
  var tags = utils.isset(opts.tags) ? "tags" + opts.tags : "";
  
  var sig =
    "api_key" + config.api_key +
    "artist" + opts.artist +
    "method" + opts.method +
    "sk" + config.session_key +
    tags + 
    "timestamp" + opts.timestamp + 
    "track" + opts.track +
    config.api_secret;

  return utils.md5(sig);
}

/**
 * Utility function to post a scrobble to LastFM
 * 
 * @param {string} method
 * @param {Object} opts 
 * @param {string} opts.track
 * @param {string} opts.artist
 * @param {string} [opts.tags]
 * @param {string} [opts.timestamp]
 * @param {function} [callback]
 * @memberof LastfmApi
 */
module.exports = function trackPost(method, opts, callback) {
  this.log("INFO", "Starting scrobbleTrack: ", opts);

  opts = opts || {};
  callback = typeof callback === "function" ? callback : function() {};

  opts.timestamp = opts.timestamp ? Math.floor(opts.timestamp) : Math.floor(utils.now() / 1000);

  this.log("INFO", "Using session key: " + this.config.session_key + "\n");

  var api_sig = makeSignature(this.config, opts);

  var post_obj = {
    api_key: this.config.api_key,
    method: opts.method,
    sk: this.config.session_key,
    api_sig: api_sig,
    timestamp: opts.timestamp,
    artist: opts.artist,
    track: opts.track,
    format: "json"
  };

  if (utils.isset(opts.tags)) {
    post_obj.tags = opts.tags;
  }

  var post_data = querystring.stringify(post_obj);

  //  console.log("post_data: ", post_data);

  request
    .post("http://ws.audioscrobbler.com/2.0/")
    .type("form")
    .set("Content-Length", post_data.length)
    .send(post_obj)
    .end((err, res) => {
      if (err || !res.ok) {
        this.log("ERROR", err);
        return callback(true, err || res.body)
        return;
      }

      if (res.body.error) {
        return callback(true, res.body);
      }

      callback(null, res.body);
    });
};
