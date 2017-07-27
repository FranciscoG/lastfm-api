//@ts-check
const request = require("superagent");
const utils = require("../utils");
const makeSignature = require('../utils/makeSig.js');

/**
 * Uses Last.FM's mobile session auth flow to get a session key so that you can make authenticated requests.
 * {@link http://www.last.fm/api/show/auth.getMobileSession}
 * 
 * @returns {Promise<string>} A promise that contains the session key
 * @memberof LastfmApi
 */
function getSessionKey() {

  var authToken = this.config.authToken
    ? this.config.authToken
    : utils.makeAuthToken(this.config.username, this.config.password);

  var opts = {
    username: this.config.username,
    authToken: authToken
  };
  var api_sig = makeSignature('auth.getMobileSession', this.config, opts);

  return new Promise((resolve, reject)=>{
    
    request
      .get("http://ws.audioscrobbler.com/2.0/")
      .query({
        method: 'auth.getMobileSession',
        username: this.config.username,
        authToken: authToken,
        api_key: this.config.api_key,
        api_sig: api_sig,
        format: "json"
      })
      .end((err, res)=>{
        if (err || !res.ok) {
          this.log("ERROR", 'getting session key', err);
          reject(err);
          return
        }

        this.sessionKey = res.body.session.key;
        resolve(res.body.session.key);
      });
  });
};

module.exports = getSessionKey;