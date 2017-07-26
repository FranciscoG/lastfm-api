const walk = require("./utils/walk.js");
const utils = require('./utils');

/**
 * Check if a given value exists, throws erorr if not
 * 
 * @param {any} name - name to be used in the error message when thrown
 * @param {any} req - value to check for
 * @throws {Error}
 * @returns {boolean}
 */
function checkRequired(name, req) {
  if (!utils.isset(req)) {
    throw new Error(`missing required parameter options.${name}`)
  }
  return true;
}

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
    if (!options) {
      throw new Error("missing options");
    }

    checkRequired('api_key', options.api_key);
    checkRequired('api_secret', options.api_secret);
    checkRequired('username', options.username);
    checkRequired('password', options.password);

    this.options = options;

    // load all modules inside the /actions folder and add them as methods
    // of this class binding it as well
    walk(__dirname + "/actions", "js", (methodName, methodPath) => {
      this[methodName] = require(methodPath).bind(this);
    });

  }

  /**
   * Internal console.log wrapper so it can be easily turned on/off
   * 
   * @memberof LastfmApi
   */
  log() {
    if (this.options.debug) {
      var args = Array.from(arguments);
      args.forEach(o => {
        console.log(JSON.stringify(o, null, 2));
      });
    }
  }
}

module.exports = LastfmApi;
