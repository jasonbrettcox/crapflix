

$( document ).ready(function() {


     //delete a favorite -ajax request - success function will re-render the list finds user id first then the favorite within that user
var deleteButtons= $('button');
console.log(deleteButtons)
   for (i=0; i< deleteButtons.length; i++){
     deleteButtons[i].addEventListener('click', function(event){
      event.preventDefault();
        console.log((this).id)
      $.ajax({
        url: '/api/favorites/'+(this).id,
        method: 'DELETE',
        success: function() {
          console.log('i am success')
          window.location.reload(true);
        
        },
        error: function() {
          console.log('i am error')
        }
        })
    });
     }
    });
 
  // - Create a list of all favorites as list items
function showFavorites() {
  $.get('/favorites', function(favorites){
    // console.log('888888')
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
;

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
 


    


  
//   function deleteFavorite(req, res){
//   console.log('9999999')
//   var favoriteId = req.params.id;
// });
// }
