'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split(',').map(e => parseInt(e, 10));
	const max = Math.max(...data);
	const min = Math.min(...data);
	let targetF = 0xffffff;

	for (let t = min; t <= max; t++) {
		let fuel = 0;
		data.forEach(e=> {
			fuel += Math.abs(t - e);
		});
		if (fuel < targetF) {
			targetF = fuel;
		}
	}
	return targetF;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split(',').map(e => parseInt(e, 10));
	const max = Math.max(...data);
	const min = Math.min(...data);
	let targetF = 9007199254740991;

	for (let t = min; t <= max; t++) {
		let fuel = 0;
		data.forEach(e=> {
			const f = Math.abs(t - e);
			fuel += f * (f + 1) / 2;
		});
		if (fuel < targetF) {
			targetF = fuel;
		}
	}
	return targetF;
	// 16777215 too low
};
