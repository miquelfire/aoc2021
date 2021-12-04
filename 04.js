'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const numbers = (data.shift())[0].split(',');
	const boards = [];

	while(data.length) {
		// Remove the blank line
		data.shift();
		const rows = [];
		const cols = [];

		// Get the rows
		for (let r = 0; r < 5; r++) {
			rows.push(data.shift().trim().split(/ +/));
		}

		// Get the columns
		for (let c = 0; c < 5; c++) {
			const col = [];
			for (let r = 0; r < 5; r++) {
				col.push(rows[r][c]);
			}
			cols.push(col);
		}

		// We got the base board
		boards.push({
			rows: rows,
			cols: cols,
			winningScore: 0,
			winningStep: 0
		});
	}

	// Find the score and when the board wins
	// TODO
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
