

module.exports = function(opt) {
  try {
    if(opt.artist == undefined || opt.artist == '' && typeof opt.callback == 'function') {
      opt.callback({
        '@': {status: 'error'},
        error: {'#': 'Artist not specified.'}
      });
    } else {
      http.get({
        host: 'ws.audioscrobbler.com',
        port: 80,
        path: '/2.0/?method=' + (opt.track != undefined && opt.track != '' ? 'track' : 'artist') + '.getinfo&api_key=' + this.api_key + '&autocorrect=1&username=' + this.username + '&artist=' + encodeURIComponent(opt.artist) + (opt.track == undefined || opt.track == '' ? '' : '&track=' + encodeURIComponent(opt.track))
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
    }
  } catch(e) {
    this.log("Exception getting track info: ", e);
      
  }
};