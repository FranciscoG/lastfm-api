//@ts-check
const request = require("superagent");
const utils = require("../utils");

/**
 * Uses Last.FM's mobile session auth flow to get a session key so that you can make authenticated requests.
 * {@link http://www.last.fm/api/show/auth.getMobileSession}
 * 
 * @param {function} callback 
 * @memberof LastfmApi
 */
module.exports = function getSessionKey(callback) {
  if (typeof callback !== "function") {
    this.log("ERROR", "getSessionKey", "missing callback function");
    return;
  }

  var authToken = this.options.authToken
    ? this.options.authToken
    : utils.md5(this.options.username + utils.md5(this.options.password));

  // create signature based on parameters sent to api
  // http://www.last.fm/api/authspec#8
  var sig = [
    'api_key' + this.options.api_key,
    'authToken' + authToken,
    'method'+'auth.getMobileSession',
    'username' + this.options.username
  ].sort().join('') + this.options.api_secret

  var api_sig = utils.md5(sig);

  request
    .get("http://ws.audioscrobbler.com/2.0/")
    .query({
      method: 'auth.getMobileSession',
      username: this.options.username,
      authToken: authToken,
      api_key: this.options.api_key,
      api_sig: api_sig,
      format: "json"
    })
    .end(function(err, res) {
      callback(err, res.body.session.key);
    });
};
