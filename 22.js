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
 * Took the code from https://www.reddit.com/r/adventofcode/comments/rlxhmg/comment/hpjrsge/?utm_source=reddit&utm_medium=web2x&context=3
 * @param {string} d 
 */
export const part2 = async d => {
	const instructions = [
		...d.matchAll(
			/(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g
		)
	].map((row) => [...row.slice(2, 8), row[1] === 'on' ? 1 : -1].map(Number));
	
	const map = [], nMap = [], max = Math.max, min = Math.min;
	
	for (const [xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, s1] of instructions) {
		for (const [xMin2, xMax2, yMin2, yMax2, zMin2, zMax2, s2] of map) {
			const xMin = max(xMin1, xMin2), xMax = min(xMax1, xMax2);
			if (xMin > xMax) continue;
			const yMin = max(yMin1, yMin2), yMax = min(yMax1, yMax2);
			if (yMin > yMax) continue;
			const zMin = max(zMin1, zMin2), zMax = min(zMax1, zMax2);
			if (zMin > zMax) continue;
			nMap.push([xMin, xMax, yMin, yMax, zMin, zMax, -s2]);
		}
		map.push(...nMap);
		nMap.length = 0;
		if (s1 === 1) map.push([xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, 1]);
	}
	return map.reduce((acc, [x1, x2, y1, y2, z1, z2, s]) => 
		acc + (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) * s
	, 0);
};
