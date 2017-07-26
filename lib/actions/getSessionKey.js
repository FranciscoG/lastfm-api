const request = require('superagent');
const utils = require('../utils');

module.exports = function getSessionKey(callback) {
  var authToken = this.options.authToken ? this.options.authToken : utils.md5(this.options.username + utils.md5(this.options.password));
  var sig = 'api_key' + this.options.api_key + 'authToken' + authToken + 'methodauth.getMobileSessionusername' + this.options.username + this.options.api_secret;
  var api_sig = utls.md5(sig);
  
  request
    .get("http://ws.audioscrobbler.com/2.0/")
    .query({
      username: this.options.username,
      authToken: authToken,
      api_key: this.options.api_key,
      api_sig: api_sig,
      format: "json"
    })
    .end(function(err, res) {
      console.log(err, res.body);
    });
};