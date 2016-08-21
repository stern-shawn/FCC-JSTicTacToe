// There are 9 spots on the board, we can track these as the indexed locations in an array
var board = ['','','','','','','','',''];
var corners = [0,2,6,8];
var edges = [1,3,5,7];

// Default player letter is O
var playerChar = 'O';
var aiChar = 'X';
var gameActive = false;

// Start a fresh game
function startGame() {
  // Reset page state and make game 'active'
  clearBoard();
  gameActive = true;
  $('#fillMe').html('');
  // If the player chooses X, they will move AFTER the AI has moved first
  if (playerChar === 'X') {
    aiMove();
  }
}

// Visibly clear the board and reset its internal state
function clearBoard() {
  board = ['','','','','','','','',''];
  for (var i = 0; i < board.length; i++) {
    renderMove('', i);
  }
}

// Fill in the span beneath the board to let the player know who (if anybody) won and to start aother game if they want to
function declareWinOrTie(player) {
  if (player === playerChar) {
    $('#fillMe').html("Congratulations, you win! Choose X or O again to start a new game...");
  } else if (player === aiChar) {
    $('#fillMe').html("You lose this time! Choose X or O again to start a new game...");
  } else {
    $('#fillMe').html("Looks like it was a tie! Choose X or O again to start a new game...");
  }
  // Prevent further user input
  gameActive = false;
}

// Return if the current board is completely filled
function boardFull() {
  // Let's try to use the .every functionality here...
  return board.every(function(element) {
    return element !== '';
  });
}

// Return if the requested move is allowable (only edit unoccupied cells)
function legalMove(currBoard, moveIndex) {
  return currBoard[moveIndex] === '';
}

// Modify the given board with the expected move and return it. Does not directly edit the global board
// unless passed so we can use it to make hypothetical moves and check their results for the 'AI'
function makeMove(currBoard, player, moveIndex) {
  // console.log("Player: " + player + " is trying to move to " + moveIndex);
  currBoard[moveIndex] = player;
  return currBoard;
}

// Visually update the board with the given move...
function renderMove(player, index) {
  // Each cell has an id matched to the board indicies, update that div to contain the given character
  $('#' + index).html(player);
}

// Function to check if the given board contains a winning combo for the player
function hasWon(currBoard, player) {
  // Winning cases are Horizontal: (0,1,2), (3,4,5), (6,7,8)
  //                   Vertical: (0,3,6), (1,4,7), (2,5,8)
  //                   Diagonal: (0,4,8), (2,4,6)
  // Check to see if the board contains any permutation of a winning combo
  return (currBoard[0] === player && currBoard[1] === player && currBoard[2] === player) ||
    (currBoard[3] === player && currBoard[4] === player && currBoard[5] === player) ||
    (currBoard[6] === player && currBoard[7] === player && currBoard[8] === player) ||
    (currBoard[0] === player && currBoard[3] === player && currBoard[6] === player) ||
    (currBoard[1] === player && currBoard[4] === player && currBoard[7] === player) ||
    (currBoard[2] === player && currBoard[5] === player && currBoard[8] === player) ||
    (currBoard[0] === player && currBoard[4] === player && currBoard[8] === player) ||
    (currBoard[2] === player && currBoard[4] === player && currBoard[6] === player);
}

// Factored out code for player moves
function playerMove(moveIndex) {
  // ONLY perform action if the move can be done! No reason to accidentally let the AI go or modify the board otherwise
  if (legalMove(board, moveIndex)) {
    board = makeMove(board, playerChar, moveIndex);
    renderMove(playerChar, moveIndex);

    // Check for win or board filled, otherwise let the AI go next...
    if (hasWon(board, playerChar)) {
      declareWinOrTie(playerChar);
    } else if (boardFull()) {
      declareWinOrTie();
    } else {
      aiMove();
    }
  } /*else {
    // console.log("Unable to move to: " + moveIndex);
  }*/
}

