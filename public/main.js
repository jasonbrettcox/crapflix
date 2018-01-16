

$( document ).ready(function() {
 
  // - Create a list of all favorites as list items
function showFavorites() {
  $.get('/favorites', function(favorites){
    console.log('888888')
    {
      // console.log(data);
      for (let i = 0; i < favorites.length; i++) {
         // - Makes li ul for each favorite, with title, author, releaseDate, & image as li
         $('#favorites').append($('<li><ul id="' + favorites[i]._id + '"><li>' + favorites[i].title + '</li><li>' + favorites[i].overview + '</li><li>' + favorites[i].releaseDate + '</li><li>' + favorites[i].vote_average + '"></li></ul></li>'));
       }
    };
  });
}

showFavorites();
});

//save favorite to db
$('#movieForm').on('submit', function(event){
  
     event.preventDefault();
     console.log( "ready!" );
     let newFavorite= {
         title: $("#resultTitle").val(),
         release_date: $("#resultReleaseDate").val(),
         overview: $("#resultPlotOverview").val(),
         id: $("#resultId").val(),
         vote_average: $("#resultRating").val(),
         user_id: $("#currentUserId").val()
     };
     console.log(newFavorite);

    // - Post newFavorite to local database
     $.post("/api/favorites", newFavorite, function(favorite){
      // console.log(favorite);
     })
       
     //Remove list of favorites, create new one
     $("#favorites").empty();
     showFavorites ();
   })  
 

   //delete a favorite -ajax request - success function will re-render the list finds user id first then the favorite within that user

$('#deleteButton').on('submit', function(event){
  event.preventDefault();

  $.ajax({
    url: '/api/favorites',
    type: 'DELETE',
    success: function() {
      window.location.reload(true);
    }
});
  
//   function deleteFavorite(req, res){
//   console.log('9999999')
//   var favoriteId = req.params.id;


// });
// }
});
