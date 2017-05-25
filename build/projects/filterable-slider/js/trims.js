$(window).on('load resize', function () {
   setWidthInit();
});

var $slider = $('.range-slider');
var $trims = $('.trim:not(:hidden)');
if (window.matchMedia("(max-width: 740px)").matches) {
   var slidePanels = $trims.length;
} else {
   var slidePanels = Math.ceil($trims.length / 3);
}

function updateParams() {
   $trims = $('.trim:not(:hidden)');
   if (window.matchMedia("(max-width: 740px)").matches) {
      slidePanels = $trims.length;
   } else {
      slidePanels = Math.ceil($trims.length / 3);
   }
   if ($trims.length <= 3) {
      slider.setDefault();
   }
   pageIndicator.update();
}

function setWidthInit() {
   $slider.css("width", slidePanels * 100 + '%');
   if (window.matchMedia("(max-width: 740px)").matches) {
      $trims.css("width", $slider.width() / (slidePanels) + 'px');
   } else {
      $trims.css("width", $slider.width() / (slidePanels * 3) + 'px');
   }
}

var slider = (function () {

   var $button = $('.nav-arrow');
   var currentPos = 1;

   function setToDefaultPos() {
      $slider.animate({
         left: 0
      });
      currentPos = 1;
   }

   if (window.matchMedia("(max-width: 740px)").matches) {
      $slider.on('swipe', function (e) {
         animateSlider(e)
      });
   } else {
      $button.on('click', animateSlider);
      $(document).on('keydown', function (e) {
         animateSlider(e)
      });
   }

   function animateSlider(e) {
      if ($slider.is(':not(:animated)')) {
         if (window.matchMedia("(max-width: 740px)").matches) {
            var delta = (e.swipestart.coords[0] < e.swipestop.coords[0]) ? -1 : 1; //if right swipe (go left/prev)
         } else if (e.type === 'keydown') {
            if (e.keyCode === 37) {
               var delta = -1
            } else if (e.keyCode === 39) {
               var delta = 1;
            }
         } else {
            var delta = (this.className === "nav-prev nav-arrow") ? -1 : 1;
         }

         if ((currentPos + delta) <= 0 || (currentPos + delta) > slidePanels) {
            return;
         } else {
            currentPos += delta;
            $slider.animate({
               left: "+=" + (-100 * delta) + '%'
            });
         }
      }
   }

   return {
      setDefault: setToDefaultPos
   }
})();

var filter = (function () {

   var $buttons = $('.button');

   $buttons.on('click', function (e) {
      $buttons.removeClass('button-red');
      $(this).addClass('button-red');
      if ($(this).attr('data-filter') === '*') {
         $('.trim').show();
      } else {
         var activeFilter = $(this).attr('data-filter');
         $('.trim').each(function () {
            if ($(this).hasClass(activeFilter)) {
               $(this).show();
            } else {
               $(this).hide();
            }
         });
      }
      updateParams();
   });
})();

var pageIndicator = (function () {

   var $indicator = $('.paging-info');
   var $trimsActive = $indicator.find('.active-trims');
   var $trimsTotal = $indicator.find('.total-trims');

   setIndicator();

   function setIndicator() {
      $trimsActive.html($trims.length);
      $trimsTotal.html($trims.length);
   }

   function updateIndicator() {
      $trimsActive.html($trims.length);
   }

   return {
      update: updateIndicator,
      set: setIndicator
   }
})();