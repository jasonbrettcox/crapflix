var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MovieSchema = new Schema({
title: String,
overview: String,
release_date: Number,
vote_average : Number,
id: Number

});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;