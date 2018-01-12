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
      successRedirect : '/home',
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

// login to show search page
function search(request, response){
  response.render('search.ejs')
}

//logged in homepage
function home(request, response){
  response.render('home.ejs')
}


//get one movie searched by keyword
function getMovie(req, res){
  console.log ('movie route was hit');
  
  request.get({
    url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + req.query.movie + "&language=en-US&page=1&include_adult=false" 
  },function(err, response, body){
    if(!err && response.statusCode == 200){
        var jsonBody = JSON.parse(body);
        // console.log(jsonBody);
        var jsonObject = jsonBody.results[Math.floor((Math.random() * 10) + 1)]
        console.log(jsonObject)
        res.render('movieResults.ejs', {jsonObject} );  
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
  secret: secret,
  search: search,
  home: home
}