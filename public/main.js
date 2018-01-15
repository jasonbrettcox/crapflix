console.log("main js is talking to me")

$( document ).ready(function() {
  console.log( "ready!" );
  // - Create a list of all favorites as list items
function showFavorites() {
  var ajax = $.get('mongodb://localhost/Flops.users.favorites')//;
    .done(function(data) {
      console.log(data);
      for (let i = 0; i < data.favorites.length; i++) {
         // - Makes li ul for each favorite, with title, author, releaseDate, & image as li
         $('#favorites').append($('<li><ul id="' + data.favorites[i]._id + '"><li>' + data.favorites[i].title + '</li><li>' + data.favorites[i].overview + '</li><li>' + data.favorites[i].releaseDate + '</li><li>' + data.books[i].vote_average + '"></li></ul></li>'));
       }
    });
}

showFavorites();

//event listener for save to favorites button

    $('movieForm').on('submit', function(event){
      event.preventDefault();
      let newFavorite= {
          title: $("#resultTitle").val(),
          release_date: $("#resultReleaseDate").val(),
          overview: $("#resultPlotOverview").val(),
          id: $("#resultId").val(),
          rating: $("#resultRating").val()
      };
      console.log(newMovie);

     // - Post newBook to local database
      $.post("'mongodb://localhost/Flops/favorites'", newFavorite)//this is wrong
        .done(function(data) {
        console.log(data);
      });
        
      // - Remove list of books, create new one
      $("#favorites").empty();
      showFavorites ();
    
    });
  }
);

module.exports = showFavorites;

// $.ajax({
//     type: "POST",
//     url: "/favorites",
//     data: formdata,
//     success: success,
//     dataType: dataType
//   });
  
  // - Put all form info in variable newFavorite
  