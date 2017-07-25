Lastfm.prototype.doGet = function(opt) {
  var lastfm = this;
  var the_callback = opt.callback;
  opt.args.api_key = this.api_key;
  opt.args.method = opt.method;
  var path = '/2.0/?' + querystring.stringify(opt.args);
  http.get({
    host: 'ws.audioscrobbler.com',
    port: 80,
    path: path
  }, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
      parser.parseString(body, function(err, result) {
        if (typeof the_callback == 'function') {
          the_callback(result);
        }
      });
    });
  });
};