'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const bits = [];
	d.split('\n').map(e=>{
		e.split('').map((e, i) => {
			if (bits[i] === undefined) {
				bits[i] = 0;
			}
			if (e == '1') {
				bits[i]++;
			}
			else {
				bits[i]--;
			}
		});
	});
	const gamma = bits.map((e)=>(e>0) ? 1 : 0).reduce((p, c) => {
		return (p << 1) + c;
	}, 0);
	const epsilon = ((1 << bits.length) - 1) ^ gamma;
	return gamma * epsilon;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	let oxg = data.slice(0);
	let co2 = data.slice(0);
	/**
	 * 
	 * @param {[string]} data 
	 * @param number pos
	 */
	const getBits = (data, pos) => {
		const bits = [0, 0];
		data.forEach(e => {
			bits[+(e[pos] == '1')]++;
		});
		return bits;
	};

	/**
	 * 
	 * @param {[string]} data 
	 * @param {number} pos 
	 * @param {string} bit 
	 */
	const filter = (data, pos, bit) => {
		return data.filter((e)=>{
			return (e[pos] == bit);
		});
	};

	// Find oxg value
	{
		let pos = 0;
		while (oxg.length > 1) {
			const bits = getBits(oxg, pos);
			if (bits[0] > bits[1]) {
				oxg = filter(oxg, pos, '0');
			}
			else if (bits[0] == bits[1]) {
				oxg = filter(oxg, pos, '1');
			}
			else {
				oxg = filter(oxg, pos, '1');
			}
			pos++;
		}
	}

	// Find co2 value
	{
		let pos = 0;
		while (co2.length > 1) {
			const bits = getBits(co2, pos);
			if (bits[0] < bits[1]) {
				co2 = filter(co2, pos, '0');
			}
			else if (bits[0] == bits[1]) {
				co2 = filter(co2, pos, '0');
			}
			else {
				co2 = filter(co2, pos, '1');
			}
			pos++;
		}
	}

	return parseInt(oxg[0], 2) * parseInt(co2[0], 2);
};
