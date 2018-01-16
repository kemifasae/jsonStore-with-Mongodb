// Intercept form submission and submit the form with ajax
$('#jsonform').on('submit', function(e) {
  // Prevent submit event from bubbling and automatically submitting the
  // form
  e.preventDefault();

  $.ajax({
      url: '/docs',
      method: 'POST',
      dataType: 'json',
      data: {
          value: $('#textarea').val(),
      }
  }).done(function(data) {
      // The JSON sent back from the server will contain a success message
      let urlfield = document.getElementById('urlfield');
      urlfield.value = "";
      urlfield.value = urlfield.value + data.url;
  }).fail(function(error) {
      alert(error);
  });
});

$("#showjson").click(function(){
  let jsonurl = prompt("Please enter the url to yor json data");

  $.ajax({url: jsonurl, success: function(result){
      let textarea = document.getElementById('textarea');
      textarea.value = "";
      $("#viewdata").html(result);
  }});
});

$("#updatejson").click(function(){
  let jsonurl = prompt("Please enter the url to yor json data");

  $.ajax({url: jsonurl, success: function(result){
      $("#textarea").html(result);
       let urlfield = document.getElementById('urlfield');
       urlfield.value = "Url for your newly saved data";

  }});
});



