const walk = require('./utils/walk.js');
const utils = require('./utils');

class LastfmApi {
  /**
   * Creates an instance of LastfmApi.
   * @param {Object} config
   * @param {string} config.api_key
   * @param {string} config.api_secret
   * @param {string} config.username
   * @param {string} config.password
   * @param {string} [config.authToken] - you can use this instead of password, where authToken = md5(username + md5(password))
   * @param {string} [config.sessionKey] - provide an already obtained session key which have an infinite lifetime but are revokable by the user
   */
  constructor(config) {
    if (!config) {
      throw new Error('missing config');
    }

    utils.checkRequired('api_key', config.api_key);
    utils.checkRequired('api_secret', config.api_secret);
    utils.checkRequired('username', config.username);
    if (!config.password) {
      // check for authToken if password was left undefined
      utils.checkRequired('password or config.authToken', config.authToken);
    } else {
      // just to make sure password isn't empty
      utils.checkRequired('password', config.password);
    }

    if (config.sessionKey) {
      this.sessionKey = config.sessionKey;
      delete config.sessionKey; // because we iterate of the config object later and it will cause issues
    }

    this.config = config;

    this.apiRoot = 'https://ws.audioscrobbler.com/2.0/';
  
    // load all modules inside the /actions folder and add them as methods
    // of this class binding it as well
    walk(__dirname + '/actions', 'js', (methodName, methodPath) => {
      this[methodName] = require(methodPath).bind(this);
    });

    // timestamp is required for some api methods so I'm exposing this utility
    // I use to generate one as a member of this class
    this.timestamp = utils.timestamp;
  }

  log() {
    var args = Array.from(arguments);
    
    if (args.length === 0) {return};

    if (this.config.debug || args[0].toUpperCase() === 'ERROR') {
      var str = '';
      args.forEach(o => {
        str += JSON.stringify(o, null, 2) + ' ';
      });
      console.log(str);
    }
  }
}

module.exports = LastfmApi;
