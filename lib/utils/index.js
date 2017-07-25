
module.exports = {
  
  // is this really needed?
  now: function() {
    return new Date().getTime();
  },
  
  md5: function(string) {
    return crypto.createHash('md5').update(string, 'utf8').digest("hex");
  }
};