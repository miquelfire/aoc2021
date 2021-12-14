'use strict';

/**
 * 
 * @param {Map<string, string>} inserts 
 * @param {string[]} template 
 * @param {number} rounds 
 */
function doRounds(inserts, template, rounds) {

	while (rounds > 0) {
		rounds--;

		let pos = template.length;
		while (pos > 1) {
			pos--;
			const temp = template[pos - 1] + template[pos];
			template.splice(pos, 0, inserts.get(temp));
		}
	}
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const template = data[0].split('');
	const inserts = new Map(data[1].split('\n').map(e => e.split(' -> ')));
	doRounds(inserts, template, 10);
	const count = [...template.reduce((p, v) => p.set(v, (p.get(v) || 0) + 1), new Map()).entries()];
	count.sort((a, b)=> a[1] - b[1]);
	return count.pop()[1] - count.shift()[1];
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
