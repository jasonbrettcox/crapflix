//favorite model which tells the database how to save the data it is getting

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
title: String,
overview: String,
release_date: String,
vote_average : Number,
id: Number,
user_id: String,
comment: String

});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;