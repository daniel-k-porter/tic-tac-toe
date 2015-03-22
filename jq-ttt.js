// Wrap all code logic inside of a jQuery function call so
// that all of the HTML has loaded. If we didn't do this
// then we wouldn't be able to grab all of the HTML elements
// off of the page (as they would not have loaded yet).
$(function() {
  // Use a immediately invoked function to create a closure
  // for the turn variable. The idea is to avoid polution the
  // current scope with extra variables. The return value of
  // the immediately invoked function, is another function
  // that returns 'X' if the `turn` variable is `true` and
  // 'O' otherwise.
  var currentPlayer = (function() {
    // Define a scoped variable that determines which players
    // turn it currently is.
    var turn = false;
    // Return a function that changes which players turn it is
    // by negating the `turn` variable.
    return function() {
      // Negate the turn variable. That is if `turn` is true
      // change it to `false` and if `turn` is `false` change
      // it to true.
      turn = !turn;
      // Use a ternary operator that gives 'X' if `turn` is
      // `true` and 'O' is `turn` is `false`
      return turn ? 'X' : 'O';
    };
  })();

  // Grab the div with `id='board'` and set it to a variable
  // using jQuery
  var $board = $('#board');
  // Attach an `click` event listener to the board div
  // using jQuerys `.click` method
  $board.click(function(event) {
    // Use the event parameter to grab the target of the 
    // click event.
    // Use the jQuery `$` to turn the target element into a jQuery
    // HTML element
    var $el = $(event.target);
    // Grab the targets inner HTML using the jQuery `.html` method
    var elContent = $el.html();
    // Check to see if the inner HTML is '&nbsp;'
    if (elContent === '&nbsp;') {
      // If it is set the target elements inner HTML to be the
      // current player
      var player = currentPlayer();
      // Set the HTML elements inner html using the same jQuery
      // method that we used about to grab the elements content
      $el.html(player);

      // Toggle the current elements player class using jQuery's
      // `.toggleClass` method.
      $el.toggleClass(player);
    } else {
      // Otherwise, log that the element has already been played
      console.log("That Square has been played");
    }
  });

  // Grab the reset button by its id using jQuery
  var $reset = $('#reset');

  // Add `click` event listener to the reset button
  // using jQuery's `click` method
  $reset.click(function(event) {
    // Grab all elements with `class='box'` by using
    // jQuery
    var $boxes = $('.box');
    // Iterate through the array of boxes
    for (var i = 0; i < $boxes.length; i++) {
      // turn jQueryify an html element using jquery
      var $box = $($boxes[i]);
      // Reset the inner HTML to be 'nbsp' with jQuery's
      // `.html` method.
      $box.html('&nbsp;');
      // Reset the class list to be only 'box'
      // by using jQuery's `.removeClass` method
      $box.removeClass('X O');
    }
    // Reset the current player to be 'X'
    // NOTE: THIS IS TRICKY
    if (currentPlayer() === 'X') {
      currentPlayer();
    }
  });

});
