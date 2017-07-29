var crypto = require('crypto');

/**
 * a collection of small utility functions used by LastFmApi class
 * @module utils
 */

module.exports = {
 
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
   * Returns a timestamp needed by some of the api methods (ex track.scrobble). 
   * <br><br>
   * from their documentation:<br>
   * The time the track started playing, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
   * @memberof LastfmApi
   * @returns {string} timestamp
   */
  timestamp : function() {
    return Math.floor(new Date().getTime() / 1000);
  },

  /**
   * Check if a given value exists, throws erorr if not
   * 
   * @param {string} name - name to be used in the error message when thrown
   * @param {any} req - value to check for
   * @throws Will throw an error if the argument is null, undefined, or empty.
   * @returns {boolean}
   */
  checkRequired: function (name, req) {
    if (!req) {
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