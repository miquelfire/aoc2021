'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const inputRegEx = /(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/;
	const data = d.split('\n').map(e => [...inputRegEx.exec(e)].splice(1).map(e => (!isNaN(e) ? parseInt(e) : e)));
	const reactor = new Set();
	for (const step of data) {
		for (let x = step[1]; x <= step[2]; x++) {
			if (x < -50 || x > 50) continue;
			for (let y = step[3]; y <= step [4]; y++) {
				if (y < -50 || y > 50) continue;
				for (let z = step[5]; z <= step[6]; z++) {
					if (z < -50 || z > 50) continue;

					const c = `${x},${y},${z}`;
					switch(step[0]) {
						case 'on':
							reactor.add(c);
							break;
						case 'off':
							reactor.delete(c);
							break;
						default:
							console.error('Unknown state in step', step[0]);
							break;
					}
				}
			}
		}
	}
	return reactor.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
