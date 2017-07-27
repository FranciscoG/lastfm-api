//@ts-check
const request = require("superagent");
const utils = require("../utils");
const makeSignature = require("../utils/makeSig.js");

/**
 * Handles Last.fm authenticated GET requests
 * 
 * @param {string} method - the specific last.fm api method. example 'track.getTags'
 * @param {Object} opts - the parameters required for your specific lastFM get request method
 * @returns {Promise<Object>} A promise that contains the API request response.body object
 * @memberof LastfmApi
 */
module.exports = function get(method, opts) {
  this.log("INFO", "Starting lastfm Get request: ", method, opts);
  this.log("INFO", "Using lastfm session key: " + this.sessionKey);

  // default parameters are not available until node 6 and I'm targeting node >= 4 for now
  opts = opts || {};

  opts.sk = this.sessionKey;

  var api_sig = makeSignature(method, this.config, opts);

  // the auth related stuff
  var getObj = {
    api_key: this.config.api_key,
    method : method,
    api_sig: api_sig,
    format : "json"
  };

  // all the non-auth related params
  // plus the session key
  for (let key in opts) {
    getObj[key] = opts[key];
  }

  return new Promise((resolve, reject) => {
    request
      .get("http://ws.audioscrobbler.com/2.0/")
      .query(getObj)
      .end((err, res) => {
        if (err || !res.ok) {
          this.log("ERROR", "getting session key", err);
          reject(err);
          return;
        }

        resolve(res.body);
      });
  });
};
