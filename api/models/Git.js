/**
 * Git
 * @description :: Model for storing Git records
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,

  attributes: {
    // Fill your attributes here

    toJSON: function() {
      return this.toObject();
    }
  },

  beforeUpdate: function(values, next){
    next();
  },
  beforeCreate: function(values, next){
    next();
  }
};
