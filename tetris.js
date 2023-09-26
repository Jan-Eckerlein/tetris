import { createNewShape } from "./shapes.js";

export const createTetrisGame = (htmlNode) => {
	const width = 10;
	const height = 10;
	const tileWidth = 30;
	const interval = 1000;

	const node = htmlNode;
	const gameBoardElement = document.getElementById('tetrisGameBoard');

	let score = 0;
	let level = 1;
	let lines = 0;
	
	let gameBoard = [];

	// Setup game board
	const setupBoard = () => {
		gameBoardElement.setAttribute('style', `grid-template-columns: repeat(${width}, 1fr); grid-template-rows: repeat(${height}, 1fr)`);
	}

	// Create tiles
	const createTiles = () => {
		for (let i = 0; i < width * height; i++) {
			const tile = document.createElement('div');
			tile.setAttribute('class', 'tile');
			tile.setAttribute('id', `tile${i}`);
			gameBoardElement.appendChild(tile);
		}
	}

	// Init game board array
	const initGameBoard = () => {
		for (let row = 0; row < height; row++) {
			gameBoard[row] = [];
			for (let col = 0; col < width; col++) {
				gameBoard[row][col] = false;
			}
		}
	}

	const clearBoard = () => {
		const movingTiles = gameBoardElement.querySelectorAll('[data-moving-tile], [data-active-tile]');
		movingTiles.forEach(tile => {
			delete tile.dataset.movingTile;
			delete tile.dataset.activeTile;
			tile.style.removeProperty('background-color');
		});
	}

	const updateGameBoard = () => {
		gameBoard.forEach((row, y) => {
			row.forEach((value, x) => {
				const tile = document.getElementById(`tile${y * width + x}`);
				if (value) {
					tile.dataset.activeTile = true;
					tile.style.backgroundColor = value;
				} else {
					delete tile.dataset.activeTile;
				}
			});
		});
	};

	const gameLoop = (shape) => {
		clearBoard();
		if (!shape) {
			shape = createNewShape(gameBoard, gameBoardElement, width, height);
			if (!shape.checkCollision()) {
				alert('Game over!');
				shape = null;
				gameBoard = [];
				initGameBoard();
				return null;
			}
			shape.registerEvents();
			shape.draw();
		}

		else if (shape.moveDown()) {
			shape.draw();
		} else {
			shape.addToGameBoard(gameBoard);
			shape = null;
		}

		updateGameBoard();
		return shape;
	};

	const startGame = () => {
		let shape;
		let shapeId = 0;

		setupBoard();
		createTiles();
		initGameBoard();

		setInterval(() => {
			shape = gameLoop(shape);
		}, interval);

	}

	return {
		startGame
	};
}