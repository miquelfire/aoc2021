'use strict';
import {deepCopy} from './utils.js';

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => parseInt(e, 10)));
	const width = data[0].length;
	const height = data.length;
	let lows = 0;
	const lowPoints = [];
	for (let y = 0; y < height; y++) {
		const yPrev = (y == 0) ? false : y - 1;
		const yNext = (y + 1 == height) ? false : y + 1;
		for (let x = 0; x < width; x++) {
			const xPrev = (x == 0) ? false : x - 1;
			const xNext = (x + 1 == height) ? false : x + 1;
			if (
				(xPrev !== false && data[y][xPrev] <= data[y][x]) ||
				(xNext !== false && data[y][xNext] <= data[y][x]) ||
				(yPrev !== false && data[yPrev][x] <= data[y][x]) ||
				(yNext !== false && data[yNext][x] <= data[y][x])
			) {
				continue;
			}
			lows += data[y][x] + 1;
			lowPoints.push([x + 1, y + 1].join(','));
		}
	}
	return lows;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	/**
	 * @type string[][]
	 */
	const data = d.replaceAll('9', ' ').split('\n').map(e => e.split(''));
	const width = data[0].length;
	const height = data.length;
	const fillValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./;\'[]\\-=`~!@#$%^&*()_+{}|:"<>?'.split('');
	// Fill in with (visible) unicode characters I can't type
	for (let uni = 0x00a1; uni < 0x00AD; uni++) {
		fillValues.push(String.fromCodePoint(uni));
	}
	for (let uni = 0x00ae; uni < 0x0180; uni++) {
		fillValues.push(String.fromCodePoint(uni));
	}
	/**
	 * @type string
	 */
	const fillValuesIndex = deepCopy(fillValues).join('');
	const fillCount = fillValues.map(() => 0);
	/**
	 * 
	 * @param {string[][]} data 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {string} fill 
	 */
	const floodFill = (data, x, y, fill) => {
		// It's a wall! Ignore it
		if (data[y][x] == ' ') {
			return;
		}
		// Already filled! Ignore it (how did this happen?)
		if (data[y][x] == fill) {
			return;
		}

		data[y][x] = fill;
		fillCount[fillValuesIndex.indexOf(fill)]++;

		if (y > 0) {
			floodFill(data, x, y - 1, fill);
		}
		if (y + 1 < height) {
			floodFill(data, x, y + 1, fill);
		}
		if (x > 0) {
			floodFill(data, x - 1, y, fill);
		}
		if (x + 1 < width) {
			floodFill(data, x + 1, y, fill);
		}
	};

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (data[y][x] == ' ') continue;
			if (/[0-8]/.test(data[y][x])) {
				floodFill(data, x, y, fillValues.shift());
			}
		}
	}
	
	fillCount.sort((a, b) => b - a);
	return fillCount[0] * fillCount[1] * fillCount[2];
};
