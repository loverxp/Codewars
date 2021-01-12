// https://www.codewars.com/kata/57658bfa28ed87ecfa00058a/solutions/javascript

function pathFinder(input) {
    console.log(input);
    const wall = 'W';
    const maze = input.split('\n').map(s => s.split(''));
    const accessed = input.split('\n').map(s => s.split('').fill(false));
    const width = maze[0].length;
    const height = maze.length;
    let count = 0;
    const step = findExitWithBfs();

    console.log("\n", { count });

    return step != -1 ? step : false;

    function findExitWithBfs() {
        const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        const queue = [{
            position: [0, 0],
            step: 0
        }];

        while (queue.length > 0) {
            count++;
            const first = queue.shift();
            const { position: [x, y], step } = first;
            accessed[y][x] = true;
            if (x == width - 1 && y == height - 1) {
                return step;
            }
            else {
                for (let index = 0; index < directions.length; index++) {
                    const [xOffset, yOffset] = directions[index];
                    const nextX = x + xOffset;
                    const nextY = y + yOffset;

                    if (nextX >= 0 && nextY >= 0 && nextX < width && nextY < height && maze[nextY][nextX] != wall && !accessed[nextY][nextX]) {
                        if (-1 == queue.findIndex(({ position: [x, y], _ }) => x == nextX && y == nextY)) {
                            queue.push({
                                position: [nextX, nextY],
                                step: step + 1
                            });
                        }
                    }
                }
            }
        }
        return -1;
    }
}

function logMaze(maze) {
    const str = maze.map(a => a.join(' ')).join('\n');
    console.log('maze:');
    console.log(str);
}

function test(input) {
    // input.shift();
    // input = input.replace("\r\n\r\n",'');
    input = input.replace(/^\n/, '');
    console.time();
    // const result = input;
    const result = pathFinder(input);
    console.timeEnd();
    console.log({ result });
}

input1 = `
.W.
.W.
...`;


