// var http = require('http');
// var crypto = require('crypto');
// var xml2js = require('xml2js');
// var querystring = require('querystring');

const walk = require('./utils/walk.js');

/**
 * @class LastfmApi
 */
class LastfmApi {
  /**
   * Creates an instance of LastfmApi.
   * @param {Object} options
   * @param {string} options.api_key
   * @param {string} options.api_secret
   * @param {string} options.username
   * @param {string} options.password
   * @param {string} [options.authToken] - Optional, you can use this instead of password, where authToken = md5(username + md5(password))
   */
  constructor(options) {
    if (!options) { throw new Error('missing options'); }

    this.options = options;

    // load all modules inside the /actions folder and add them as methods
    // of this class binding it as well
    walk('./actions', 'js', (methodName, methodPath)=>{
      this[methodName] = require(methodPath).bind(this);
    });
    
  }


  /**
   * Internal console.log wrapper so it can be easily turned on/off
   * 
   * @memberof LastfmApi
   */
  log(){
    if (this.options.debug) {
      var args = Array.from(arguments);
      args.forEach((o)=>{
        console.log(JSON.stringify(o,null, 2));
      });
    }
  }

}

module.exports = LastfmApi;
