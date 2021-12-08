'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n')
		.map(e => e.split(' | ')[1].split(' ').filter(e => e.length == 2 || e.length == 4 || e.length == 3 || e.length == 7))
		.reduce((p, v) => v.length + p, 0);
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(' | ').map(e => e.split(' ')));
	let sum = 0;
	const lookupMap = {
		abcefg: 0,
		cf: 1,
		acdeg: 2,
		acdfg: 3,
		bcdf: 4,
		abdfg: 5,
		abdefg: 6,
		acf: 7,
		abcdefg: 8,
		abcdfg: 9,
	};

	data.forEach(line => {
		// Mapping table
		const mapping = {
			a: 'abcdefg', // Top
			b: 'abcdefg', // Top left
			c: 'abcdefg', // Top right
			d: 'abcdefg', // Middle
			e: 'abcdefg', // Bottom left
			f: 'abcdefg', // Bottom right
			g: 'abcdefg', // Bottom
		};

		// Edit the strings on the left to make some code easier to do
		// Sort on length of strings
		line[0].sort((a, b) => a.length - b.length);
		// Sort the characters, so that a dab would be abd, and ba would be ab, so we just do a string replace
		line[0] = line[0].map(e => e.split('').sort().join(''));

		// Find the right segments as we know 1 uses both (At this point, don't know which is which yet)
		const right = line[0][0];
		mapping.c = right;
		mapping.f = right;
		mapping.b = mapping.a.replace(right, '');
		mapping.d = mapping.d.replace(right, '');
		mapping.e = mapping.e.replace(right, '');
		mapping.g = mapping.g.replace(right, '');

		// Find the top segment
		const top = line[0][1].replace(right, '');
		mapping.a = top;
		mapping.b = mapping.b.replace(top, '');
		mapping.c = mapping.c.replace(top, '');
		mapping.d = mapping.d.replace(top, '');
		mapping.e = mapping.e.replace(top, '');
		mapping.f = mapping.f.replace(top, '');
		mapping.g = mapping.g.replace(top, '');

		// Find the middle segment
		let middle = false;
		let middleIndex = false;
		const fourSegs = line[0][2].replace(right, '').split('');
		fourSegs.forEach((e, fi) => {
			for (let i = 6; i < 9; i++)
				if (line[0][i].indexOf(e) == -1) {
					// We found the 0 character!
					middle = e;
					middleIndex = fi;
				}
		});
		fourSegs.splice(middleIndex, 1);
		mapping.d = middle;
		mapping.b = mapping.b.replace(middle, '');
		mapping.e = mapping.e.replace(middle, '');
		mapping.g = mapping.g.replace(middle, '');

		// We also found the Top right segment as well!
		const topLeft = fourSegs.pop();
		mapping.b = topLeft;
		mapping.e = mapping.e.replace(topLeft, '');
		mapping.g = mapping.g.replace(topLeft, '');

		// We can find the bottom thanks to knowing the middle now
		let bottom = false;
		for (let i = 3; i < 6; i++) {
			// Remove top and middle
			let seqs = line[0][i].replace(middle, '').replace(top, '');
			// Remove right
			right.split('').forEach(e => {
				seqs = seqs.replace(e, '');
			})
			if (seqs.length == 1) {
				// Found the bottom segment
				bottom = seqs;
			}
		}
		mapping.g = bottom;
		mapping.e = mapping.e.replace(bottom, '');

		// Now to figure out which of the rights are top and bottom (We solved for left already at this point)
		for (let i = 3; i < 6; i++) {
			if (line[0][i].indexOf(mapping.b) == -1 && line[0][i].indexOf(mapping.e) != -1) {
				// Found 2
				const topLeft = line[0][i].replace(top, '').replace(middle, '').replace(bottom, '').replace(mapping.e, '');
				mapping.c = topLeft;
				mapping.f = mapping.f.replace(topLeft, '');
			}
		}

		const reverseMapping = Object.keys(mapping).reduce((ret, key) => {
			ret[mapping[key]] = key;
			return ret;
		}, {});
		
		const translated = line[1].map(e => lookupMap[e.replace(/./g, (m => reverseMapping[m])).split('').sort().join('')]).join('');
		console.log(mapping);
		console.log(line[1].map(e => e.replace(/./g, (m => reverseMapping[m])).split('').sort().join('')));
		console.log(translated);
		sum += parseInt(translated, 10);
	});
	return sum;
};
