var crypto = require('crypto');

module.exports = {
  
  /**
   * @returns {string} current timestamp
   */
  now: function() {
    return new Date().getTime();
  },
  
  /**
   * md5 hash a string
   * 
   * @param {string} str 
   * @returns {string}
   */
  md5: function(str) {
    return crypto.createHash('md5').update(str, 'utf8').digest("hex");
  },

  /**
   * Checks if the provided arg is: not null, not an empty string, and not undefined
   * 
   * @param {any} item
   * @returns {boolean}
   */
  isset: function(item) {
    return item !== void(0) && item !== null && item !== '';
  },

  timestamp : function() {
    return Math.floor(new Date().getTime() / 1000);
  },

  /**
   * Check if a given value exists, throws erorr if not
   * 
   * @param {any} name - name to be used in the error message when thrown
   * @param {any} req - value to check for
   * @throws {Error}
   * @returns {boolean}
   */
  checkRequired: function (name, req) {
    if (!this.isset(req)) {
      throw new Error(`missing required parameter config.${name}`)
    }
    return true;
  },

  /**
   * make an MD5 hash auth token to be used in place of a password
   * 
   * @param {string} username 
   * @param {string} password 
   * @returns {string} the md5 hash: md5(username + md5(password))
   */
  makeAuthToken : function(username, password) {
    return this.md5(username + this.md5(password));
  }
  
};