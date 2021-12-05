'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const numbers = data.shift().split(',');
	const boards = [];

	while(data.length) {
		// Remove the blank line
		data.shift();
		const rows = [];

		// Get the rows
		for (let r = 0; r < 5; r++) {
			rows.push(data.shift().trim().split(/ +/));
		}

		// We got the base board
		boards.push({
			rows: rows,
			rowsUnmatched: JSON.parse(JSON.stringify(rows)).map(row => row.map(col => parseInt(col, 10))), // Deep copy rows
			rowsMatch: [0,0,0,0,0],
			colsMatch: [0,0,0,0,0],
			numbersCalled: [],
			winingScore: 0,
			winingStep: false
		});
	}

	// Find the score and when the board wins
	boards.forEach(board => {
		for (let i = 0; i < numbers.length && board.winingStep === false; i++) {
			const rows = board.rows;
			for (let r = 0; r < 5; r++) {
				for (let c = 0; c < 5; c++) {
					if (rows[r][c] == numbers[i]) {
						board.numbersCalled.push(numbers[i]);
						board.rowsMatch[r]++;
						board.colsMatch[c]++;
						board.rowsUnmatched[r][c] = 0;
						if (board.rowsMatch[r] == 5 || board.colsMatch[c] == 5) {
							board.winingStep = i;
							i = 500;
						}
						// Found the number
						r = 5;
						c = 5;
					}
				}
			}
		}

		board.winingScore = board.rowsUnmatched.reduce((p, row) => row.reduce((p, col) => p + col, 0) + p, 0) * numbers[board.winingStep];
	});

	boards.sort((a, b) => a.winingStep - b.winingStep);

	return boards[0].winingScore;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	const numbers = data.shift().split(',');
	const boards = [];

	while(data.length) {
		// Remove the blank line
		data.shift();
		const rows = [];

		// Get the rows
		for (let r = 0; r < 5; r++) {
			rows.push(data.shift().trim().split(/ +/));
		}

		// We got the base board
		boards.push({
			rows: rows,
			rowsUnmatched: JSON.parse(JSON.stringify(rows)).map(row => row.map(col => parseInt(col, 10))), // Deep copy rows
			rowsMatch: [0,0,0,0,0],
			colsMatch: [0,0,0,0,0],
			numbersCalled: [],
			winingScore: 0,
			winingStep: false
		});
	}

	// Find the score and when the board wins
	boards.forEach(board => {
		for (let i = 0; i < numbers.length && board.winingStep === false; i++) {
			const rows = board.rows;
			for (let r = 0; r < 5; r++) {
				for (let c = 0; c < 5; c++) {
					if (rows[r][c] == numbers[i]) {
						board.numbersCalled.push(numbers[i]);
						board.rowsMatch[r]++;
						board.colsMatch[c]++;
						board.rowsUnmatched[r][c] = 0;
						if (board.rowsMatch[r] == 5 || board.colsMatch[c] == 5) {
							board.winingStep = i;
							i = 500;
						}
						// Found the number
						r = 5;
						c = 5;
					}
				}
			}
		}

		board.winingScore = board.rowsUnmatched.reduce((p, row) => row.reduce((p, col) => p + col, 0) + p, 0) * numbers[board.winingStep];
	});

	boards.sort((a, b) => b.winingStep - a.winingStep);

	return boards[0].winingScore;
};
