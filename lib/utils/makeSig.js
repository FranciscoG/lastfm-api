var utils = require('./index');

/**
 * a module for generating the md5 hashed signature required by last.fm for each request.
 * @module utils/makeSig
 */

/**
 * Creates a hashed signature with provided user creds and request properties followiing this spec: 
 * {@link https://www.last.fm/api/authspec#8}
 * 
 * @param {string} method - the lastfm api method name.
 * @param {Object} config - LastfmApi.config
 * @param {Object} opts - options provided by current class method
 */
module.exports = function makeSignature(method, config, opts) {  
  /*
    Sign your authenticated calls by first ordering the parameters sent in your call 
    alphabetically by parameter name and concatenating them into one string using a 
    <name><value> scheme. You must not include the format and callback parameters.
  */ 
  
  var sigArray = [
    'api_key' + config.api_key,
    "method" + method
  ];
  
  for (let key in opts) {
    sigArray.push(key + opts[key])
  }

  var sig = sigArray.sort().join('');

  /* Now append your secret to this string. */
  sig += config.api_secret;
  
  /* Finally, generate an md5 hash of the resulting string */
  return utils.md5(sig);
}