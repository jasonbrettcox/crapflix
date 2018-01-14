console.log("main js is talking to me")

//event listener for save to favorites button
document.getElementById("favoriteButton").addEventListener("click", myFunction);
  function myFunction() {
    alert ("Hello World!");
  }
// $.ajax({
//     type: "POST",
//     url: "/api/save",
//     data: data,
//     success: success,
//     dataType: dataType
//   });
  