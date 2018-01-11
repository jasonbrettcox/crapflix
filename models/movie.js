var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MovieSchema = new Schema({
backdrop_path : String,
title: String,
tagline: String,
overview: String,
release_date: Number,
runtime: String,
popularity: Number,
vote_average : Number

});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;