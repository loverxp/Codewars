
const left = '<';
const right = '>';
const up = '^';
const down = 'v';
const directions = [up, right, down, left];
let width;
let height;

function escape(maze) {
	width = maze[0].length;
	height = maze.length;
	maze = maze.map(s => s.split(''));
	let start = [];
	for (const [y, line] of maze.entries()) {
		const x = line.findIndex(s => directions.includes(s));
		// let d;
		// const x = line.findIndex(s => {
			// d = s;
			// return d == s;
			// directions.includes(s);
		// });
		if (-1 != x) {
			start = [x, y, maze[y][x]];
			break;
		}
	}
	console.log(start);

	const path = findExit(start,maze);
	if(path.length > 1){
		pathArray = path.split("");
		pathArray.pop();
		return pathArray;
	}
	else{
		return [];
	}
}

const moves = ['F', 'RF', 'BF', 'LF'];

function findExit(start, maze) {
	const [x, y, d] = start;
	if (maze[y][x] == '#') {
		return '';
	}
	else if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
		return 'F';
	}
	else {
		maze[y][x] = '#';
		for (let index = 0; index < 4; index++) {
			const next = (directions.indexOf(d) + index) % 4;
			const direction = directions[next];
			const move = moves[index];
			const path = forward([x,y,direction],maze);
			
			if(path.length > 0){
				return move + path;
			}
		}
		return '';
	}
}

function forward(start, maze) {
	const [x, y, d] = start;
	switch (d) {
		case left:
			return findExit([x - 1, y, d], maze);
		case right:
			return findExit([x + 1, y, d], maze);
		case up:
			return findExit([x, y - 1, d], maze);
		case down:
			return findExit([x, y + 1, d], maze);
	}
}

function logMaze(maze) {
	console.log('maze:');
	const str = maze.map(a => a.join('')).join('\n');
	console.log(str);
}

let i = 10;
[1,2,3,4].map(n => i + n);
[1,2,3,4].map(n => {
	i++;
	return i + n;
});
[1,2,3].findIndex(n => {
	i++;
	return i == n;
});

basicMazes = [];
basicMazes.push([
	'# #',
	' > ',
	'# #'
]);
basicMazes.push([
	'##########',
	'#>       #',
	'######## #'
]);
basicMazes.push([
	'# ########',
	'#       >#',
	'##########'
]);
basicMazes.push([
	'####### #',
	'#>#   # #',
	'#   #   #',
	'#########'
]);
basicMazes.push([
	'##########',
	'#        #',
	'#  ##### #',
	'#  #   # #',
	'#  #^# # #',
	'#  ### # #',
	'#      # #',
	'######## #'
]);
basicMazes.push([
	"#########################################",
	"#<    #       #     #         # #   #   #",
	"##### # ##### # ### # # ##### # # # ### #",
	"# #   #   #   #   #   # #     #   #   # #",
	"# # # ### # ########### # ####### # # # #",
	"#   #   # # #       #   # #   #   # #   #",
	"####### # # # ##### # ### # # # #########",
	"#   #     # #     # #   #   # # #       #",
	"# # ####### ### ### ##### ### # ####### #",
	"# #             #   #     #   #   #   # #",
	"# ############### ### ##### ##### # # # #",
	"#               #     #   #   #   # #   #",
	"##### ####### # ######### # # # ### #####",
	"#   # #   #   # #         # # # #       #",
	"# # # # # # ### # # ####### # # ### ### #",
	"# # #   # # #     #   #     # #     #   #",
	"# # ##### # # ####### # ##### ####### # #",
	"# #     # # # #   # # #     # #       # #",
	"# ##### ### # ### # # ##### # # ### ### #",
	"#     #     #     #   #     #   #   #    ",
	"#########################################"
]);

// console.log(escape(basicMazes[0]));
// console.log(escape(basicMazes[1]));
// console.log(escape(basicMazes[2]));	
// console.log(escape(basicMazes[3]));
// console.log(escape(basicMazes[4]));
console.log(escape(basicMazes[5]));