'use strict';

// Failed at following a tutorial for the pathfinding, so just used someone's code
// From https://github.com/joeyemerson/aoc/blob/main/2021/15-chiton/solution.js and https://github.com/joeyemerson/aoc/blob/main/2021/utils/PriorityQueue.js
function PriorityQueue(compare) {
	const _heap = [null];

	const _swap = function(a, b) {
		const temp = _heap[a];
		_heap[a] = _heap[b];
		_heap[b] = temp;
	};

	const _siftUp = function(idx) {
		const parent = Math.floor(idx / 2);
		while (parent > 0 && compare(_heap[idx], _heap[parent])) {
			_swap(idx, parent);
			_siftUp(parent);
		}
	};

	const _siftDown = function(idx) {
		const leftChild = idx * 2;
		const rightChild = idx * 2 + 1;

		if (
			leftChild < _heap.length &&
			compare(_heap[leftChild], _heap[idx]) &&
			(rightChild >= _heap.length || compare(_heap[leftChild], _heap[rightChild]))
		) {
			_swap(idx, leftChild);
			_siftDown(leftChild);
		} else if (rightChild < _heap.length && compare(_heap[rightChild], _heap[idx])) {
			_swap(idx, rightChild);
			_siftDown(rightChild);
		}
	};

	const enqueue = function(value) {
		_heap.push(value);
		_siftUp(_heap.length - 1);
	};

	const dequeue = function() {
		if (isEmpty()) return null;
		const top = _heap[1];
		const end = _heap.pop();

		// Check if we removed the last item
		if (!isEmpty()) {
			_heap[1] = end;
			_siftDown(1);
		}

		return top;
	};

	const isEmpty = function() {
		return _heap.length === 1;
	};

	return { enqueue, dequeue, isEmpty };
}

/**
 * 
 * @param {number} height 
 * @param {number} width 
 * @param {string[][]} grid 
 */
function shortestPath (height, width, grid) {
	const tileHeight = grid.length;
	const tileWidth = grid[0].length;
	const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	const costs = Array.from(Array(height), () => Array(width).fill(Infinity));
	const pq = new PriorityQueue((a, b) => a[2] < b[2]);

	pq.enqueue([0, 0, 0]); // Start at top-left corner

	while (!pq.isEmpty()) {
		const [r, c, prevCost] = pq.dequeue();

		if (r < 0 || c < 0 || r === height || c === width) continue;

		let cost = grid[r % tileHeight][c % tileWidth] + Math.floor(r / tileHeight) + Math.floor(c / tileWidth);
		if (cost > 9) cost -= 9;

		if (prevCost + cost < costs[r][c]) costs[r][c] = prevCost + cost;
		else continue;

		if (r === height - 1 && c === width - 1) break; // we found bottom-right corner

		for (const [rr, cc] of dirs) {
			pq.enqueue([r + rr, c + cc, costs[r][c]]);
		}
	}

	return costs[height - 1][width - 1] - grid[0][0];
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => parseInt(e, 10)));
	return shortestPath(data.length, data[0].length, data);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => parseInt(e, 10)));
	return shortestPath(data.length * 5, data[0].length * 5, data);
};
