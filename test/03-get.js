const chai = require('chai');
const expect = chai.expect;
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
      track : 'roygbiv',
      artist : 'Boards of Canada',
      autocorrect: 1
    };

    lastfm.get('track.getTopTags', trackInfo)
      .then(function(res){
        expect(res.toptags.tag).to.be.a('array');
        done();
      })
      .catch(function(err){
        expect(err).to.be.undefined;
        done();
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
        expect(err).to.be.undefined;
        done();
      })

  });

  it('user.getInfo - self using session key', function(done){
    // session is already stored and added to every get request
    
    lastfm.get('user.getInfo')
      .then(function(res){
        expect(res.user.name).to.equal(config.username);
        expect(res.user.image).to.be.a('array');
        done();
      })
      .catch(function(err){
        expect(err).to.be.undefined;
        done();
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
        expect(err).to.be.undefined;
        done();
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
        expect(err).to.be.undefined;
        done();
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
        expect(err).to.be.undefined;
        done();
      })

  });

   it('fail a get request because missing required paramters', function(done){

    lastfm.get('track.getTopTags', {})
      .then(function(res){
        done();
      })
      .catch(function(err){
        expect(err.response.res.statusMessage).to.equal('artist param missing');
        done();
      })

  });

});

