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
    console.log(err);
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
        done(err);
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
        done(err);
      })

  });

  it('user.getInfo - self', function(done){

    lastfm.get('user.getInfo')
      .then(function(res){
        expect(res.user.name).to.equal(config.username);
        expect(res.user.image).to.be.a('array');
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('user.getInfo - another user\'s info', function(done){

    var userInfo = {
      user : 'ChilloutMixer'
    };

    lastfm.get('user.getInfo', userInfo)
      .then(function(res){
        expect(res.user.name).to.equal('ChilloutMixer');
        expect(res.user.image).to.be.a('array');
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('user.getTopArtists', function(done){

    var userInfo = {
      user : 'ChilloutMixer'
    };

    lastfm.get('user.getTopArtists', userInfo)
      .then(function(res){
        expect(res.topartists.artist).to.be.a('array');
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('library.getArtists', function(done){

    var userInfo = {
      user : 'ChilloutMixer'
    };

    lastfm.get('library.getArtists', userInfo)
      .then(function(res){
        expect(res.artists.artist).to.be.a('array');
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

});

