'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	let h = 0;
	let depth = 0;
	d.split('\n').map(e=>e.split(' ')).map(e=>[e[0], parseInt(e[1], 10)])
		.map(e=> {
			switch(e[0]) {
				case 'forward':
					h += e[1];
					break;
				case 'down':
					depth += e[1];
					break;
				case 'up':
					depth -= e[1];
					break;
			}
		});
	
	return h*depth;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	let h = 0;
	let depth = 0;
	let aim = 0;
	d.split('\n').map(e=>e.split(' ')).map(e=>[e[0], parseInt(e[1], 10)])
		.map(e=> {
			switch(e[0]) {
				case 'forward':
					h += e[1];
					depth += aim * e[1];
					break;
				case 'down':
					aim += e[1];
					break;
				case 'up':
					aim -= e[1];
					break;
			}
		});
	return h * depth;
};
