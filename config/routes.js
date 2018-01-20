var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated())
  return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

//show  splash page
router.route('/')
  .get(staticsController.home);

//route for signup functionality
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

//route for actual login function
router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

//logout and, now that we are logged out, send back to splash page
router.route("/logout")
  .get(usersController.getLogout);

//secret page - reserved for future Nic Cage specific data
router.route("/secret")
  .get(authenticatedUser, usersController.secret);

  //search for a movie from the API database
router.route("/search")
  .get(authenticatedUser, usersController.search);

  //shows the homepage when logged in 
router.route("/home")
  .get(authenticatedUser, usersController.home);

  //shows the movie results, must be logged in
router.route("/movieResult")
  .get(authenticatedUser, usersController.getMovie);

  // get all favorites
router.route("/favorites")
  .get(authenticatedUser, usersController.getFavorites);

//post a favorite
router.route('/api/favorites')
  .post(authenticatedUser, usersController.createFavorite);

  //delete a favorite by id
router.route('/api/favorites/:id')
  .delete(authenticatedUser, usersController.deleteFavorite);

//get all the favorites, this is likely redundant
router.route("/favorites") 
  .get(authenticatedUser, usersController.getFavorites);

//update route, add a comment to one of your favorites
router.route('/api/favorites/:id')
  .put(authenticatedUser, usersController.updateFavorite)


  module.exports = router