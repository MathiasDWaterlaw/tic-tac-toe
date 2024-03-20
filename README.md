Tic Tac Toe - Project

by Mathias Dell'Osa

This game is a small project recommended online by many developers.
The game was entirely developed by me, without the help of any tutorial.
I had fun developing it, but more importantly, I feel like I learned a lot about game design, page interactivity, and the DOM.

However, for now the game is only accessible from a computer, I haven't made it responsive yet.

At first I had no idea how to handle one of the players winning or the game being drawn.
I solved the problem by assigning the default value of NaN to each box in the game grid.
Every time a player clicks on one of the boxes, he assigns it the value 1 (the first player) or 0 (the second player).
If the sum of the numbers on one of the 8 winning lines is 3 the first player wins, if the sum is 0 the second player wins.

In the event that the program is unable to determine any winner, the program will try to add all the 9 boxes of the grid, 
if the result is 4 or 5 the game is a draw.

In future projects I will have to improve the naming of variables, classes and ids, 
and focus on organizing the work better so as to make the files less confusing when looking at them.