console.log("main js is talking to me")

//event listener for save to favorites button
document.getElementById("favoriteButton").addEventListener("click", myFunction);
  function myFunction() {
    alert ("Hello World!");
  }
// $.ajax({
//     type: "POST",
//     url: "/favorites",
//     data: formdata,
//     success: success,
//     dataType: dataType
//   });
  
  // - Put all form info in variable newFavorite
  $('form').on('submit', function(event){
      event.preventDefault();
      let newFavorite= {
          title: $("#resultTitle").val(),
          release_date: $("#resultReleaseDate").val(),
          id: $("#resultId").val(),
          rating: $("#resultRating").val()
      };
      console.log(newBook);

     // - Post newBook to den-super-crud
      $.post("'mongodb://localhost/Flops'", newBook)//;
        .done(function(data) {
        console.log(data);
      });
        
      // - Remove list of books, create new one
      $("#books").empty();
      showBooks();
    
    });