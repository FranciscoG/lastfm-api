const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');

var lastfm = new LastFMApi(config);

describe('Get Session Key', function(){

   it('Successfuly get a session key', function(done){
    lastfm.getSessionKey()
      .then(function(sessionKey){
        expect(sessionKey).to.be.a('string');
        done();
      })
      .catch(function(err){
        return done(err);
      })

  });

});

