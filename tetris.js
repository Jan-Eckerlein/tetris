export const createTetrisGame = (htmlNode) => {
	const width = 10;
	const height = 10;
	const tileWidth = 30;
	const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'];
	const interval = 1000;

	const node = htmlNode;
	const gameBoardElement = document.getElementById('tetrisGameBoard');

	let score = 0;
	let level = 1;
	let lines = 0;
	
	let gameBoard = [];

	const shapes = [
		[
			[1, 1],
			[1, 1]
		],
		[
			[1, 1, 1, 1]
		],
		[
			[1, 1, 0],
			[0, 1, 1]
		],
		[
			[0, 1, 1],
			[1, 1, 0]
		],
		[
			[1, 0, 0],
			[1, 1, 1]
		],
	];


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

	const createNewShape = (shapeId) => {
		// Create new shape
		const shape = shapes[Math.floor(Math.random() * shapes.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const shapeWidth = shape[0].length;
		const shapeHeight = shape.length;
		const id = shapeId;
		
		let shapeX = Math.floor(Math.random() * (width - shapeWidth));
		let shapeY = 0;

		const moveDown = () => {
			shapeY++;
			if (!checkCollision()) {
				shapeY--;
				return false;
			} 
			return true;
		};

		const checkCollision = () => {
			return shape.every((row, y) => {
				return y + shapeY < height &&
				row.every((value, x) => {
					return !value || !gameBoard[y + shapeY][x + shapeX]
				})
			});
		}

		const draw = () => {
			shape.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value) {
						const tile = document.getElementById(`tile${(y + shapeY) * width + (x + shapeX)}`);
						if (tile) {
							tile.dataset.movingTile = id;
							tile.style.backgroundColor = color;
						}
					}
				});
			});
		};

		const addToGameBoard = (gameBoard) => {
			shape.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value) {
						gameBoard[y + shapeY][x + shapeX] = color;
					}
				});
			});
		}

		return {
			moveDown,
			checkCollision,
			draw,
			addToGameBoard
		};
	};

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

	const gameLoop = (shape, shapeId) => {
		clearBoard();
		if (!shape) {
			shape = createNewShape(shapeId++);
			if (!shape.checkCollision()) {
				alert('Game over!');
				shape = null;
				gameBoard = [];
				initGameBoard();
				return null;
			}
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
			shape = gameLoop(shape, shapeId);
		}, interval);

	}

	return {
		startGame
	};
}