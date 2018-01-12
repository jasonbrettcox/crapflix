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

mongoose.connect('mongodb://localhost/local-authentication-with-passport', {useMongoClient : true}); //replace with my db

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

// var routes = require('./config/routes');
// app.use(routes);

//adding html endpoints for API

app.get('/', function homepage(req, res) {
    res.render(__dirname + '/views/index.ejs');//do i need a splash page + a homepage?
      
  });

  /**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

//get one movie searched by keyword
app.get('/movieResult', function(req, res){
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

});


/************
 * DATABASE *
 ************/

var db = require('./models');
  
  //get all movies, does not make sense, needs to be 
  app.get('/api/movie', function (req, res){
    db.Movie.find(function(err, movie){
      res.json(movie);
      });
    });
  
    //get one movie by id
    // app.get('/api/movie/:id', function (req, res){
    //   db.Sa.findById(req.params.id, function(err, sandwich){
    // if (err) {return console.log("Cannot find this movie", + err)}
    //     res.json(sandwich);
    //   });      
    // });
    
  
  // post route needs to create new user
//   app.post('/api/sandwich', function (req, res){
//     var newSandwich = new db.Sandwich({
//       description: req.body.description,
//       bread: req.body.bread,
//       protein: req.body.protein,
//       condiment: req.body.condiment,
//       length: req.body.length
//     });
//     newSandwich.save(function (err, sandwich){
//       if (err) {
//         return console.log("save error:" + err);
//       }
//       console.log('saved');
//       res.json(sandwich);
//     });search 
//   });


  //update user somehow
  app.put('/api/user/:id', function (req, res){
    db.Movie.findOneAndUpdate({_id: req.params.id}, {$set: {description: req.body.description, bread: req.body.bread, protein: req.body.protein, condiment: req.body.condiment, length: req.body.length}}, {new: true}, function(err, sandwich){
  if (err) {return console.log("you suck", + err)}
      res.json(sandwich);
    });      
  });
  
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
