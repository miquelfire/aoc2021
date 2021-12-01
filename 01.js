'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e=>parseInt(e, 10));
	let inc = 0;
	for(let i = 1; i < data.length; i++) {
		if (+(data[i]) > +(data[i - 1])) {
			inc++;
		}
	}
	return inc;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e=>parseInt(e, 10));
	const sums = [];
	let inc = 0;
	for(let i = 2; i < data.length; i++) {
		sums.push(data[i] + data[i - 1] + data[i - 2]);
	}
	for(let i = 1; i < sums.length; i++) {
		if (+(sums[i]) > +(sums[i - 1])) {
			inc++;
		}
	}
	return inc;
};
