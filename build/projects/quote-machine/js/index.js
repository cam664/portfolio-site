//global vars for current quote and author in view  
var currentQuote = '';
var currentAuthor = '';

//update quote and author in view with fade in/out animation. Backup quote array included for failed AJAX calls
function getQuote(){  
    //instantiate new XHR object
    var request = new XMLHttpRequest();
    //fade out current quote and author
    TweenMax.to([text, author], 0.5,{opacity: 0}); 
    //initialize GET request. Add output of Math.random to URI query to avoid repeat quotes 
    request.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&' + Math.random(), true);
    
    request.onload = function() {
      //when results of AJAX call have fully loaded check to see if call was successful
      if (request.status >= 200 && request.status < 400) {
        //store result of call in var data and convert to JSON object
        var data = JSON.parse(request.responseText);
        //update view with new quote and author
        currentQuote = text.innerHTML = data.quoteText;
        currentAuthor = author.innerHTML = "-" + data.quoteAuthor;
        //fade up quote new quote and author
        TweenMax.to([text, author], 0.5,{opacity: 1, delay: 0.8});
        
      } else {
        //error message for debugging could go here
      }
    };
    //if AJAX call fails fallback to array to stored quotes
    request.onerror = function(){
      //backup quotes object
      var backupQuotes = {
          1: ["Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.", 'Gen. George S. Patton'],
          2: ["If opportunity doesn't knock, build a door.", 'Saint Augustine'],
          3: ["If you believe in yourself and have dedication and pride - and never quit, you'll be a winner. The price of victory is high but so are the rewards.", 'Paul Bryant'],
          4: ["Keep your face always toward the sunshine - and shadows will fall behind you.", 'Walt Whitman']
        }
      //generate random number that corresponds with a key of the backupQuotes object    
      var backupQuoteNum = Math.ceil(Math.random() * Object.keys(backupQuotes).length);
      //use random number to select a quote to display in view
      text.innerHTML = backupQuotes[backupQuoteNum][0];
      author.innerHTML = "-" + backupQuotes[backupQuoteNum][1];
      //fade up quote and author
      TweenMax.to([text, author], 0.5,{opacity: 1});
      };
    //send AJAX GET request to quote API
    request.send();  
  };
  //page init function
window.addEventListener("load", function(event){
  //on page load generate first quote
  getQuote();
  //new quote button and tweet quote button
  var newQuote = document.querySelector('#new-quote'); 
  var tweetQuote = document.querySelector('#tweet-quote');
  
  newQuote.addEventListener("click", getQuote);
  //convert current quote and author to URI and use Twitter API to tweet it
  tweetQuote.addEventListener("click", function(){
  tweetQuote.setAttribute('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });

});