'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	let maxX = 0;
	let maxY = 0;
	const grid = [];
	const data = d.split('\n').map(e => e.split(' -> ').map(e => {
		const pos = e.split(',').map(e => parseInt(e, 10));
		maxX = Math.max(maxX, pos[0]);
		maxY = Math.max(maxY, pos[1]);
		return pos;
	}));
	maxX++;
	maxY++;

	for (let x = 0; x < maxX; x++) {
		grid.push([]);
		for (let y = 0; y < maxY; y++) {
			grid[x].push(0);
		}
	}

	data.forEach(line => {
		const x1 = line[0][0];
		const y1 = line[0][1];
		const x2 = line[1][0];
		const y2 = line[1][1];

		if (x1 == x2 && y1 != y2) {
			// hor line
			const x = x1;
			if (y1 > y2) {
				for (let y = y2; y <= y1; y++) {
					grid[x][y]++;
				}
			}
			else {
				for (let y = y1; y <= y2; y++) {
					grid[x][y]++;
				}
			}
		}
		else if (y1 == y2 && x1 != x2) {
			// ver line
			const y = y1;
			if (x1 > x2) {
				for (let x = x2; x <= x1; x++) {
					grid[x][y]++;
				}
			}
			else {
				for (let x = x1; x <= x2; x++) {
					grid[x][y]++;
				}
			}
		}
		else {
			// Ignore this line for part 1
		}
	});
	return grid.reduce((p, v) => p + v.reduce((p, v) => {
		if (v > 1) {
			return p + 1;
		}
		return p;
	}, 0), 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	let maxX = 0;
	let maxY = 0;
	const grid = [];
	const data = d.split('\n').map(e => e.split(' -> ').map(e => {
		const pos = e.split(',').map(e => parseInt(e, 10));
		maxX = Math.max(maxX, pos[0]);
		maxY = Math.max(maxY, pos[1]);
		return pos;
	}));
	maxX++;
	maxY++;

	for (let x = 0; x < maxX; x++) {
		grid.push([]);
		for (let y = 0; y < maxY; y++) {
			grid[x].push(0);
		}
	}

	data.forEach(line => {
		const x1 = line[0][0];
		const y1 = line[0][1];
		const x2 = line[1][0];
		const y2 = line[1][1];

		if (x1 == x2 && y1 != y2) {
			// hor line
			const x = x1;
			if (y1 > y2) {
				for (let y = y2; y <= y1; y++) {
					grid[x][y]++;
				}
			}
			else {
				for (let y = y1; y <= y2; y++) {
					grid[x][y]++;
				}
			}
		}
		else if (y1 == y2 && x1 != x2) {
			// ver line
			const y = y1;
			if (x1 > x2) {
				for (let x = x2; x <= x1; x++) {
					grid[x][y]++;
				}
			}
			else {
				for (let x = x1; x <= x2; x++) {
					grid[x][y]++;
				}
			}
		}
		else {
			// Need calculate the line somehow
		}
	});
	return grid.reduce((p, v) => p + v.reduce((p, v) => {
		if (v > 1) {
			return p + 1;
		}
		return p;
	}, 0), 0);
};
