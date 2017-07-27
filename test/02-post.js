const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');
const utils = require('../lib/utils');

var sessionkey = null;
var lastfm = new LastFMApi(config);
lastfm.getSessionKey()
  .then(function(sk) {
    sessionkey = sk;
    run();
  })
  .catch(function(err){
    done(err);
    run();
  })

describe('Handle authenticaed POST requests: ', function(){

   it('track.love', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada'
    };

    lastfm.post('track.love', trackInfo)
      .then(function(res){
        expect(res).to.deep.equal({});
        done();
      })
      .catch(function(err){
        return done(err);
      })

  });

  it('track.scrobble', function(done){
    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada',
      timestamp : utils.timestamp(),
      album : "Music has the right to Children"
    };

    lastfm.post('track.scrobble', trackInfo)
      .then(function(res){
        // console.log(res);
        expect(res.scrobbles.scrobble).to.be.a('object');
        done();
      })
      .catch(function(err){
        return done(err);
      })
  })

});
