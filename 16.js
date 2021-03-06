'use strict';

/**
 * @param {string} h 
 * @returns {string}
 */
function hex2bin(h) {
	return h.split('').reduce(function(acc, i) {
		return acc + ('000' + parseInt(i, 16).toString(2)).slice(-4);
	}, '');
}

/**
 * @param {string} input 
 * @returns {{version: number, type: number, value: number|packet[]}, remaining: string}}
 */
function readBitsChunk(input) {
	const binaryBuffer = hex2bin(input).split('');
	/**
	 * @param {number} size 
	 */
	const pullBinary = (size) => {
		let ret = '';
		while (size--) {
			ret += binaryBuffer.shift();
		}
		return ret;
	};

	const readPacket = () => {
		const ret = {
			version: -1,
			type: -1,
			value: null, // @type {string|number}
		};
	
		let rawBinary = pullBinary(3);

		ret.version = parseInt(rawBinary, 2);
	
		rawBinary = pullBinary(3);
	
		ret.type = parseInt(rawBinary, 2);
	
		if (ret.type === 4) {
			// A number value to read
			let reading = true;
			let value = '';
			while (reading) {
				const byte = pullBinary(5);
				if (byte[0] == '0') {
					reading = false;
				}
				value += byte.slice(1);
			}
			if (value.length > 50) {
				throw new Error('Value size too big for Javascript! ' + value.length);
			}
			ret.value = parseInt(value, 2);
		} else {
			// Read the next bit to see how much we need to read
			const packets = [];
			const lenType = pullBinary(1);
			if (lenType === '0') {
				// Next 15 bits is how many bits we need to read, we can stop after returning the value
				const size = parseInt(pullBinary(15), 2);
				const oldSize = binaryBuffer.length;
				// Until we need to do something in this function now, just let the parent deal with this string
				while(oldSize - binaryBuffer.length < size) {
					packets.push(readPacket());
				}
			} else {
				let size = parseInt(pullBinary(11), 2);
				while (size--) {
					packets.push(readPacket());
				}
			}
			ret.value = packets;
		}
	
		return ret;
	};

	return {packet: readPacket(), remaining: binaryBuffer};
}

/**
 * @param {{version: number, type: number, value: number|packet[]}} packet 
 */
function processPacket(packet) {
	switch (packet.type) {
		case 4: {
			return packet.value;
		}
		case 0: {
			return packet.value.reduce((p, v) => processPacket(v) + p, 0);
		}
		case 1: {
			return packet.value.reduce((p, v) => processPacket(v) * p, 1);
		}
		case 2: {
			return Math.min(...packet.value.map(processPacket));
		}
		case 3: {
			return Math.max(...packet.value.map(processPacket));
		}
		case 5: {
			return (processPacket(packet.value[0]) > processPacket(packet.value[1])) ? 1 : 0;
		}
		case 6: {
			return (processPacket(packet.value[0]) < processPacket(packet.value[1])) ? 1 : 0;
		}
		case 7: {
			return (processPacket(packet.value[0]) == processPacket(packet.value[1])) ? 1 : 0;
		}
	}
	console.log(packet);
	return false;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d;

	// Make while loop
	const packets = [readBitsChunk(data).packet];
	/**
	 * 
	 * @param {number} p 
	 * @param {{version: number, type: number, value: number|c[]}} c 
	 */
	const packetReduce = (p, c) => {
		p += c.version;
		if (Array.isArray(c.value)) {
			p += c.value.reduce(packetReduce, 0);
		}
		return p;
	};
	return packets.reduce(packetReduce, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	return processPacket(readBitsChunk(d).packet);
};
