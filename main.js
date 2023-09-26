import { createTetrisGame } from "./tetris.js";


const tetrisGame = createTetrisGame(document.getElementById('tetrisGameBoard'));

console.log(tetrisGame);
tetrisGame.startGame();
