$(document).ready(function(){data.getLoc()});var data=function(){function t(){$.get("http://ip-api.com/json",function(t){data.getWeather(t.city)})}function e(t){$.get("http://api.openweathermap.org/data/2.5/weather?q="+t+"&appid=748aad33699f1e4210b6c4b402de9e70&units=metric",function(t){view.render(t)})}return{getLoc:t,getWeather:e}}(),view=function(){function t(t){var c=t.weather[0].description.substring(0,1).toUpperCase();e.html(Math.round(t.main.temp)),n.html(Math.round(t.main.temp_min)),a.html(Math.round(t.main.temp_max)),i.html(c+t.weather[0].description.substring(1)),o.html(t.wind.speed),r.html(t.main.humidity),d.html(t.name+", "+t.sys.country),Date.now()>t.sys.sunrise&&Date.now()<t.sys.sunset?u.removeClass().addClass("wi wi-owm-day-"+t.weather[0].id):u.removeClass().addClass("wi wi-owm-night-"+t.weather[0].id)}var e=$("#temp-data"),a=$("#high-data"),n=$("#low-data"),i=$("#desc"),o=$("#wind-data"),r=$("#humid-data"),d=$("#city-data"),u=$("#icon").find("i");return{render:t}}(),search=function(){function t(){$("#new-city").on("focus",function(){e.value=""}),$("#new-city").on("blur",function(){e.value="New City"}),$(window).on("keyup",function(t){var a=e.value;13==t.keyCode&&data.getWeather(a)})}t();var e=document.querySelector("#new-city")}();
//# sourceMappingURL=../maps/app.js.map