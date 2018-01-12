var passport      = require("passport")
var express       = require('express');
var app           = express();
var request       = require("request");
var apiKey       = require('../models/env').apiKey;

// GET /signup
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response, next) {
var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect : '/signup',
    failureFlash : true
});
return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response) { 
    response.render('login.ejs', { message: request.flash('loginMessage') });
  }


// POST /login 
function postLogin(request, response, next) {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });

    return loginStrategy(request, response, next);
  }


// GET /logout
function getLogout(request, response) {
    request.logout();
    response.redirect('/');
  }


// Restricted page
function secret(request, response){
  response.render('secret.ejs')
}


//database routes



//get one movie searched by keyword
function getMovie(req, res){
  console.log ('movie route was hit');
  
  request.get({
    url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + req.query.movie + "&language=en-US&page=1&include_adult=false" 
  },function(err, response, body){
    if(!err && response.statusCode == 200){
        var jsonBody = JSON.parse(body);
        console.log(jsonBody);
        res.render('movieResults.ejs', {jsonBody} );  
    } else if(err){
        res.send(err);
    }
});

};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getMovie: getMovie,
  secret: secret
}