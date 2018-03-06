var passport      = require("passport");
var express       = require('express');
var app           = express();
var request       = require("request");
var apiKey       = process.env.apiKey || require('../models/env').apiKey;
var db            = require('../models');

// GET /signup show signup page
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup --creates new user account
function postSignup(request, response, next) {
var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect : '/signup',
    failureFlash : true
});
return signupStrategy(request, response, next);
}

// GET /login shows login page
function getLogin(request, response) { 
    response.render('login.ejs', { message: request.flash('loginMessage') });
  }


// POST /login  fires the Passport login strategy
function postLogin(request, response, next) {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect : '/home',
      failureRedirect : '/login',
      failureFlash : true
    });

    return loginStrategy(request, response, next);
  }


// GET /logout, logs user out and redirects to index page
function getLogout(request, response) {
    request.logout();
    response.redirect('/');
  }


// Restricted page - function not used after all. might be something about the move Face/Off
function secret(request, response){
  response.render('secret.ejs')
}

// login to show search page, only visible if logged in
function search(request, response){
  response.render('search.ejs')
}

//logged in homepage, show homepage template instead of index
function home(request, response){
  response.render('home.ejs')
}


//logged in, create new favorite and save to database
function createFavorite(req, res){
  console.log('xxx123')
  // console.log(req.body)
  db.Favorite.create(req.body, function(err, favorites){
    console.log('db create is working')
    if (err) { return 'create favorite error' + err }
    res.json(favorites);
  }) 
}

//get one movie searched by keyword - api call
function getMovie(req, res){
  console.log ('movie route was hit');
  
  request.get({
    url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + req.query.movie + "&language=en-US&page=1&include_adult=false&vote_count.gte=10&vote_average.gte=1.0&vote_average.lte=5.0&sort_by=vote_average.asc" 
  },function(err, response, body){
    if(!err && response.statusCode == 200){
        var jsonBody = JSON.parse(body);
        let favorite = {
          title : response.body.title,
          date: response.body.release_date,
          overview: response.body.overview,
          rating: response.body.vote_average,
          id: response.body.id

        }
        // randomizes the data returned and picks a movie at random out of that
        var jsonObject = jsonBody.results[Math.floor((Math.random() * 10) + 1)]
        // shows the results page template
        res.render('movieResults.ejs', {jsonObject});  
    } else if(err){
        res.send(err);
    }
});

};

//get all favorites
function getFavorites(req, res){

    // send all favorites as JSON response
    db.Favorite.find(function(err, favorites){
      if (err) { return console.log("index error: " + err); }
      console.log(typeof(favorites));
      // console.log(favorites);
      res.render("favorites.ejs", {favorites});
 }) };
   // get all  favorites route


//delete one favorite by it's id, which is actually the IMDB id
function deleteFavorite(req, res, next){

// app.delete('/favorites/:id', function deleteFavorite(req, res) {
//   // mongoose remove find correct user, find the movie by id, delete that one from collection
  db.Favorite.findOneAndRemove({ id: req.params.id }, function (err, deletedFavorite) {
    console.log('inside delete function')
    res.json(deletedFavorite);
  })
}

//update with a comment
function updateFavorite(req, res, next){
  // console.log(req.body)
  // console.log('999999')
  db.Favorite.findOneAndUpdate({ _id: req.params.id }, 
    { title : req.body.title,
      release_date: req.body.release_date,
      overview: req.body.overview,
      vote_average: req.body.vote_average,
      id: req.body.id,
      user_id: req.body.user_id,
      comment: req.body.comment },
    
    function (err, updatedFavorite){
      console.log(updatedFavorite)
    res.json(updatedFavorite);
  })}; 
   

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getMovie: getMovie,
  secret: secret,
  search: search,
  home: home,
  getFavorites: getFavorites,
  deleteFavorite: deleteFavorite,
  createFavorite: createFavorite,
  updateFavorite: updateFavorite
};