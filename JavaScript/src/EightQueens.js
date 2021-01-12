
let count = 0;
function test() {
	// size = 4;
	// const size = 8;
	// const size = 80;
	// const size = 20;
	// const size = 30;
	// const size = 40;
	const size = 16;
	// const fisrstQueen = [5, 0];
	const fisrstQueen = [2, 7];
	solve(fisrstQueen, size);
}

function solve(firstQueen, size) {
	let queens = new Map();
	let chessboard = Array(size).fill(0).map(a => Array(size).fill('.'));
	// console.log(chessboard);
	// visalizeQueens(queens, chessboard);
	visalizeQueens();
	// return;

	// const result = tryQueen(firstQueen, queens, size);
	const result = tryQueen(firstQueen );
	// queens = Array.from(queens);
	// visalizeQueens(queens, chessboard);
	visalizeQueens();
	console.log({ count });
	console.log(result);
	queens = Array.from(queens);
	return { result, queens };
	// return solve;

	// function tryQueen(candidate, queens, size) {
	function tryQueen(candidate) {
		console.log({ candidate });
		count++;
		const [x, y] = candidate;
		if (queens.has(x)) {
			if (queens.get(x) == y) {
				return true;
			}
			else {
				return false;
				// console.log(candidate);
				// throw "doesn't match!";
			}
		}
		for (const queen of queens) {
			if (isConflict(candidate, queen)) {
				return false;
			}
		}
		queens.set(...candidate);
		// for (let i = 0; i < size; i++) {
		// if (j == y) continue;
		// if (queens.has(i)) continue;
		// if (queens.has(i)) return true;
		const nextX = (x + 1) % size;
		// let find = false;
		for (let i = 0; i < size; i++) {
			if (i == y || i == y - 1 || i == y + 1) continue;
			if (tryQueen([nextX, i] )) {
				// find = true;
				// break;
				return true;
			}
		}
		// if (!find) {
		queens.delete(x);
		return false;
		// }
		// }
		// return true;
	}

	function isConflict([x1, y1], [x2, y2]) {
		return y1 == y2 || x1 == x2 || y1 - x1 == y2 - x2 || y1 + x1 == y2 + x2;
	}

	// function visalizeQueens(queens, chessboard) {
	function visalizeQueens() {
		// queens = Array.from(queens);
		// size = queens.length;
		// const size = queens.size;
		// console.log({size});
		// array = Array(size).fill(0).map(a => Array(size).fill('.'));
		// console.log({array});
		Array.from(queens).forEach(([x, y]) => {
			// Array.from(queens).forEach(([x, y]) => {
			chessboard[y][x] = 'Q';
		});
		console.log(chessboard.map(a => a.join(' ')).join('\n'));
	}

}
test();