var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Favorite    = require('./favorite')

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  local : {
    email        : String,
    password     : String,
    favorites    : [Favorite.schema]
}});
       

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  module.exports = mongoose.model('User', UserSchema);