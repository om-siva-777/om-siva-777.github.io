$(function() {

  $("#reviewForm input,#reviewForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      var file = $("input#imagefile").get(0).files[0];
      var form = new FormData();
      form.append('imagefile', file);
      form.append('name', name);
      form.append('message',message);

      $this = $("#sendReviewButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "../mail/review.php",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data : form,
        success: function() {
          // Success message
          $('#reviewsuccess').html("<div class='alert alert-success'>");
          $('#reviewsuccess > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#reviewsuccess > .alert-success')
            .append("<strong>Thank you for the Review. </strong>");
          $('#reviewsuccess > .alert-success')
            .append('</div>');
          //clear all fields
          $('#reviewForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#reviewsuccess').html("<div class='alert alert-danger'>");
          $('#reviewsuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#reviewsuccess > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my server is not responding. Please try again later!"));
          $('#reviewsuccess > .alert-danger').append('</div>');
          //clear all fields
          $('#reviewForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#reviewsuccess').html('');
});
