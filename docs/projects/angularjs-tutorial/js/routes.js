/*
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('#fries_01', {//if someone goes to /page/1
      templateUrl: 'partials/fries_01.html',//use the page_01.html and load it into ngView
      controller: 'controllerPage01'//use the controllerPage01 controller
    }).
    when('/page/2', {//if someone goes to /page/2
      templateUrl: 'partials/page_02.html',//use the page_02.html and load it into ngView
      controller: 'controllerPage02'//use the controllerPage02 controller
    }).
	otherwise({
      redirectTo: '/page/1'//If someone goes to any other page, redirect them to /page/1
  });
}]);
*/
//Add a config 
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/fries01', {//if someone goes to /page/1
      templateUrl: 'partials/fries_01.html',//use the page_01.html and load it into ngView
      controller: 'controller01'//use the controllerPage01 controller
    }).
    when('/fries02', {//if someone goes to /page/2
      templateUrl: 'partials/fries_02.html',//use the page_02.html and load it into ngView
      controller: 'controller01'//use the controllerPage02 controller
    }).
    when('/fries03', {//if someone goes to /page/2
      templateUrl: 'partials/fries_03.html',//use the page_02.html and load it into ngView
      controller: 'controller01'//use the controllerPage02 controller
    })
	.when('/fries04', {//if someone goes to /page/2
      templateUrl: 'partials/fries_04.html',//use the page_02.html and load it into ngView
      controller: 'controller01'//use the controllerPage02 controller
    })
	.when('/fries05', {//if someone goes to /page/2
      templateUrl: 'partials/fries_05.html',//use the page_02.html and load it into ngView
      controller: 'controller01'//use the controllerPage02 controller
    }).
    otherwise({
      redirectTo: '/fries01'//If someone goes to any other page, redirect them to /page/1
  });
}]);