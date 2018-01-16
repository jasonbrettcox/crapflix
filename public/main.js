

$( document ).ready(function() {
 
  // - Create a list of all favorites as list items
function showFavorites() {
  $.get('/api/favorites', function(favorites){
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

//event listener for save to favorites button

     
    });
// $.ajax({
//     type: "POST",
//     url: "/favorites",
//     data: formdata,
//     success: success,
//     dataType: dataType
//   });
$('#movieForm').on('submit', function(event){
  
     event.preventDefault();
     console.log( "ready!" );
     let newFavorite= {
         title: $("#resultTitle").val(),
         release_date: $("#resultReleaseDate").val(),
         overview: $("#resultPlotOverview").val(),
         id: $("#resultId").val(),
         rating: $("#resultRating").val(),
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
  // - Put all form info in variable newFavorite
