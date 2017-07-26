var utils = require('../utils');


/**
 * Creates a hashed signature based user creds and other provided properties
 * 
 * @param {Object} options - LastfmApi.options
 * @param {Object} opts - options provided by current class method
 */
function makeSignature(options, opts) {
  var authToken = options.authToken ? options.authToken : utils.md5(options.username + utils.md5(options.password));
  var tags = utils.isset(opts.tags) ? 'tags' + opts.tags : '';
  var sig = 'api_key' + options.api_key + 'artist' + opts.artist + 'method' + opts.method + 'sk' + options.session_key + tags + 'timestamp' + opts.timestamp + 'track' + opts.track + options.api_secret;
  return utils.md5(sig);
}

/**
 * Utility function to perform all kinds of scrobbling related actions
 * 
 * @param {any} opts 
 */
module.exports = function(opts) {
  this.log("Starting scrobbleTrack: ", opts); 

  opts = opts || {};
  
  if ( !utils.isset(this.options.api_secret) && typeof opts.callback == 'function') {
    opts.callback({
      success: false,
      error: 'API Secret not specified.'
    });
  }

  if ( !utils.isset(this.options.username) && typeof opts.callback == 'function') {
    opts.callback({
      success: false,
      error: 'Username not specified.'
    });
  }

  if ((!utils.isset(this.options.password) && !this.options.authToken) && typeof opts.callback == 'function') {
    opts.callback({
      success: false,
      error: 'Password not specified.'
    });
  }

  opts.timestamp = opts.timestamp != undefined ? Math.floor(opts.timestamp) :  Math.floor(utils.now() / 1000);
  
  this.log("Using session key: " + this.options.session_key + "\n\n");
  
  var api_sig = makeSignature(this.options, opts);

  var post_obj = {
    api_key: this.options.api_key,
    method: opts.method,
    sk: this.options.session_key,
    api_sig: api_sig,
    timestamp: opts.timestamp,
    artist: opts.artist,
    track: opts.track
  };
  
  if(opts.tags != null) {
    post_obj.tags = opts.tags;
  }
  var post_data = querystring.stringify(post_obj);
  
//  this.log("post_data: ", post_data);
  
  var post_options = {
    host: 'ws.audioscrobbler.com',
        port: '80',
        path: '/2.0/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
  };
  
  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
//      this.log('Response: ' + chunk);
      var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
      parser.parseString(chunk, function(err, result) {
        try {
          if (result['@'].status == 'ok') {
//            this.log("Track scrobbled (" + opts.method + " )");
            if(typeof opts.callback == 'function') {
              opts.callback({
                success: true
              });
            }
          } else {
            if(typeof opts.callback == 'function') {
              opts.callback({
                success: false,
                error: result.error['#']
              });
            }
          }
        } catch(e) {
          this.log("Exception parsing scrobble result: ", e);
            
        }
      });
    });
  });
  post_req.write(post_data);
  post_req.end();
};