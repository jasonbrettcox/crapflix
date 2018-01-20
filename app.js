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
var apiKey       = process.env.apiKey || require('./models/env').apiKey;


// mongoose.connect('mongodb://localhost/Flops', {useMongoClient : true}); 

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

//set root route
app.get('/', function homepage(req, res) {
    res.render(__dirname + '/views/index.ejs');
      
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

var db = require('./models/');
  
  
  //delete route needs to delete user account or favorite
  app.delete('/api/favorite/:id', function (req, res){
    db.Favorite.remove({id: req.params.id}, function (err, favorite) {
  if (err) {return console.log("having trouble deleting...", + err)}
      res.json(favorite);
    });      
  });


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is up and running on http://localhost:3000/');

  });

 