function pathFinder(input) {
	console.time("pathFinder");
	const maze = input.split('\n');
	const minRounds = input.split('\n').map(s => s.split('').fill(Number.MAX_SAFE_INTEGER));

	const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
	const width = maze[0].length;
	const height = maze.length;
	let count = 0;

	let minRound = Number.MAX_SAFE_INTEGER;
	let prevAltitude = maze[0][0];
	let prevMinRound = 0;

	const stack = [{
		position: [0, 0],
		visited: [false, false, true, true],
		processed: false
	}];

	while (stack.length > 0) {
		count++;

		const top = stack[stack.length - 1];
		const { position: [x, y], visited, processed } = top;

		if (processed) {
			handleNext(x, y, visited);
		}
		else {
			const altitude = maze[y][x];
			const round = Math.abs(altitude - prevAltitude) + prevMinRound;

			if (round < minRound && round < minRounds[y][x]) {
				minRounds[y][x] = round;
				top.processed = true;

				if (x == width - 1 && y == height - 1) {
					minRound = round;
					stack.pop();
				}
				else {
					handleNext(x, y, visited);
				}
			}
			else {
				stack.pop();
			}
		}
	}

	console.log({ count });

	console.timeEnd('pathFinder');
	return minRound;

	function handleNext(x, y, visited) {
		const index = visited.indexOf(false);
		if (index != -1) {
			visited[index] = true;
			const [xOffset, yOffset] = directions[index];
			const nextX = x + xOffset;
			const nextY = y + yOffset;

			let nextVisited;
			if (nextY == height - 1 && nextX == width - 2) {
				nextVisited = [false, true, true, true];
			}
			else if (nextX == width - 1 && nextY == height - 2) {
				nextVisited = [true, false, true, true];
			}
			else {
				const nextRightVisited = index == 2 || nextX == width - 1;
				const nextDownVisited = index == 3 || nextY == height - 1;
				const nextLeftVisited = index == 0 || nextX == 0;
				const nextUpVisited = index == 1 || nextY == 0;
				nextVisited = [nextRightVisited, nextDownVisited, nextLeftVisited, nextUpVisited];
			}

			stack.push({
				position: [nextX, nextY],
				visited: nextVisited,
				processed: false
			});
			prevAltitude = maze[y][x];
			prevMinRound = minRounds[y][x];
		}
		else {
			stack.pop();
		}

	}
}

function testMap(size) {
	let hundo = '';
	for (let i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			hundo += Math.floor(Math.random() * 10);
		}
		hundo += '\n';
	} console.log('Map of size ' + size + 'x' + size + ' generated. Running pathFinder...');
	// console.time('pathFinder');
	var answer = pathFinder(hundo.slice(0, -1));
	// console.timeEnd('pathFinder');
	return answer;
}


testMap(100);