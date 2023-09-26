export const createTetrisGame = (htmlNode) => {
	const width = 10;
	const height = 20;
	const tileWidth = 30;
	const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'];

	const node = htmlNode;
	let score = 0;
	let level = 1;
	let lines = 0;

	const gameBoard = document.getElementById('tetrisGameBoard');
	

	// Create game board
	// width: ${width * tileWidth}px; height: ${height * tileWidth}px; 
	gameBoard.setAttribute('style', `
		grid-template-columns: repeat(${width}, 1fr); grid-template-rows: repeat(${height}, 1fr)
	`);


	for (let i = 0; i < width * height; i++) {
		const tile = document.createElement('div');
		tile.setAttribute('class', 'tile');
		tile.setAttribute('id', `tile${i}`);
		gameBoard.appendChild(tile);
	}
}