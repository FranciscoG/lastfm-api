const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');

var lastfm = new LastFMApi(config);

describe('Get Session Key', function(){

   it('Successfuly get a session key', function(done){    
    lastfm.getSessionKey(function(err, sessionKey){
      if (err) return done(err);
      expect(sessionKey).to.be.a('string');
      done();
    });

  });

});

