var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');


module.exports = function(passport) {  //set up local strategy with these fields for authentication
    passport.serializeUser(function(user, callback) {
        callback(null, user.id);
      });
  
      passport.deserializeUser(function(id, callback) {
        User.findById(id, function(err, user) {
            callback(err, user);
        });
      });
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
     //customize new account signup fucntionality
    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);
  
        // see if we already have a user with this email 
        if (user) {
      return callback(null, false, req.flash('signupMessage', 'Oh shit! There is already an account with this email.'));
        } else {
        // There is no user registered with this email
      // Create a new user
      var newUser            = new User();
      newUser.local.email    = email;
      newUser.local.password = newUser.encrypt(password);
  
      newUser.save(function(err) {
        if (err) throw err;
        return callback(null, newUser);
        });
        }
      });
    
  }));
  passport.use('local-login', new LocalStrategy({ //now creating the login strategy which uses same fields as signup
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
      // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'Oh shit! No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oh shit! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
  };
