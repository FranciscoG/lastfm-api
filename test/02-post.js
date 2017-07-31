const chai = require('chai');
const expect = chai.expect;
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
    console.log(err);
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
        done(err);
      })

  });

  it('track.unlove', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada'
    };

    lastfm.post('track.unlove', trackInfo)
      .then(function(res){
        expect(res).to.deep.equal({});
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('track.scrobble', function(done){
    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada',
      timestamp : utils.timestamp(),
      album : 'Music has the right to Children'
    };

    lastfm.post('track.scrobble', trackInfo)
      .then(function(res){
        // console.log(res);
        expect(res.scrobbles.scrobble).to.be.a('object');
        done();
      })
      .catch(function(err){
        done(err);
      })
  })

  it('track.addTags', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada',
      tags : 'banana'
    };

    lastfm.post('track.addTags', trackInfo)
      .then(function(res){
        expect(res).to.deep.equal({});
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('track.removeTag', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada',
      tag : 'banana'
    };

    lastfm.post('track.removeTag', trackInfo)
      .then(function(res){
        expect(res).to.deep.equal({});
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('track.updateNowPlaying', function(done){

    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada'
    };

    lastfm.post('track.updateNowPlaying', trackInfo)
      .then(function(res){
        expect(res.nowplaying).to.be.a('object');
        expect(res.nowplaying.track['#text']).to.equal('Roygbiv');
        done();
      })
      .catch(function(err){
        done(err);
      })

  });

  it('should fail without a session key', function(done){

    var lastfmNoSession = new LastFMApi(config);
    var trackInfo = {
      track : 'Roygbiv',
      artist : 'Boards of Canada'
    };

    lastfmNoSession.post('track.updateNowPlaying', trackInfo)
      .then(function(res){
        done();
      })
      .catch(function(err){
        expect(err).to.equal('missing session key');
        done();
      })

  });

});
