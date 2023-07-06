# Minesweeper Game

Assignment: Minesweeper Game
Your task is to create a functional Minesweeper game using HTML, CSS, and JavaScript. The Minesweeper game is a classic puzzle game where the player must uncover hidden mines on a grid-based board without triggering any of them.
Requirements:


The game should have a grid-based board consisting of cells. Each cell can be in one of three states: covered, uncovered, or flagged.
The board should have a user-defined size, allowing the player to choose the number of rows, columns, and mines.
The number of mines on the board should be randomly distributed.
When the player clicks on a covered cell, it should either uncover the cell or reveal a mine if the cell contains one. If a cell is empty (not adjacent to any mines), it should automatically uncover adjacent empty cells.
If the player uncovers a mine, the game should end with a “Game Over” message displayed.
The player should be able to flag a cell by right-clicking on it, indicating that they suspect the cell contains a mine.
The game should keep track of the number of mines remaining to be flagged.
When all non-mine cells are uncovered, the game should end with a “Victory” message displayed.

Guidelines:


Use HTML to create the game board layout and structure.
Use CSS for styling the game elements and layout.
Use JavaScript to handle game logic, including cell interactions, mine distribution, game state management, and win/lose conditions.
You can use additional libraries or frameworks if necessary, but try to keep the codebase as lightweight as possible.
Organize your code into separate functions and modules for better readability and maintainability.
Comment your code to explain the functionality and provide clear instructions.
