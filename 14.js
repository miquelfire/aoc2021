'use strict';

/**
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
 * @param {string} template 
 * @returns Map<string, number>
 */
function createPairs(template) {
	const pairs = new Map();

	template.split('').reduce((p, c) => {
		const count = pairs.get(p + c) ?? 0;
		pairs.set(p + c, count + 1);

		return c;
	});

	return pairs;
}

/**
 * @param {Map<string, string>} inserts 
 * @param {Map<string, number>} pairs 
 * @param {number} rounds 
 */
function doRounds2(inserts, pairs, rounds) {
	while (rounds > 0) {
		const newPairs = new Map();
		for (const [pair, count] of pairs){
			const newElem = inserts.get(pair);
			if (newElem === undefined) {
				newPairs.set(pair, count);
				continue;
			}

			const newElem1 = pair[0] + newElem;
			const newElem1Count = newPairs.get(newElem1) ?? 0;
			newPairs.set(newElem1, newElem1Count + count);

			const newElem2 = newElem + pair[1];
			const newElem2Count = newPairs.get(newElem2) ?? 0;
			newPairs.set(newElem2, newElem2Count + count);
		}
		pairs = newPairs;
		rounds--;
	}
	return pairs;
}

/**
 * @param {Map<string, number>} template 
 */
function countElements(template) {
	const counts = new Map();

	for (const [pair, pairCount] of template) {
		for (const elem of pair) {
			const elemCount = counts.get(elem) ?? 0;
			counts.set(elem, pairCount + elemCount);
		}
	}

	for(const [elem, count] of counts) {
		counts.set(elem, Math.ceil(count / 2));
	}

	return [...counts];
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
	const data = d.split('\n\n');
	let template = createPairs(data[0]);
	const inserts = new Map(data[1].split('\n').map(e => e.split(' -> ')));
	template = doRounds2(inserts, template, 40);
	// Consider broken
	const count = countElements(template);
	//return count;
	count.sort((a, b)=> a[1] - b[1]);
	return count.pop()[1] - count.shift()[1];
};
