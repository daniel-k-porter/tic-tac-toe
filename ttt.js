// Wrap all code logic inside of a onload callback so
// that all of the HTML has loaded. If we didn't do this
// then we wouldn't be able to grab all of the HTML elements
// off of the page (as they would not have loaded yet).
window.onload = function() {
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
  var board = document.getElementById('board');

  // Attach an `onclick` event listener to the board div
  board.onclick = function(event) {
    // Use the event parameter to grab the target of the 
    // click event.
    var el = event.target;
    // Grab the targets inner HTML
    var elContent = el.innerHTML;
    // Check to see if the inner HTML is '&nbsp;'
    if (elContent === '&nbsp;') {
      // If it is set the target elements inner HTML to be the
      // current player
      var player = currentPlayer();
      el.innerHTML = player;

      // Grab the target elements `class` attributes
      var classList = el.getAttribute('class');
      // And add a class to the elements current class list
      el.setAttribute('class', classList + ' ' + player);
    } else {
      // Otherwise, log that the element has already been played
      console.log("That Square has been played");
    }
  };

  // Grab the reset button by using it's id
  var reset = document.getElementById('reset');

  // Add `onclick` event listener to the reset button
  reset.onclick = function(event) {
    // Grab all elements with `class='box'`
    var boxes = document.getElementsByClassName('box');
    // Iterate through the array of boxes
    for (var i = 0; i < boxes.length; i++) {
      // Reset the inner HTML to be 'nbsp'
      boxes[i].innerHTML = '&nbsp;';
      // Reset the class list to be only 'box'
      boxes[i].setAttribute('class','box');
    }
    // Reset the current player to be 'X'
    // NOTE: THIS IS TRICKY
    if (currentPlayer() === 'X') {
      currentPlayer();
    }
  };

};
