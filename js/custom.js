//BeforeAfter

// Call & init
$(document).ready(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });
});

// Update sliders on resize. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
    });
});

function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidth - 10;

        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove touchmove", function(e) {

            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

            leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle. 
            // Bind mouseup events to stop dragging.
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);
        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}



//service video

var mugli_video = $(".video").hover(hoverVideo, hideVideo);

function hoverVideo(e) {
    $('video', this).get(0).play();
}

function hideVideo(e) {
    $('video', this).get(0).pause();
}

//HeaderNavigation
$(window).scroll(
    () => {
        if ($(document).scrollTop() > $("#WhyOpaque").offset().top - 150) {
            $("#HeaderNavigation").fadeIn("slow");
            $("#HeaderNavigation").addClass("sticky");

        } else {
            $("#HeaderNavigation").fadeOut("slow");
            $("#HeaderNavigation").removeClass("sticky");
        }
    }

)

opaqueRightVideo();
$(window).resize(opaqueRightVideo);

function opaqueRightVideo() {
    if ($(window).width() >= 768) {
        console.log($(window).width());

        $("#rightVideoMinimized").addClass("jubis");
        $("#rightVideoDefault").removeClass("jubis");
    } else {
        $("#rightVideoMinimized").removeClass("jubis");
        $("#rightVideoDefault").addClass("jubis");
    }
}





//SliderOS
var owl = $('.owl-carousel');
owl.owlCarousel({
    items:1,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true
});


//Smooth Scroll
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top-95
    }, 500);
});



//Form

$(document).ready(function(){

    $('#captcha_form').on('submit', function(event){
    event.preventDefault();
     $.ajax({
      url:"process_data.php",
      method:"POST",
      data:$(this).serialize(),
      dataType:"json",
        beforeSend:function(){
            $('#submitbutton').text('Sending...');
            $('#submitbutton').attr('disabled','disabled');
        },
      success:function(data)
      {
       
       if(data.success)
       {
        
        $('#captcha_form')[0].reset();
        $('#name_error').text('');
        $('#company_error').text('');
        $('#email_error').text('');
        $('#phone_error').text('');
        $('#message_error').text('');
        $('#captcha_error').text('');
        grecaptcha.reset();
        $('#submitbutton').text('Your message has been successfully sent. We will contact with you briefly..');
        $('#submitbutton').addClass('success-submit')
       }
       else
       {
        $('#name_error').text(data.name_error);
        $('#company_error').text(data.company_error);
        $('#email_error').text(data.email_error);
        $('#phone_error').text(data.phone_error);
        $('#message_error').text(data.message_error);
        $('#captcha_error').text(data.captcha_error);   
       }
      }
     })
    });
   
   });

   (function() {

	let hamburger = {
		nav: document.querySelector('#nav'),
		navToggle: document.querySelector('.nav-toggle'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.toggle('expanded');
			this.nav.classList.toggle('expanded');
		},
	};

	hamburger.initialize();

}());
