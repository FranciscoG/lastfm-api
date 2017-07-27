const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');

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

describe('Handle GET requests: ', function(){
  
  it('track.getTopTags', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada',
      autocorrect: 1  // optional
    };

    lastfm.get('track.getTopTags', trackInfo)
      .then(function(res){
        expect(res.toptags.tag).to.be.a('array');
        done();
      })
      .catch(function(err){
        return done(err);
      })

  });

  it('user.getTopTracks', function(done){

    var userInfo = {
      user : config.username
    };

    lastfm.get('user.getTopTracks', userInfo)
      .then(function(res){
        expect(res.toptracks.track).to.be.a('array');
        done();
      })
      .catch(function(err){
        return done(err);
      })

  });

});

