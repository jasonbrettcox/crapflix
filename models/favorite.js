var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
title: String,
overview: String,
release_date: Number,
vote_average : Number

});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;