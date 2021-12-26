'use strict';

/**
 * 
 * @param {string[][]} grid 
 * @returns {boolean} If any movement was done
 */
function doStep(grid) {
	let moved = false;
	const height = grid.length;
	const width = grid[0].length;
	const movement = [];

	// East movement check
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (grid[y][x] == '>') {
				const target = (x + 1) % width;
				if (grid[y][target] == '.') {
					movement.push([y, x, target]);
					moved = true;
				}
			}
		}
	}

	// East movement
	while (movement.length) {
		const [y, x, target] = movement.shift();
		grid[y][x] = '.';
		grid[y][target] = '>';
	}

	// South movement check
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (grid[y][x] == 'v') {
				const target = (y + 1) % height;
				if (grid[target][x] == '.') {
					movement.push([y, x, target]);
					moved = true;
				}
			}
		}
	}

	// South movement
	while (movement.length) {
		const [y, x, target] = movement.shift();
		grid[y][x] = '.';
		grid[target][x] = 'v';
	}

	return moved;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	let steps = 1;
	while (doStep(data)) {
		steps++;
	}
	return steps;
};

/**
 * Day 25 doesn't have a part 2
 */
export const part2 = async () => 0;
