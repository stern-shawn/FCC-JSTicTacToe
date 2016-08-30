# Tic Tac Toe Game - FreeCodeCamp Project
---
## 1. What This Project Does
This is a HTML/CSS/jQuery recreation of the classic game Tic-Tac-Toe. The user has the option of choosing to play as either X or O, and must test their wits against a simple "AI" that I made with the intent of always winning or tying the game vs the user. At the end, the user is notified of the winner/tie and can choose to try again.

The user stories for this project are:

* The user can play a game of Tic Tac Toe with the computer
* The game will reset upon completion so the user can play multiple times
* The user can choose to play as X or O
* Use any libraries or APIs needed, and give it your own personal style

Since this is my own personal project with some rather loose guidelines, it has this functionality in addition to the expected user stories:

* Player O always goes first (regardless of which letter the player chooses to be)
* A game in progress can be cancelled by selecting X or O agains
* Once a game is complete, the game board will render the winning/tie state until the user decides to play another game by selecting either X or O.

The originally submitted version of the app fulfilled all user stories, and the various iterations since then have been improvements either in styling or in making the code more succinct.

## 2. How To Set This Up
If you want to clone this project for yourself, the process is very simple due to the structure of the project.

1. Either manually download and unzip files to a location, or clone this repo through Git.
2. Open the index.html file in your browser. This project is built on HTML5/CSS3/JavaScript/jQuery and the necessary resources from Bootstrap and FontAwesome are linked through the HTML file, so there is no need to install any packages through NPM.

## 3. Project Goals
As one of my early web development projects, this was a chance for me to:

* Continue working with HTML/CSS for styling and creating a crisp, visually appealing user experience.
* Practice using jQuery to monitor divs and buttons for clicks and apply appropriate responses to the DOM.
* Practice application flow and control logic in JavaScript/jQuery to make a game with no bugs.
* Look for opportunities to use special JavaScript functions like .map, .every, etc to make code more pure and declarative vs imperative.
* Continue producing well-documented code with repetitive functionality factored out into specific functions that minimize redundancy, keep code short, and increase readability/maintainability.

Now that I'm coming back and reviewing past projects (such as this one), my new goals in addition to supporting the previous ones are:

* Redesign the app to fit into my growing design language/styling through color, layout, animations, and reduction of unnecessary elements
* Refactor any redundancies in my JavaScript and make old code compliant with current linters (such as AirBnB's standards)

## 4. Link to Live Site
The latest version of the site can be viewed [here](https://stern-shawn.github.io/FCC-JSTicTacToe/) thanks to gh-pages hosting.

## 5. Roadmap
TODO:

* ~~Establish initial template in plain HTML/CSS~~
* ~~Create variables to hold player/computer characters, buttons to enable them, and add jQuery to allow user to insert their current character into any div to verify rendering works~~
* ~~Create variable to track board state, and helper functions to:~~
    * ~~Clear the board~~
    * ~~Check if board is full~~
    * ~~Render a move to the board~~
* ~~Create game logic helper functions:~~
    * ~~Check if the given move is legal given the current board state~~
    * ~~Check if the given move will result in a win~~
    * ~~Check if the current board contains a winning move for the given player~~
    * ~~Make a move (visually and edit the global variables)~~
    * ~~Check legality of a move before making it~~
    * ~~If game has reached its end, check for win or tie and add HTML to let the user know~~
    * ~~Reset game state~~
* ~~Create AI for the computer that prioritizes victory by the following logic set:~~
    * ~~If the center is available, take it; this is the best move and maximizes chances of winning~~
    * ~~If the AI can make a move that will win, do it~~
    * ~~If the user will win in one move, block that move~~
    * ~~If a corner is available, take it~~
    * ~~If nothing else, take an edge space~~
* ~~Add event listeners in jQuery to check for user selection of X or O, and the different cells on the game board~~
* ~~Initial build of app on CodePen and submission to FreeCodeCamp.~~
* ~~Clean up redundant divs, classes, and CSS attributes~~
* Restyle app
* Add animations
