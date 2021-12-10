'use strict';

/**
 * Returns an array
 * [0] - `-1` if corrupted, '1' if just incomplete, `0` if it's normal somehow
 * [1] - If corrupted, the first invalid character, if incomplete... unknown as of Part 1
 * @param {string[]} chunk 
 */
function parseChunk(chunk) {
	const pairs = {
		'(': ')',
		'{': '}',
		'[': ']',
		'<': '>',
	};
	const opens = [
		'(',
		'{',
		'[',
		'<',
	];
	const stack = [];

	for (let i = 0; i < chunk.length; i++) {
		const chara = chunk[i];
		if (opens.includes(chara)) {
			stack.push(chara);
		}
		else {
			const open = stack.pop();
			if (chara != pairs[open]) {
				return [false, chara];
			}
		}
	}

	return [true, stack.map(e => pairs[e]).reverse()];
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => parseChunk(e)).filter(e => !e[0]).map(e => e[1]);
	const scores = {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137,
	};
	let sum = 0;
	data.forEach(e => sum += scores[e]);
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const scores = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	};
	const data = d.split('\n').map(e => parseChunk(e)).filter(e => e[0]).map(e => e[1])
		.map(e => e.reduce((p, v) => p * 5 + scores[v], 0));
	data.sort((a, b) => a - b);
	return data[Math.floor(data.length / 2)];
};
