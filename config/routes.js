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

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.route("/secret")
  .get(authenticatedUser, usersController.secret);

router.route("/search")
  .get(authenticatedUser, usersController.search);
  
router.route("/home")
  .get(authenticatedUser, usersController.home);

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

router.route("/favorites") 
  .get(authenticatedUser, usersController.getFavorites);

//update route fulfilled via adding commenmts
router.route('/api/favorites/:id')
  .put(authenticatedUser, usersController.updateFavorite)
module.exports = router