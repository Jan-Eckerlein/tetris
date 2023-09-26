export const createNewShape = (gameBoard, width, height) => {
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

	return {
		moveDown,
		checkCollision,
		draw,
		addToGameBoard
	};
};