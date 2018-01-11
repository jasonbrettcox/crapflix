var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var handlebars   = require( 'handlebars');

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

var routes = require('./config/routes');
app.use(routes);

//adding html endpoints for API

app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.ejs');//do i need a splash page + a homepage?

  });

  /**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));


/************
 * DATABASE *
 ************/

// var db = require('./models');


//json endpoints  

app.get('/api', function api_index(req, res) {
    // what do I need to keep out of here
    res.json({
      woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
      message: "Here's the dirt",
      documentation_url: "", // CHANGE ME
      base_url: "https://peaceful-escarpment-87562.herokuapp.com/", // this is c
      endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        {method: "GET", path: "/api/profile", description: "Data about me"},
        {method: "GET", path: "/api/sandwiches", description: "Get ALL the sammiches"},
        {method: "POST", path: "/api/sandwiches", description: "Create a new sammich"},
        {method: "PUT", path: "/api/sandwiches", description: "Update a sammich"},
    //     {method: "DELETE", path: "/api/sandwiches", description: "Delete a sammich :("}
       ]
    })
  });
 
  
  //get all movies, does not make sense, needs to be search 
  app.get('/api/movie', function (req, res){
    db.Sandwich.find(function(err, sandwich){
      res.json(sandwich);
      });
    });
  
    //get one movie by id
    app.get('/api/movie/:id', function (req, res){
      db.Sandwich.findById(req.params.id, function(err, sandwich){
    if (err) {return console.log("Cannot find this movie", + err)}
        res.json(sandwich);
      });      
    });
    
  
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
//     });
//   });
  //update user somehow
  app.put('/api/user/:id', function (req, res){
    db.Sandwich.findOneAndUpdate({_id: req.params.id}, {$set: {description: req.body.description, bread: req.body.bread, protein: req.body.protein, condiment: req.body.condiment, length: req.body.length}}, {new: true}, function(err, sandwich){
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
