var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Movie    = require('./movie')

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
    favorites    : [Movie.schema]
}});
       

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

User.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  module.exports = mongoose.model('User', User);