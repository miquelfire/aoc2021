'use strict';

class SnailPair {
	/**
	 * 
	 * @param {number|SnailPair} l 
	 * @param {number|SnailPair} r 
	 */
	constructor(l, r) {
		this.left = l;
		this.right = r;
	}

	getHeight() {
		let height = 0;
		if (typeof this.left !== 'number') {
			height = this.left.getHeight();
		}
		if (typeof this.right !== 'number') {
			height = Math.max(height, this.right.getHeight());
		}

		return height + 1;
	}

	reduce(targetHeight = 4) {
		while (this.getHeight() > targetHeight) {
			let leftReturn = 0;
			if (typeof this.left == 'object' && this.left.getHeight() > targetHeight - 1) {
				this.left.explode(targetHeight - 1);
			}
			if (typeof this.right == 'object' && this.right.getHeight() > targetHeight - 1) {
				this.right.explode(targetHeight - 1);
			}
			break;
		}
	}

	/**
	 * This pair needs to be reduced in height because the parent pair is too high
	 * @param {number} targetHeight 
	 */
	explode(targetHeight) {
		console.log(targetHeight);
	}
}

/**
 * @param {string} strNumber 
 */
function parseSnailNumberString(strNumber) {
	const pairs = [];
	const pairRegex = /\[(p?\d+),(p?\d+)]/;
	while (strNumber[0] === '[') {
		const idx = 'p' + pairs.length;
		const [pairStr, ...pairArray] = pairRegex.exec(strNumber);
		strNumber = strNumber.replace(pairStr, idx);

		if (pairArray[0][0] == 'p') {
			pairArray[0] = pairs[pairArray[0].slice(1)];
		} else {
			pairArray[0] = parseInt(pairArray[0]);
		}
		if (pairArray[1][0] == 'p') {
			pairArray[1] = pairs[pairArray[1].slice(1)];
		} else {
			pairArray[1] = parseInt(pairArray[1]);
		}
		pairs.push(new SnailPair(...pairArray));
	}

	return pairs.pop();
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	// Debugging reducing
	const pair = parseSnailNumberString(data[0]);
	pair.reduce();
	console.log(pair.getHeight());
	return false;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
