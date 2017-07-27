const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const LastFMApi = require('../lib');
const config = require('./config.js');

describe('Class instantiation: ', function(){
  
  it('Successfuly create instance of class', function(done){
    expect(function(){ new LastFMApi(config) }).to.not.throw();
    done();
  });

  it('Pass using authToken instead of password', function(done){
    var goodConfig = {
      api_key : 'zzzz',
      api_secret: 'xxxx',
      username : 'mumbly-joe',
      authToken : 'pretend_this_is_gibberish'
    }
    expect(function(){ new LastFMApi(goodConfig) }).to.not.throw();
    done();
  });

  it('Fail without any options', function(done){
    expect(function(){ new LastFMApi() }).to.throw("missing config");
    done();
  });

  it('Fail with empty object', function(done){
    expect(function(){ new LastFMApi({}) }).to.throw("missing required parameter config.api_key");
    done();
  });

  it('Fail without api_key', function(done){
    var badConfig = {
      username: 'xxxx',
      api_secret : 'zzzz',
      password : 'password'
    }
    expect(function(){ new LastFMApi(badConfig) }).to.throw('missing required parameter config.api_key');
    done();
  });

  it('Fail without ', function(done){
    var badConfig = {
      api_key : 'zzzz',
      username: 'xxxx',
      password : 'password'
    }
    expect(function(){ new LastFMApi(badConfig) }).to.throw('missing required parameter config.api_secret');
    done();
  });

  it('Fail without username', function(done){
    var badConfig = {
      api_key : 'zzzz',
      api_secret: 'xxxx',
      password : 'password'
    }
    expect(function(){ new LastFMApi(badConfig) }).to.throw('missing required parameter config.username');
    done();
  });

  it('Fail without password OR authToken', function(done){
    var badConfig = {
      api_key : 'zzzz',
      api_secret: 'xxxx',
      username : 'boo-urns'
    }
    expect(function(){ new LastFMApi(badConfig) }).to.throw('missing required parameter config.password or config.authToken');
    done();
  });

  it('Fail because empty string', function(done){
    var badConfig = {
      api_key : 'zzzz',
      api_secret: 'xxxx',
      username : 'boo-urns',
      password : ''
    }
    expect(function(){ new LastFMApi(badConfig) }).to.throw('missing required parameter config.password');
    done();
  });


});

run();