// changle color after scroll
$(document).ready(function(){
    
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
        // $(".fixed-top ").css("background-color", "#FFF");
        // $(".fixed-top ").css("border-bottom", "1px solid #10162f");
        $(".fixed-top").addClass('scrolled');
      } else {
        // $(".fixed-top ").css("background-color", "transparent");
        $(".fixed-top").removeClass('scrolled');


      }
      var scrolled_val = $(document).scrollTop().valueOf();
      console.log(scrolled_val);
      $('nav').on('click', function() {

        if($('.navbar-toggler').attr('aria-expanded') === "true" && scrolled_val > 50){
          $(".fixed-top").addClass('scrolled');
        }else if($('.navbar-toggler').attr('aria-expanded') === "false" && scrolled_val > 50){
          $(".fixed-top").addClass('scrolled');
        }else if($('.navbar-toggler').attr('aria-expanded') === "false"&& scrolled_val < 50){
          $(".fixed-top").removeClass('scrolled');
        }else{
          $(".fixed-top").addClass('scrolled');
        }
      });
    });

    $(window).resize(function() {
      var width = $(window).width();
      if (width < 766){
        $(".breakpoint766").removeClass("box");
        $(".breakpoint766").addClass("box766");
      }else{
        $(".breakpoint766").removeClass("box766");
        $(".breakpoint766").addClass("box");
      }
    });

    $( '.navbar-nav a' ).on('click', 
                    function () {
            $( '.navbar-nav' ).find( 'li.active' )
            .removeClass( 'active' );
            $( this ).parent( 'li' ).addClass( 'active' );
        });

  });

