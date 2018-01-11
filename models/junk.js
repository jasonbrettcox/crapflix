var request = require('./node_modules/request/');
var myVar = require('./env.js');
var apiKey = myVar.apiKey;


function searchFor(searchByKeyword){
    // console.log(movieTitle);
    request('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + req.query.movie+ '&language=en-US&page=1&include_adult=false', function (error, response, body){
    if (error){console.log(error)};
    // console.log(response);    
    let object = JSON.parse(body);
        // console.log(object);
        let title = object.items[0].title
        let snippet = object.items[0].snippet
        console.log(title)
        console.log(snippet)
          
    });

};


module.exports = searchFor;