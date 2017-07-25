Lastfm.prototype.doScrobble = function(options) {
  if(this.debug)
    console.log("Starting scrobbleTrack: ", options); 
  options = options || {};
  if((this.api_secret == undefined || this.api_secret == '') && typeof options.callback == 'function') {
    options.callback({
      success: false,
      error: 'API Secret not specified.'
    });
  }
  if((this.username == undefined || this.username == '') && typeof options.callback == 'function') {
    options.callback({
      success: false,
      error: 'Username not specified.'
    });
  }
  if(((this.password == undefined || this.password == '') && !this.authToken) && typeof options.callback == 'function') {
    options.callback({
      success: false,
      error: 'Password not specified.'
    });
  }

  options.timestamp = options.timestamp != undefined ? Math.floor(options.timestamp) :  Math.floor(now() / 1000);
  
  if(this.debug)
    console.log("Using session key: " + this.session_key + "\n\n");
  var authToken = this.authToken ? this.authToken : md5(this.username + md5(this.password));
  var sig = 'api_key' + this.api_key + 'artist' + options.artist + 'method' + options.method + 'sk' + this.session_key + (options.tags != null ? 'tags' + options.tags : '') + 'timestamp' + options.timestamp + 'track' + options.track + this.api_secret;
  var api_sig = md5(sig);

  var post_obj = {
    api_key: this.api_key,
    method: options.method,
    sk: this.session_key,
    api_sig: api_sig,
    timestamp: options.timestamp,
    artist: options.artist,
    track: options.track
  };
  
  if(options.tags != null)
    post_obj.tags = options.tags;
  var post_data = querystring.stringify(post_obj);
  
//  console.log("post_data: ", post_data);
  
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
//      console.log('Response: ' + chunk);
      var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
      parser.parseString(chunk, function(err, result) {
        try {
          if (result['@'].status == 'ok') {
//            console.log("Track scrobbled (" + options.method + " )");
            if(typeof options.callback == 'function') {
              options.callback({
                success: true
              });
            }
          } else {
            if(typeof options.callback == 'function') {
              options.callback({
                success: false,
                error: result.error['#']
              });
            }
          }
        } catch(e) {
          if(this.debug)
            console.log("Exception parsing scrobble result: ", e);
        }
      });
    });
  });
  post_req.write(post_data);
  post_req.end();
};