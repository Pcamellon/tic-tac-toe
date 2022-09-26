# How to make a tic-tac-toe game using HTML, CSS and JavaScript

Game making is one of the most popular branches of programming. It is also a fun way to learn any new programming language while creating an interesting project. In this series, we will go step-by-step through implementing a simple Tic-Tac-Toe game using HTML, CSS and JavaScript. It is a two-player turn-based game, played on a 3x3 grid with X and O marks. The player who manages to get their marks placed on the grid in a row, column, or diagonal first wins the game. We start with the markup, then we add some colors, and finally, we implement the logic.  


## What Will We Learn?   

* Setting a simple HTML markup. 
* Linking the HTML with an external stylesheet and a JavaScript file. 
* Selecting and modifying HTML elements using its classes and ids properties.  
* How to use CSS variables. 
* How to use modern CSS Grid and CSS Flexbox modules 


## Defining the Game App Structure 

We divide the code into three separate files to maintain organization and optimize it. We establish our app's overall structure in the index.html file first, then we define how it looks in style.css, and lastly, we implement the game logic in main.js.

The user interface consists in four main parts: 
1. Game Name 
2. Active Player Name 
3. Board 
4. Game Over Message

The name of the game can vary. This is "tic tac toe" by default. The Active Player Name's initial value is the player X’s name. The Board consists of a 3x3 grid and is where most of the game happens. Finally, the Game Over message shows who won the game or if it ended in a draw, and a button to restart the entire game. 
