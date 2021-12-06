'use strict';

/**
 * @param {[*]} arr 
 */
function rotate_array(arr) {
	const first = arr.shift();
	arr.push(first);
}

/**
 * @param {[number]} data 
 * @param {number} days 
 * @returns 
 */
function simulateFish(data, days) {
	const fishLife = new Array(9).fill(0);
	data.forEach(fish => {
		fishLife[fish]++;
	});

	while (days) {
		days--;
		rotate_array(fishLife);
		fishLife[6] += fishLife[8];
	}

	return fishLife.reduce((p, v) => p + v, 0);
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split(',').map(e => parseInt(e, 10));
	return simulateFish(data, 80);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split(',').map(e => parseInt(e, 10));
	return simulateFish(data, 256);
};
