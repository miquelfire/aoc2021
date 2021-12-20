'use strict';
import { deepCopy } from './utils.js';

/**
 * @param {number[]} enhancement 
 * @param {number[][]} image 
 */
function enhanceImage(enhancement, image) {
	const dir = [-1, 0, 1];
	const oldImage = deepCopy(image);

	image[0].forEach((e, i, a) => a[i] ^= 1);
	// Assume we don't need the edge
	for (let y = 1; y < image.length - 1; y++) {
		image[y][0] ^= 1;
		for (let x = 1; x < image[y].length - 1; x++) {
			let bitStream = '';
			for (const dirY of dir) {
				for (const dirX of dir) {
					bitStream += oldImage[dirY + y][dirX + x];
				}
			}
			image[y][x] = enhancement[parseInt(bitStream, 2)];
		}
		image[y][image[y].length - 1] ^= 1;
	}
	image[image.length - 1].forEach((e, i, a) => a[i] ^= 1);
}

/**
 * 
 * @param {number[][]} image 
 */
function displayImage(image) {
	console.log(image.map(e => e.map(e => e ? '#' : '.').join('')).join('\n'));
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const [enhancement] = d.split('\n\n', 1).map(e => e.split('').map(e => (e === '#') ? 1 : 0));
	const [,imageData] = d.split('\n\n').map(e => e.split('\n').map(e => e.split('').map(e => (e === '#') ? 1 : 0)));
	const image = new Array(imageData.length * 10);

	for (let y = 0; y < image.length; y++) {
		image[y] = new Array(imageData[0].length * 10).fill(0);
	}

	const startY = Math.floor(image.length / 2 - imageData.length / 2);
	const startX = Math.floor(image[0].length / 2 - imageData[0].length / 2);
	for (let y = 0; y < imageData.length; y++) {
		for (let x = 0; x < imageData[0].length; x++) {
			image[startY + y][startX + x] = imageData[y][x];
		}
	}
	enhanceImage(enhancement, image);
	enhanceImage(enhancement, image);
	return image.reduce((p, v) => p + v.reduce((p, v) => p + v, 0), 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const [enhancement] = d.split('\n\n', 1).map(e => e.split('').map(e => (e === '#') ? 1 : 0));
	const [,imageData] = d.split('\n\n').map(e => e.split('\n').map(e => e.split('').map(e => (e === '#') ? 1 : 0)));
	const image = new Array(imageData.length * 10);

	for (let y = 0; y < image.length; y++) {
		image[y] = new Array(imageData[0].length * 10).fill(0);
	}

	const startY = Math.floor(image.length / 2 - imageData.length / 2);
	const startX = Math.floor(image[0].length / 2 - imageData[0].length / 2);
	for (let y = 0; y < imageData.length; y++) {
		for (let x = 0; x < imageData[0].length; x++) {
			image[startY + y][startX + x] = imageData[y][x];
		}
	}
	for (let i = 0; i < 50; i++) {
		enhanceImage(enhancement, image);
	}
	return image.reduce((p, v) => p + v.reduce((p, v) => p + v, 0), 0);
};