// Make the AI try to win or prevent wins as much as possible...
function aiMove() {
  // TODO: Disable the entire board so the user can't accidentally somehow edit it while the AI is thinking

  // console.log("Looking for any moves that could win...");
  // First, check if any moves on the existing board would result in a win; if so, actually make that move.
  for (var i = 0; i < board.length; i++) {
    // Only spend time checking legal moves, save some time
    if (legalMove(board, i)) {
      // console.log("Move to " + i + " is legal, trying...");
      // Make a copy of the board in its current state
      var tempBoard = board.slice();
      // Make the current move on this copy
      tempBoard = makeMove(tempBoard, aiChar, i);
      // Log both to make sure we're editing the copy, not a reference...
      // console.log(tempBoard);
      // console.log(board);
      // If the modified copy now contains a winning combo, actually perform the move, go through any win sequence, and cut the function off here...
      if (hasWon(tempBoard, aiChar)) {
        // console.log("Move to " + i + " gives us a win, moving to " + i);
        board = makeMove(board, aiChar, i);
        renderMove(aiChar, i);
        declareWinOrTie(aiChar);
        return;
      } /*else {
        // console.log("Move to " + i + " does not give a win, trying next value...");
      }*/
    }
  }

  // If the ai can't win this turn, check to see if any moves the human player might make next turn will give THEM a win.
  // Block that move
  // console.log("Looking for potential human victories...")
  for (var i = 0; i < board.length; i++) {
    // Only check legal moves, save some time
    if (legalMove(board, i)) {
      // console.log("It would be legal for player to move to " + i + ", checking...");
      // Make a copy of the board in its current state
      var tempBoard = board.slice();
      // Make the current move on this copy
      tempBoard = makeMove(tempBoard, playerChar, i);
      // If we see the player win by making this move, put the AI there instead to prevent a win
      if (hasWon(tempBoard, playerChar)) {
        // console.log("Human would win if they moved to " + i + ", attempting to block...");
        board = makeMove(board, aiChar, i);
        renderMove(aiChar, i);
        if (boardFull()) {
          declareWinOrTie();
        }
        return;
      } /*else {
        // console.log("Human would not win if they moved to " + i + " checking next possibility...")
      }*/
    }
  }

  // console.log("I can't win and neither can they, lets try to take the center");
  // Otherwise, the strongest move is the take the center if it's open
  if (legalMove(board, 4)) {
    // console.log("Center is open, taking it!");
    board = makeMove(board, aiChar, 4);
    renderMove(aiChar, 4);
    if (boardFull()) {
      declareWinOrTie();
    }
    return;
  } /*else {
    console.log("Center is taken, trying next option...");
  }*/

  // console.log("Trying to find an open corner");
  // Otherwise, choose the first available corner spot since corners give more flexibility than side spots
  for (var i = 0; i < corners.length; i++) {
    var currCorner = corners[i];

    if (legalMove(board, currCorner)) {
      // console.log("Legal to move to corner " + i + ", moving there");
      board = makeMove(board, aiChar, currCorner);
      renderMove(aiChar, currCorner);
      if (boardFull()) {
        declareWinOrTie();
      }
      return;
    } /*else {
      console.log("Can't go there... try another corner");
    }*/
  }

  // console.log("Last option is to take an edge, let's find one");
  // Last option, take one of the side spots
  for (var i = 0; i < edges.length; i++) {
    var currEdge = edges[i];

    if (legalMove(board, currEdge)) {
      // console.log("Legal to move to edge " + i + ", moving there!");
      board = makeMove(board, aiChar, currEdge);
      renderMove(aiChar, currEdge);
      if (boardFull()) {
        declareWinOrTie();
      }
      return;
    } /*else {
      console.log("Edge " + i + " is taken, trying another");
    }*/
  }

  // TODO: Re-enable the board now that the AI is done, player's turn
}

$(document).ready(function() {
  // Player chooses to play as X
  $('#chooseX').click(function() {
    playerChar = 'X';
    aiChar = 'O';
    // console.log("Player is now X");
    startGame();
  });

  // Player chooses to play as O
  $('#chooseO').click(function() {
    playerChar = 'O';
    aiChar = 'X';
    // console.log("Player is now O");
    startGame();
  });

  // Player clicks any cell, attempt move to that (this) cell
  $('.cell').click(function() {
    if (gameActive) {
      playerMove(this.id);
    }
  });

  /*
  $('.topLeft').click(function() {
    if (gameActive) {
      playerMove(0);
    }
    // Seems silly to repeat this for every div... factor out
    // if (legalMove(board, 0)) {
    //   board = makeMove(board, playerChar, 0);
    //   renderMove(playerChar, 0);
    //   if (hasWon(board, playerChar)) {
    //     declareWinOrTie(playerChar);
    //   } else if (boardFull()) {
    //     declareWinOrTie();
    //   } else {
    //     aiMove();
    //   }
    // }
    // $('#0').html(playerChar);
  });

  $('.topCenter').click(function() {
    if (gameActive) {
      playerMove(1);
    }
    // $('#1').html(playerChar);
  });

  $('.topRight').click(function() {
    if (gameActive) {
      playerMove(2);
    }
    // $('#2').html(playerChar);
  });

  $('.midLeft').click(function() {
    if (gameActive) {
      playerMove(3);
    }
    // $('#3').html(playerChar);
  });

  $('.midCenter').click(function() {
    if (gameActive) {
      playerMove(4);
    }
    // $('#4').html(playerChar);
  });

  $('.midRight').click(function() {
    if (gameActive) {
      playerMove(5);
    }
    // $('#5').html(playerChar);
  });

  $('.botLeft').click(function() {
    if (gameActive) {
      playerMove(6);
    }
    // $('#6').html(playerChar);
  });

  $('.botCenter').click(function() {
    if (gameActive) {
      playerMove(7);
    }
    // $('#7').html(playerChar);
  });

  $('.botRight').click(function() {
    if (gameActive) {
      playerMove(8);
    }
    // $('#8').html(playerChar);
  });
  */
});
