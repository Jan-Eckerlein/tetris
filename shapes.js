export const createNewShape = (gameBoard, gameBoardElement, width, height) => {
	const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'];
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

	const movingDownInterval = 200;
	let keepMovingDownIntervalId = null;

	// Create new shape
	const shape = shapes[Math.floor(Math.random() * shapes.length)];
	const color = colors[Math.floor(Math.random() * colors.length)];
	const shapeWidth = shape[0].length;
	const shapeHeight = shape.length;
	
	let shapeX = Math.floor(Math.random() * (width - shapeWidth));
	let shapeY = 0;

	const moveDown = () => {
		shapeY++;
		if (!checkCollision()) {
			shapeY--;
			return false;
		} 
		draw();
		return true;
	};

	const startMovingDown = () => {
		if (keepMovingDownIntervalId) return;

		keepMovingDownIntervalId = setInterval(() => {
			moveDown();
		}, movingDownInterval);
	};

	const stopMovingDown = () => {
		clearInterval(keepMovingDownIntervalId);
		keepMovingDownIntervalId = null;
	}

	const moveRight = () => {
		shapeX++;
		if (!checkCollision()) {
			shapeX--;
			return false;
		}
		draw();
		return true;
	}

	const moveLeft = () => {
		shapeX--;
		if (!checkCollision()) {
			shapeX++;
			return false;
		}
		draw();
		return true;
	}

	const checkCollision = () => {
		return shape.every((row, y) => {
			return y + shapeY < height &&
			row.every((value, x) => {
				return !value || !gameBoard[y + shapeY][x + shapeX]
			})
		});
	}

	const draw = () => {
		gameBoardElement.querySelectorAll('[data-moving-tile]').forEach(tile => {
			tile.style.removeProperty('background-color');
		});

		shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value) {
					const tile = document.getElementById(`tile${(y + shapeY) * width + (x + shapeX)}`);
					if (tile) {
						tile.dataset.movingTile = true;
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

	const registerEvents = () => {
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowLeft':
					moveLeft();
					break;
				case 'ArrowRight':
					moveRight();
					break;
				case 'ArrowDown':
					startMovingDown();
					break;
				case 'ArrowUp':
					rotate();
					break;
				default:
					break;
			}
		});
		document.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'ArrowDown':
					stopMovingDown();
					break;
				default:
					break;
			}
		});
	};

	return {
		moveDown,
		moveRight,
		moveLeft,
		checkCollision,
		draw,
		addToGameBoard,
		registerEvents,
	};
};