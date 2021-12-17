'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const [, xMin, xMax, yMax, yMin] = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(d).map(e => parseInt(e, 10));
	const step = (pos, vel) => {
		pos[0] += vel[0];
		pos[1] += vel[1];
		if (vel[0] > 0) {
			vel[0]--;
		}
		if (vel[0] < 0) {
			vel[0]++;
		}
		vel[1]--;
	};

	// Find x velocities that will land in the target
	const xVelMax = xMax + 1;
	const validXVel = new Set;
	for (let xVel = 1; xVel < xVelMax; xVel++) {
		const pos = [0, 0];
		const vel = [xVel, 0]; // Don't care about the y yet
		while (vel[0] > 0 && pos[0] <= xMax) {
			step(pos, vel);
			if (pos[0] >= xMin && pos[0] <= xMax) {
				validXVel.add(xVel);
			}
		}
	}

	// Now to find xy velcity that gives us the 
	let yPosMax = 0;
	validXVel.forEach(xVel => {
		for (let yVel = 0; yVel < 5000; yVel++) {
			const pos = [0, 0];
			const vel = [xVel, yVel];
			let yPosCurMax = 0;
			let hitTarget = false;
			while (pos[0] <= xMax && pos[1] >= yMax) {
				step(pos, vel);
				yPosCurMax = Math.max(yPosCurMax, pos[1]);
				if (pos[0] >= xMin && pos[1] >= yMax && pos[0] <= xMax && pos[1] <= yMin) {
					hitTarget = true;
				}
			}
			if (hitTarget) {
				yPosMax = Math.max(yPosMax, yPosCurMax);
			}
		}
	});

	return yPosMax;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const [, xMin, xMax, yMax, yMin] = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(d).map(e => parseInt(e, 10));
	const step = (pos, vel) => {
		pos[0] += vel[0];
		pos[1] += vel[1];
		if (vel[0] > 0) {
			vel[0]--;
		}
		if (vel[0] < 0) {
			vel[0]++;
		}
		vel[1]--;
	};
	const validVel = [];

	// Find x velocities that will land in the target
	const xVelMax = xMax + 1;
	const validXVel = new Set;
	for (let xVel = 1; xVel < xVelMax; xVel++) {
		const pos = [0, 0];
		const vel = [xVel, 0]; // Don't care about the y yet
		while (vel[0] > 0 && pos[0] <= xMax) {
			step(pos, vel);
			if (pos[0] >= xMin && pos[0] <= xMax) {
				validXVel.add(xVel);
			}
		}
	}

	// Now to find xy velcity that hits the target 
	validXVel.forEach(xVel => {
		for (let yVel = yMax; yVel < 5000; yVel++) {
			const pos = [0, 0];
			const vel = [xVel, yVel];
			while (pos[0] <= xMax && pos[1] >= yMax) {
				step(pos, vel);
				if (pos[0] >= xMin && pos[1] >= yMax && pos[0] <= xMax && pos[1] <= yMin) {
					validVel.push([xVel, yVel]);
					break;
				}
			}
		}
	});

	return validVel.length;
};
