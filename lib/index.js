var http = require('http');
var crypto = require('crypto');
var xml2js = require('xml2js');
var querystring = require('querystring');

var Lastfm = function(options) {
  options = options || {};
  var api_key;
  var api_secret;
  var username;
  var password;
  var authToken;
  var session_key;
  
  var self = this;
  var _isTheMethodCaller = false;

  this.debug = options.debug || false;
  
  this.api_key = options.api_key;

  if (options.api_secret !== undefined && options.api_secret !== '') {
    this.api_secret = options.api_secret;
  }
  
  if (options.username !== undefined && options.username !== '') {
    this.username = options.username;
  }
  
  if (options.password !== undefined && options.password !== '') {
    this.password = options.password;
  }

  if (options.session_key !== undefined && options.session_key !== '') {
    this.session_key = options.session_key;
  }
  
  if (options.authToken !== undefined && options.authToken !== '') {
    this.authToken = options.authToken;
  }

  // Privileged method - available to public methods but not to the instance itself.
  self._getInfo = function(opt) {
    if(!self._isTheMethodCaller) throw new Error('Security exception.');
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
      if(this.debug)
        console.log("Exception getting track info: ", e);
    }
  };
};

module.exports = Lastfm;
