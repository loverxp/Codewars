// https://www.codewars.com/kata/5765870e190b1472ec0022a2/solutions/javascript
const wall = '*';
const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

let width;
let height;

function pathFinder(maze) {
    maze = maze.replace(/W/g, '*').replace(/\./g, '_');
    console.log(maze);

    maze = maze.split('\n').map(s => s.split(''));
    width = maze[0].length;
    height = maze.length;
    console.log(maze);

    const path = findExit([0, 0], maze);
    console.log(path);
    return path.length > 0;
}


function findExit(start, maze) {
    const [x, y] = start;
	if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
        return [];
    }
    else if (maze[y][x] == wall) {
        return [];
    }
    else if (x == width - 1 && y == height - 1) {
        return [{ x: x, y: y }];
    }
    else {
        maze[y][x] = wall;
        for (let index = 0; index < 4; index++) {
            const [xOffset, yOffset] = directions[index];
            const path = findExit([x + xOffset, y + yOffset], maze);
            if (path.length > 0) {
                path.unshift({ x: x, y: y });
                return path;
            }
        }
        return [];
    }
}

function logMaze(maze) {
    const str = maze.map(a => a.join('')).join('\n');
    console.log('maze:');
    console.log(str);
}


input1 =
    `.W.
.W.
...`;


input2 =
    `.W.
.W.
W..`;


input3 =
    `......
......
......
......
......
......`;


input4 =
    `......
......
......
......
.....W
....W.`;


console.log(pathFinder(input1));
console.log(pathFinder(input2));
console.log(pathFinder(input3));
console.log(pathFinder(input4));