$(document).ready(function(){data.getLoc()});var data=function(){function t(){$.get("http://ip-api.com/json",function(t){data.getWeather(t.city)})}function e(t){$.get("http://api.openweathermap.org/data/2.5/weather?q="+t+"&appid=748aad33699f1e4210b6c4b402de9e70&units=metric",function(t){view.render(t)})}return{getLoc:t,getWeather:e}}(),view=function(){function t(t){var u=t.weather[0].description.substring(0,1).toUpperCase();e.html(Math.round(t.main.temp)),n.html(Math.round(t.main.temp_min)),a.html(Math.round(t.main.temp_max)),i.html(u+t.weather[0].description.substring(1)),o.html(t.wind.speed),r.html(t.main.humidity),d.html(t.name+", "+t.sys.country),Date.now().toString().slice(0,10)>t.sys.sunrise&&Date.now().toString().slice(0,10)<t.sys.sunset?c.removeClass().addClass("wi wi-owm-day-"+t.weather[0].id):c.removeClass().addClass("wi wi-owm-night-"+t.weather[0].id)}var e=$("#temp-data"),a=$("#high-data"),n=$("#low-data"),i=$("#desc"),o=$("#wind-data"),r=$("#humid-data"),d=$("#city-data"),c=$("#icon").find("i");return{render:t}}(),search=function(){function t(){e.on("focus",function(){n.value=""}),$(window).on("keyup",function(t){var e=n.value;13==t.keyCode&&data.getWeather(e)}),a.on("click",function(t){var e=n.value;data.getWeather(e)})}var e=$("#new-city-form"),a=$("#new-city-btn");t();var n=document.querySelector("#new-city-form")}();
//# sourceMappingURL=../maps/app.js.map