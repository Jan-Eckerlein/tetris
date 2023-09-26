import { createTetrisGame } from "./tetris.js";


const tetrisGame = createTetrisGame(document.getElementById('tetrisGameBoard'));

tetrisGame.startGame();
