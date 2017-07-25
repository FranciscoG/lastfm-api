Lastfm.prototype.getTracks = function(opt) {
//  var the_callback = opt.callback;
  var page = opt.page ? opt.page : 1;
  http.get({
    host: 'ws.audioscrobbler.com',
    port: 80,
    path: '/2.0/?method=user.getartisttracks&page=' + page + '&api_key=' + this.api_key + '&autocorrect=1&user=' + this.username + '&artist=' + encodeURIComponent(opt.artist)
  }, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
      parser.parseString(body, function(err, result) {
        if (typeof opt.callback == 'function') {
          opt.callback(result);
        }
      });
    });
  });
};