var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/Flops");/// what goes here

module.exports.Movie = require("./movie.js");
module.exports.User = require("./user.js");
module.exports.Favorite = require("./favorite.js");