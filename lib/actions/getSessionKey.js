
Lastfm.prototype.getSessionKey = function(callback) {
  var authToken = this.authToken ? this.authToken : md5(this.username + md5(this.password));
  var sig = 'api_key' + this.api_key + 'authToken' + authToken + 'methodauth.getMobileSessionusername' + this.username + this.api_secret;
  var api_sig = md5(sig);
  var lastfmObj = this;
  http.get({
    host: 'ws.audioscrobbler.com',
    port: 80,
    path: '/2.0/?method=auth.getMobileSession&' +
    'username=' + this.username + '&' + 
    'authToken=' + authToken + '&' +
    'api_key=' + this.api_key + '&' +
    'api_sig=' + api_sig
  }, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      try {
        var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
        parser.parseString(body, function(err, result) {
          var ret = {
            success: result['@'].status == 'ok'
          };
          if(ret.success) {
            ret.session_key = result.session.key;
            lastfmObj.session_key = result.session.key;
          } else
            ret.error = result.error['#'];
          if(typeof callback == 'function') {
            callback(ret);
          }
        });
      } catch(e) {
        this.log("Exception: ", e);
      }
    });
  });
};