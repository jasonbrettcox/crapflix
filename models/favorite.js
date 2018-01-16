var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
title: String,
overview: String,
release_date: String,
vote_average : Number,
id: Number,
user_id: String 

});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;