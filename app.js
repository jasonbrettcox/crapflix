var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var handlebars   = require('handlebars');
var request      = require('request');
var myVar        = require('./models');
var apiKey       = require('./models/env').apiKey;


mongoose.connect('mongodb://localhost/Flops', {useMongoClient : true}); 

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); 

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

var routes = require('./config/routes');
app.use(routes);

// let Favorite = require('/models/favorite.ejs');

//adding html endpoints for API

//set root route
app.get('/', function homepage(req, res) {
    res.render(__dirname + '/views/index.ejs');
      
  });

  // app.get('/', function favorites(req, res) {
  //   res.render(__dirname + '/views/favorites.ejs');
      
  // });

  // app.post('/', function favorites(req, res) {
  //   res.render(__dirname + '/views/favorites.ejs');
      
  // });

  /**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));






/************
 * DATABASE *
 ************/

var db = require('./models');
  
//get all favs
app.get('/api/favorites', function (req, res) {
  db.Favorites.find({}, function(err, favorites){
    if (err){
      console.log(err);
    } else {
      res.render('favorites', {
        title: 'Favorites',
        favorites: favorites
      });
    }
    });
    
  });
  
  //update user somehow
  // app.put('/api/user/:id', function (req, res){
  //   db.Movie.findOneAndUpdate({_id: req.params.id}, {$set: {description: req.body.description, bread: req.body.bread, protein: req.body.protein, condiment: req.body.condiment, length: req.body.length}}, {new: true}, function(err, sandwich){
  // if (err) {return console.log("you suck", + err)}
  //     res.json(sandwich);
  //   });      
  // });
  
  //delete route needs to delete user account or favorite
//   app.delete('/api/sandwich/:id', function (req, res){
//     db.Sandwich.remove({_id: req.params.id}, function (err, sandwich) {
//   if (err) {return console.log("you suck", + err)}
//       res.json(sandwich);
//     });      
//   });


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is up and running on http://localhost:3000/');

  });

  // get all  favorites route
app.get('/favorites', function (req, res) {
  // send all favorites as JSON response
  db.Favorites.find(function(err, favorites){
    if (err) { return console.log("index error: " + err); }
    console.log(typeof(favorites));
    console.log(favorites)
    res.render("favorites.ejs", {favorites});
  });
});