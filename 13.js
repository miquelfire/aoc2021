'use strict';

/**
 * 
 * @param {number[][]} board 
 * @param {string} dir 
 * @param {number} pos 
 */
function foldBoard(board, dir, pos) {
	switch (dir) {
		case 'y': {
			// Easy with the fact we're just merging rows
			const bottom = board.slice(pos);
			board.splice(pos);
			bottom.shift();
			while (bottom.length > 0) {
				pos--;
				const row = bottom.shift();
				row.forEach((v, x) => board[pos][x] |= v);
			}
			break;
		}
		case 'x':
			// Hard because merging columns is not really builtin like rows
			for (let y = 0; y < board.length; y++) {
				const right = board[y].splice(pos);
				right.shift();
				let x = pos - 1;
				while (right.length > 0) {
					const col = right.shift();
					board[y][x] |= col;
					x--;
				}
			}
			break;
		default:
			console.log('dir ' + dir + 'invalid');
			break;
	}
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n').map(e => e.split('\n'));
	const paperSize = [0,0];
	const dots = data[0].map(e => e.split(',').map(e => parseInt(e, 10)));
	dots.forEach(e => {
		paperSize[0] = Math.max(e[0], paperSize[0]);
		paperSize[1] = Math.max(e[1], paperSize[1]);
	});
	const board = [];
	for (let y = 0; y < paperSize[1] + 1; y++) {
		board.push([]);
		for (let x = 0; x < paperSize[0] + 1; x++) {
			board[y].push(0);
		}
	}
	dots.forEach(e => board[e[1]][e[0]] = 1);
	const foldRegEx = /([xy])=(\d+)/;
	const foldStep = foldRegEx.exec(data[1][0]);
	foldBoard(board, foldStep[1], foldStep[2]);

	return board.reduce((p, v) => p + v.reduce((p, v) => p + v, 0), 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n').map(e => e.split('\n'));
	const paperSize = [0,0];
	const dots = data[0].map(e => e.split(',').map(e => parseInt(e, 10)));
	dots.forEach(e => {
		paperSize[0] = Math.max(e[0], paperSize[0]);
		paperSize[1] = Math.max(e[1], paperSize[1]);
	});
	const board = [];
	for (let y = 0; y < paperSize[1] + 1; y++) {
		board.push([]);
		for (let x = 0; x < paperSize[0] + 1; x++) {
			board[y].push(0);
		}
	}
	dots.forEach(e => board[e[1]][e[0]] = 1);
	const foldRegEx = /([xy])=(\d+)/;
	data[1].forEach(e => {
		const foldStep = foldRegEx.exec(e);
		foldBoard(board, foldStep[1], foldStep[2]);
	});

	return '\n' + board.map(e => e.map(e => e ? '#' : ' ').join('')).join('\n');
};
