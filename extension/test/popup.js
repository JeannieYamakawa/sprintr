$(document).ready(function() {
  console.log("this is the popup js speaking");
  $('.thing-1').click(function(){
    console.log("thing1 clicked");
    $.ajax({
      url: 'http://localhost:8000/login',
      type: 'get',
    })
    .done(function(res) {
      console.log("success");
      console.log(res);
    })
    .fail(function() {
      console.log("error");
    })

  })
});
