const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');

var lastfm = new LastFMApi(config);

describe('Handle authenticaed POST requests', function(){

   it('track.love', function(done){

    var love = {
      track : 'Roygbiv',
      artist : 'Boards of Canada'
    };

    lastfm.getSessionKey()
      .then(function(sessionkey) {

        lastfm.post('track.love', love)
          .then(function(res){
            console.log(res);
            expect(res).to.be.a('Object');
            done();
          })
          .catch(function(err){
            return done(err);
          })

      })
      .catch(function(err){
        return done(err);
      })

  });

});

