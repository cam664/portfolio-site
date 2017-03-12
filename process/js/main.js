var initInterval = setInterval(function() {
    if(window.jQuery) {
        clearInterval(initInterval);
        init(); 
    }
}, 20);

function init() {

    'use strict';

    $('body').removeClass('no-scroll');

    //logo tilt effect, initalized below after the animation is complete
    function logoTilt() {
        $(document).mousemove(function (e) {
            var $tiltCont = $('.tilt-container'),
                $header = $('#home'),
                objLeft = $header.offset().left,
                objTop = $header.offset().top,
                objCenterX = objLeft + $header.width() / 2,
                objCenterY = objTop + $header.height() / 2,
                rotate_X,
                rotate_Y,
                translate_X,
                translate_Y;

            if (e.pageX > $header.width() + 50 || e.pageX <= 0 || e.pageY > $header.height() + 50 || e.pageY <= 0) {
                rotate_X = 0;
                rotate_Y = 0;
            } else {
                rotate_X = (e.pageX - objCenterX) / 90;
                rotate_Y = (-e.pageY - objCenterY) / 90;
                translate_X = -(e.pageX - objCenterX) / 70;
                translate_Y = (e.pageY - objCenterY) / 90;

            }

            $tiltCont.css('transform', 'rotateX(' + rotate_Y + 'deg) rotateY(' + rotate_X + 'deg) translateX(' + translate_X + 'px) translateY(' + translate_Y +'px)')
        });
    };    

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

};