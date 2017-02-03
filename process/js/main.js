'use strict';
//after page load: play logo animation and hide loading screen 
$(window).on('load', function () {

    $('body').removeClass('no-scroll');

});

//logo tilt effect, initalized below after the animation is complete
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
        
        $tiltCont.css('transform', 'rotateX(' + rotate_Y + 'deg) rotateY(' + rotate_X + 'deg)');

    });
}

setTimeout(function () {
    logoTilt();
}, 2000);

//navbar show/hide toggle and nav current section indicator
$(document).on('scroll', function () {
    var distance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        height = $('body').outerHeight(true),
        $nav = $('nav'),
        offset = 350,
        $navProjects = $('.nav-projects'),
        $elProjects = $('#projects'),
        $navAbout = $('.nav-about'),
        $elAbout = $('#about'),
        $navSkills = $('.nav-skills'),
        $elSkills = $('#skills'),
        $navContact = $('.nav-contact'),
        $elContact = $('#contact-spacer'),
        $elSchool = $('#school');

    //navbar show/hide toggle
    if (distance >= 50) {
        $nav.css("transform", "translate(0, 0)");
    } else {
        $nav.css("transform", "translate(0, -146px)");
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
        $navContact.addClass('nav-active');
    } else {
        $navContact.removeClass('nav-active');
    }

});

//smooth scroll to anchor elements
$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href')),
        offSet = 40;

    if (target.length) {

        event.preventDefault();

        if (target.is('#about')) {
            offSet = 140;
        }
        if (target.is('#contact')) {
            offSet = -6500;
        }

        $('html, body').stop().animate({
            scrollTop: target.offset().top - offSet
        }, 1000);
    }

});
