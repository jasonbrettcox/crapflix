var passport      = require("passport");
var express       = require('express');
var app           = express();
var request       = require("request");
var apiKey       = require('../models/env').apiKey;
var db            = require('../models');
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


//logged in, create new favorite
function createFavorite(req, res){
  console.log('xxx123')
  console.log(req.body)
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
        // console.log(jsonBody);
        var jsonObject = jsonBody.results[Math.floor((Math.random() * 10) + 1)]
        // console.log(jsonObject)
        res.render('movieResults.ejs', {jsonObject});  
    } else if(err){
        res.send(err);
    }
});

};

//get all favorites
function getFavorites(req, res){
  res.render('favorites.ejs', {favorites}
  )};

// app.get('/api/favorites', function (req, res) {
//   // send all favorites as JSON response --- should this be html?
//   db.Favorites.find(function(err, favorites){
//     if (err) { return console.log("index error: " + err); }
//     res.json(favorites);
//   });
// });



//delete a favorite, needs to be attached to a button

function deleteFavorites(req, res){
  console.log(req.params)
  var favoriteId = req.params.id;

  db.Favorite.findOneAndRemove({ _id: favoriteId }, function (err, deletedFavorite) {
    res.json(deletedFavorite);
  
  });
}
app.delete('/favorites/:id', function (req, res) {
  // get favorite id from url params (`req.params`)
  
});


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
  deleteFavorites: deleteFavorites,
  createFavorite: createFavorite,
  

};