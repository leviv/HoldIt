/* ===============================
    Code to animate id hyperlink clicks
=============================== */
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

$(form).submit(function (event) {
  $.post('http://localhost:3000/thank',   // url
         { myData: $('#email-form').val() }, // data to be submit
         function(data, status, jqXHR) {// success callback
           console.log("yeet");
          })
  event.preventDefault();
});


$($('.button-submit')).click(function(){
  var input = $('#email-form').val();

  if (!validateEmail(input)) {
    alert("Email is not valid");
  } else {
    var siteName = "file:///Users/levivillarreal/Desktop/HoldIt/post/";
    $('#hide-on-submit').hide();
    $('#qr-code').show();
    var imageSrc = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + siteName + input;
    $('#qr-img').attr('src',imageSrc);
  }
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
