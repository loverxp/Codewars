// https://www.codewars.com/kata/57658bfa28ed87ecfa00058a/solutions/javascript

//TODO: duplicate find shoud be be optimized 
function pathFinder(input) {
    console.log(input);
    
    const wall = 'W';
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const maze = input.split('\n').map(s => s.split(''));
    const steps = input.split('\n').map(s => s.split('').fill(-1));

    //0: unaccessed, 1: accessed & true, 2: accessed & false
    const states = input.split('\n').map(s => s.split('').fill(0));

    console.log(states);

    const width = maze[0].length;
    const height = maze.length;
    let count = 0;
    const result = findExit({ x: 0, y: 0 }, 0);

    console.log(steps);
    console.log({ count });
    // console.log(logMaze(states));

    if (result) {
        return steps[height - 1][width - 1];
    }
    else {
        return false;
    }

    function findExit(position, step) {
        count++;
        const { x, y } = position;
        console.log({position,step});
        
        if (x < 0 || y < 0 || x > width - 1 || y > height - 1 || maze[y][x] == wall) {
            return false;
        }
        else {
            if (steps[y][x] >= 0 && step >= steps[y][x]) {
                return false;
            }
            // if (steps[y][x] == -2) {
            if (states[y][x] == 2) {
                // return false;
            }
            steps[y][x] = step;
            if (x == width - 1 && y == height - 1) {
                return true;
            }
            else {
                let result = false;
                for (let index = 0; index < 4; index++) {
                    const [xOffset, yOffset] = directions[index];
                    result = findExit({ x: x + xOffset, y: y + yOffset }, step + 1) || result;
                }
                if (!result) {
                    // steps[y][x] = -2;    //cause result error!
                    // states[y][x] = 2;
                }
                return result;
            }
        }
    }
}

function logMaze(maze) {
    const str = maze.map(a => a.join(' ')).join('\n');
    console.log('maze:');
    console.log(str);
}

function test(input) {
    input = input.replace(/^\n/,'');
    console.time();
    const result = pathFinder(input);
    console.timeEnd();
    console.log({result} );
}

input1 = `
.W.
.W.
...`;


input2 =
    `.W.
.W.
W..`;


input3 = `
......
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

//10
input5 =
    `.....W
......
W..WWW
..W.W.
......
.W.W..`;

//16
input6 =
    `.......WW
.W.W..W..
......W.W
...W....W
.W....W..
WW......W
..W..W.W.
..W......
.W..W..W.`;

// console.log(pathFinder(input1));
// console.log(pathFinder(input2));
// console.log(pathFinder(input3));
// console.log(pathFinder(input4));
// console.log(pathFinder(input5));
// console.log(pathFinder(input6));
// test(input1);
// test(input6);
// test(input3);


t1 = `
....
....
....
....`;
test(t1);