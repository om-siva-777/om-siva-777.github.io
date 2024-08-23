(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.shop-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
  })
  $('.shop-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
  })

  // Testimonials
  function testimonials_slider() {
    if ($('.testi_slider').length) {
      $('.testi_slider').owlCarousel({
        loop: false,
        margin: 30,
        items: 2,
        autoplay: true,
        smartSpeed: 2500,
        dots: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          991: {
            items: 2
          }
        }
      });
    }
  }
  testimonials_slider();

  /* Get iframe src attribute value i.e. YouTube video url
  and store it in a variable */
  var url = $("#videoIframe").attr('src');
  
  /* Assign empty url value to the iframe src attribute when
  modal hide, which stop the video playing */
  $(".shop-modal").on('hide.bs.modal', function(e){
      $("#videoIframe").attr('src', '');
  });
  
  /* Assign the initially stored url back to the iframe src
  attribute when modal is displayed again */
  $(".shop-modal").on('show.bs.modal', function(e){
      $("#videoIframe").attr('src', url);
  });

})(jQuery); // End of use strict


