const request = require('superagent');

/**
 * Handles Last.fm authenticated GET requests
 * 
 * @param {string} method - the specific last.fm api method. example 'track.getTags'
 * @param {Object} opts - the parameters required for your specific lastFM get request method
 * @returns {Promise<Object>} A promise that contains the API request response.body object
 * @memberof LastfmApi
 */
function get(method, opts) {
  this.log('INFO', 'Starting lastfm Get request: ', method, opts);

  // default parameters are not available until node 6 and I'm targeting node >= 4 for now
  opts = opts || {};

  // the auth related stuff
  var getObj = {
    api_key: this.config.api_key,
    method : method,
    format : 'json',

    // most get requests don't need a session key but some of the user.* 
    // will default to the authenticated user if you omit the username param
    // So you need to the key in those few cases so it doesn't
    // hurt to always include it in ever request.
    sk : this.sessionKey
  };

  // all the non-auth related params
  // plus the session key
  for (let key in opts) {
    getObj[key] = opts[key];
  }

  return new Promise((resolve, reject) => {
    request
      .get(this.apiRoot)
      .query(getObj)
      .end((err, res) => {
        if (err || !res.ok) {
          this.log('ERROR', 'get ' + method, err || res);
          reject(err);
          return;
        }

        resolve(res.body);
      });
  });
};

module.exports = get;