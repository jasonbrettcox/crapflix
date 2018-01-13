console.log("main js is talking to me")

$("button").click(function(){
    $.post('mongodb://localhost/crapflix',
    {
        Favorite: {jsonObject} 
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});