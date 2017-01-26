//after page load: play logo animation and hide loading screen 
$(window).on('load', function () { 

    $('.loading-screen').fadeOut('400');

    $('#shape-1').addClass('anim-shape-1');
    $('#shape-2').addClass('anim-shape-2');
    $('#shape-3').addClass('anim-shape-3');
    $('#shape-4').addClass('anim-shape-4');
    $('#shape-5').addClass('anim-shape-5');
    $('#shape-6').addClass('anim-shape-6');

    $('body').removeClass('no-scroll');   

});

//logo tilt effect initalized after the animation is complete
setTimeout(function () {
    logoTilt();
}, 2000);

function logoTilt() {
    $(document).mousemove(function (e) {
        var $tiltCont = $('.tilt-container'),
            $header = $('header'),

            objLeft = $tiltCont.offset().left,
            objTop = $tiltCont.offset().top,

            objCenterX = objLeft + $tiltCont.width() / 2,
            objCenterY = objTop + $tiltCont.height() / 2,

            rotate_X,
            rotate_Y;

        if (e.pageX > $header.width() + 50 || e.pageX <= 0 || e.pageY > $header.height() + 50 || e.pageY <= 0) {
            rotate_X = 0;
            rotate_Y = 0;
        } else {
            rotate_X = (e.pageX - objCenterX) / 90;
            rotate_Y = (-e.pageY - objCenterY) / 90;
        }
        
        window.requestAnimationFrame(function () {
            $tiltCont.css('transform', 'rotateX(' + rotate_Y + 'deg) rotateY(' + rotate_X + 'deg)');
        });    
    });
}

//navbar show/hide toggle and nav current section indicator
$(document).on('scroll', function () {
    var distance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var height = $('body').outerHeight(true);
    var tabletPortrait = 4730;
    var $nav = $('nav');
    var offset = 350;
    var $navProjects = $('.nav-projects');
    var $elProjects = $('#projects');
    var $navAbout = $('.nav-about');
    var $elAbout = $('#about');
    var $navSkills = $('.nav-skills');
    var $elSkills = $('#skills');
    var $navContact = $('.nav-contact');
    var $elContact = $('#contact-spacer');
    var $elSchool = $('#school');

    //navbar show/hide toggle
    if (distance >= 50) {
        $nav.css('transform', 'translate(0, 0)');
    } else {
        $nav.css('transform', 'translate(0, -146px)');
    }

    //nav section indicator
    if (distance + offset > $elProjects.offset().top && distance + offset < $elProjects.offset().top + $elProjects.outerHeight(true)) {
        $navProjects.addClass('nav-active');
    } else {
        $navProjects.removeClass('nav-active');
    }

    if (distance + offset > $elAbout.offset().top && distance + offset < $elAbout.offset().top + $elAbout.outerHeight(true)) {
        $navAbout.addClass('nav-active');
    } else {
        $navAbout.removeClass('nav-active');
    }

    if (distance + offset > $elSkills.offset().top && distance + offset < $elSkills.offset().top + ($elSkills.outerHeight(true) + $elSchool.outerHeight(true))) {
        $navSkills.addClass('nav-active');
    } else {
        $navSkills.removeClass('nav-active');
    }

    if (distance + offset > $elContact.offset().top) {
        $navContact.addClass('nav-active')
    } else {
        $navContact.removeClass('nav-active');
    }

});

//smooth scroll to anchor elements
$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    var offSet = 50;

    if (target.length) {

        event.preventDefault();

        if (target.is('#about')) {
            offSet = 140;
        }
        if (target.is('#contact')) {
            offSet = -5400;
        }

        $('html, body').stop().animate({
            scrollTop: target.offset().top - offSet
        }, 1000);
    }

});