input2 = `
.W.
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

bigMaze = `
..W..........W..W...W.W.W...W.W.W........W.W...W............W..W.WW.W.W......W.......W.......WW...W.
.....W..W........WWWWW.W..WWW.......W....W...W...W..W...W.W.....W.......W.W.W..W...W.WW..W...W.....W
........W..W........W..W.WW......W....WW..WW...........W.W..................W.W.W....W....W..W.W...W
..W.WW.....WW..W...WWW.W..W..W..W.....W.............W...W....W...W......W..WW....WW..W..W.........WW
.W.WW.....W..W..W......W......WWW...W...............W..W.....W.W..W...W..W..W...W.........W......W.W
W......WW...............WW.WW..W...W.WW....WWW...W..W....W.W.W......W..........W...W....W......W.W..
WW.W.....W.WW.........WW.....W...........W.....W.....W.....W.WW.......W.....W....WW.....WW.WW.....WW
.WWW.....W.W.......W....W.W..W....W....WW..WW........W.WW.....W.WWW.......W..W............W......W..
....W...W.W.....W........W..WWWW..............W.W....WW...WW..WWW.WW..W...W........W......W...W..WWW
..W.....W.W............W.....W..WW.....W..W.....W.W.WW....W......W.W...WW.W...WW..W.W.W.W.....W.W...
W..W.WW..W.W...WW.WW.............W..WW...W...W.WW.W........W.W.W...W......W......W..W.........WW....
.W......WWW.W.....W...W...........W..WWW...WW.........WWWW...W..W.WW.WW..........WW........W.WW.W..W
..W.W....W....WWW.WW.W..WW.W..W.....W..WW..W......W..W......WWWWWW.....W.......W..W.......W.........
.W..W......WW...W.....W..W.......W...W...WW...W.W...W.....WWW.......W..W.W..WW...W.W..W.W.....W..W..
W......WW.........W...WW...W..W...WWW....W........WW.....W.......W.WW..W.....WW...W.........W.WW....
..W.....W.W...WW.W..WWW.W..W.W..W........W.W..WW..W.W.................W.WW..WWWW..WW...W..W.W..W.W.W
...W.W..........WW..WWW.......W........W.......WW.WW.W..WW..W............W...W..W......W.WW...WWW.W.
.....W...........W..W.WWWW.WW........W.W...W.WWWW.WW....W.........W.W.......W.....W.W.WW....W....WWW
.WW.WW.WWW.....W....W....W.W..........WW..W..W..W.W.........W..WW..WW..W.W.W....W.W..W.W...W.WWW....
....WWWWW.....WWW..W....WW..W..W.....WWW....WW...W....W...W...W.W.......W......W......W.W...W.WW.W..
.....WW..W.WWWWW....W.W...........WW.WW..W.....W.W..WW.W.........W.W....WWW....W..........WWW..W....
W............WW......W.W.W......WW..W..W.W.............W...WW......W.....W.W.W..W..W..WW.W.WWW.WW..W
W........WW..............W.WW.W.W..WWWWW......W.........W..W...W....W....WW..........W...WW.....W..W
.......W....WW..W.W....W.......WW.......W....W........W.......W....W..W....W.W.W.W.WW..WW...........
WWWWW.......W.W.....W.W..............WW......WWW..WW....WW....W.W..W.....W.......WW.W......W.W...W..
..W.W..W.WW.W.W..WW...W.WWW..W..W....W...WWW.WW....W..W....W...W..WW...WW.....W.....W.W........W....
WW........................W.W..W..W...W.W...WW.......W.W.....W..WW..WW.WW...W..WW.WWWW.W...WW.W.....
W..W....W...WWW.W...WW..............W..WWW.W.WW.WW....W....WW.W....W..W...W.WWW..W.WW.......W.W..W..
.WW..WW...W.W....W....W..W.W.W.....W....W..WW.W........WW.W.....WWWWW.W..W.W..W.....W........W......
..WW..WW.W.W..W....WW.WWW.....W..WW.....W.WW.W........W.......WW..W...W..WWW...W..W..W..W..W...WW...
....WW...W....W.......................W....W.W.WW.W......W.W.....WW.W...........W..W.W...WWW.....WW.
.W.....WWW......W.W....W..W...............W.........W.....WWW.......WW....W..W.W.....W.W.W..WWW.....
W..........WWW....WW..........W........W...W....W.W.W....WW...WW.W....WW........W.WWW.....W..W.W....
.W.W.WW..W.W..W.W......W.W.......W.W.W..W.WW........W........W.WW..WW..W............W.W..W....WW.WW.
.W.W.W......W..W.......W....W......W...W...WW...........W....W.........W..WWW.W...W.WW......W..W....
...W.W...W............WW......W........W..W.....WW.WW..W....W.W.W.......WW.......W.......WW.........
...W.....WW.WWWW..WWW.WW....W..W.W.....W....W.WW....W...W..WW..W.W..W....WW....W....W..WW..W.W.W..W.
WWW...WW..W..................W...W.W.W.......W.....WW..............WWW....W...W.W................W..
..WWW......WW..W.....W..W......WW.WW.....WW....W..WWW..WW...W...W.....W......W.W...WW......W....W...
...W..W.W......W..W......W.W.WW...W.W..WW...W...W.WW.W.WW...W.....W.....W....W.............W.....W..
.W.WWW........WW.WW.W..W.W..W.WWW.........W....W.W......WW......WW..W.......W..WW.W......W...W....WW
.W......W.W.WW.WW....W......W..W.W........W...WW.W..................W.W.....W.W.W.W.W.WW.W..W..W.WW.
......WWW...W..W..W.W...W..WWW.W...W..W.....WW...W..W.....W...WW..........W..W...WWW.WWW............
...WWWWW....W...WWW.WW...W..............W......W...W....W......W...W..W....WW...WW.W...W......W.....
......W..W..WW.WW.W.W.....W.....WW........W......WW..WW..WW.....WW.W..W....WW....W........WW.W..WW.W
..WW..W..W......W.W.WW.WWW.......W..W..W..W.W...W..........W.W.W...W...WW.W....WW.W.WW..W.......W.W.
W.....W.......W..W...WWW...WWWW........WWW..W.W.W.W...........W.W......W.............W........W...W.
W.W.WW.W........WW..W.........W....W...W..W.W.......W.W..W.W..W..W..W..W..W..WWW.W..WW..WW.W..W.....
..W...WW..W..WW..WW..WWWWW.....W..WWW....W......WW.W.........WWWW....W...W......W.W..W...WW....WW...
...WW............W.WW..W.WW.....WW.WW.W..W......W.WW...W............W.W.W..W.......WWW.W.WW...WW....
.....W.....W....W.W..WW.....WW......W....W..WWW...W........W.W....WW......WW.WW...WW.....W...WW...W.
WW..W.W.WWW..W.WW..WW.W.WW.W..W..W..W.WWW.......WW.....WW......W...W.W....W......WW.W......WW...W...
W..W.W.WW......WWWWW..W....WW.....WW.WWWW.....WW...W..WWW..W...W.WW..W..WW..WW..............W.......
..W....W..WWWWW.W...WWW.....W.W...........W.WW.......W...W.W.W.......W.WWW.W.W..W....W.......W.W..W.
...WWW..W...WWW.W....WW..W......W.W.........W....WW.W.............W..W..WWWW.W..W..W.....W...W..W...
WW........W.........W......W....W.WW.....WW.W...W..WWW...W...W..W.W.W..W...W.W..W........W...W.....W
.W....WW..W...W....WWWWW.....W.....WW.....W.....W..W.........W.W........W....W...WW...WW......W.....
.WW.W.....W....WW.W..W.......WW...W.....W....W..W.W...WW....W..W.W.....W...W......W.......W...W..W..
..WW.W.....W....W.W..........W.W...WWW.W..W.WWWW....W...W..W.......WW...W....W...W..W..WWW.........W
W..W.....W.W..W.W..W....W..................W......W.......W.W......W..W....W....WW.....W.W...WW....W
..W..W.W.........W...WWW...........W.........W...WW.W...WW...W.W.W...WW............W.WW...W.W.W...WW
...W..............W......W........W.W.....W.W....W...W...WW...W.W..W....WWW.....W..W..W..........W..
...WW.WW...W...W.W..W.....WWW.W.W.W.WW....W.W.W.W.W.W......WWW..W.........WW...W..W...WW..W.W...WW..
..WWW.WWW...W.W.W......W............W.......W.W...WWWW.....W..........W...W..W..W....WW......W.....W
..W...W....W..W...W.......W.W...W..WW..W......W.....W...WW.W.......W.W..W...W..W....W..WW....W......
..W...W..W......W...W..WWWWW...W.W.WW.W.W..W..W.......W...WW....W...W.WW.W.W......W.W....W.W..W.W...
WW...W..W..WW.W....W.WW....W...WW....WW.W..W..W.W...........WW...W.......WW.W...WW.W.W......W......W
.W......W..W...W..W.....W......W.W..W.W.....W.W....W....W.......W.W.W.........WW.....W.W.........W.W
W..........WWW...W..W..W.W....W.........WWW..WW..W..WW...WW..WW..WW..W.....W..W..WWW.....W.W..W....W
.........W.W.........W.....W.........W......WWW..W......W....WW..WW..W....W.W.....WW.W.W..WWW..W...W
.W.....W.W...W.W..W.W.W....W.............WW...W...W........WW....W..WW...WW.WWW.....WW.....W..W.W..W
...W.....W.W.W.W.W...W..WW..W.....W..WW.W.W.W.....W......W........W.WW.....WW.W.......WW.WW.....W...
....WWW....WW.......W....W...........WW....W.......WWW.....WW...W.............W.W..W......WWW.....W.
.W.W........W...................WWW...........W.W.....W..W..W.W...WW......WW.......WWW.WW.WW.W.WWW..
..W........W......W..WWWW.W......W.W.........W...........W.....W.......W.W....W.....WW.WW....W......
.W..W....W..W...W.W.WWW..W.W..WW......W......WWWW......W.W....W..W........W..W..WWWW.W...WW.W...WW.W
.....W...W.......WW.W....W.W.WW....WW.........W...W......W.W.W.W..W............W.W..W..W......W.....
.WW.W....W..W.W.W............W....W....W...........W.....WWW.WW.....WWWWW..........WW..WW.W......W.W
WW.......W...W..W.W..W.W...W.WWW...W.W........W.W...W...W.WW.WWWWW.....W.......W.W.......WW....WW...
W...W.......W....W.W....W.W..WW.W..W.......W...W..WWW.W......WWWWW..WWWW....WWWW.....WWW.WW.W.W.....
....W.....WW.W.......W..........W.W..WWW.W...W...W...W..W.....WWWW........W...W.....WWWWW..W.......W
....W...W........WWW.WW..WWW.W..W...WW....W..WWW.WW.W....WW.....WWW..WW....W.WW...W....W.W.WWW...WW.
.W.WW.....W...W..W......W.W....W..W......W...WW........W.W...W...W...WW......................W...W..
.......W.WW.WW..W....W.WW..W.W..W.......W....W.....W...........WW....W..W.W..W....W.W.WWW....W...W..
...WW...WW.....W...WW..W.W..W.....W......W....W...W......WW.W.......WWW.W.WW.......WW........W.W....
W.W.W..W........WW..............W........W........W..W.....W.....WW.W.W...WW....W....W....W....W....
.............WW....W.W.......WWW..............W......W.......W..WW.................WWW.W.....W....W.
.WW.......W...W.WW....W...WWW..WWW.WW..W..........WWW...W......WWW..WWWWW..W.W....W...W..W.....W....
.W.....W.....W..WWWW..W....W......WWW.....W..........W.W..W...W......WW..WWW.W....WWW...W....WWW....
.WWWW.W...W.W.W.........W.....WW..W.W..W..W...W.W.W...W........WW....W..WWWW.W....WW.....W..W.....W.
W..W....W.WW..WW....W.WW.W.W....W.W...W......W.WW.......WW.W...WW...W...W.WW.........WW....WW..W..WW
W.......WW..W...WWW.WW...........W.WW.W....W.W.....WW..WWWWW....W....W.W...W.W.W.W.W..W.....W.W...W.
.WW...WW.W.......WWW...W...W......WW..W.....W.W.....W...WW....W...W.W...W..W.WW.W.W..W....W.........
W.W...W.W.WWWWWW.W.W.W...W.W..WW......W.W..........W....W.........W.WW.W...WWW..WW.WW.....W......WW.
.WWW..WW..W.....WW....WW.WW...........W.WW.W......WW....W..W.....WW.....W.......WW..W...WWW.........
..W..WW..........WW....WW.WW..W..W.WW....W.......W...W.......W..W..W...W..WW....WW.....WWW....W.W...
W...W..W....W........WW..W.WWW.WW...W......W....W..W....W.W.W.W.....WW.W...W.W.WWW...WW....W.W.....W
.W..W..W.W..WWW..W.W.......W...........W....W.W.....WW........WW.....W....WW.W....W........W.....W..
.........W...W..WW...WW....W.WWW.W......W...W.WWW.....WW.W..WW......WW..W....W......W.W............W
W.....W..W...W..WW...W..W..W.W...W..WW.....W......WW..W....WWW....W......W...WW........W..WW......W.`;

// console.log(pathFinder(input1));
// console.log(pathFinder(input2));
// console.log(pathFinder(input3));
// console.log(pathFinder(input4));
// console.log(pathFinder(input5));
// console.log(pathFinder(input6));
// console.log(input1);

// console.log(bigMaze);
// test(input1);
// test(input3);
// test(input6);
// test(bigMaze);

t2 = `
..
..`;
t23 = `
...
...`;
t3 = `
...
...
...`;
t32 = `
..
..
..`;
t4 = `
....
....
....
....`;
// test(t0);
// test(t1);
// test(t2);
// test(t23);
// test(t32);
// test(t4);
// { count: 272 }
// default: 792.597ms
// { count: 50 }
// default: 59.450ms
// { count: 24 }
// default: 27.849ms
// { count: 16 }
// default: 14.990ms
test(bigMaze);