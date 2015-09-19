$(document).ready(function() {
  /*
  $("#submit-contact").click(function(){
    var email = $("#inputEmail-contact");
    var subject = $("#inputSubject-contact");
    var message = $("#inputMessage-contact");
    var human = $("#inputHuman-contact");

    $.post("../../contactengine.php",{
      "email": email.val(),
      "subject": subject.val(),
      "message": message.val(),

    }, function (data){
      $("#response-contact").html(data);
      email.val("");
      subject.val("");
      message.val("");
      human.val("");
    });
  });*/

  var contactForm = $('#contact-form');
  contactForm.submit(function (event) {
    event.preventDefault();

    console.log("asdasdasdasdasdasd");

    $.post("../../contactengine.php",
      contactForm.serialize(),
      function (data){
        $("#contact-response").html(data);
        contactForm.trigger("reset");
    });
  });
});