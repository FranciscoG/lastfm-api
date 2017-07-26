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
  isset(item) {
    return item !== void(0) && item !== null && item !== '';
  }
};