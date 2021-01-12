// https://www.codewars.com/kata/5870fa11aa0428da750000da/solutions/javascript
function execute(code) {
    if (code == "") return "*";
    // let instructions = code.match(/([FRL]+[0-9]*|[()]+)/g).map(str => {
    let instructions = code.match(/(F+\d*|R+\d*|L+\d*|[()]+)/g).map(str => {
        switch (true) {
            case str.startsWith('F'): return parseInstruction('F', str);
            case str.startsWith('L'): return parseInstruction('L', str);
            case str.startsWith('R'): return parseInstruction('R', str);
            default: return [str, 0];
        }
    });

    return makeResult(makePaths(instructions)).map(e => e.join('')).join('\r\n');
}

function parseInstruction(char, input) {
    match = input.match(RegExp(`(${char}+|[0-9]*)`, "g"));
    value = parseInt(match[1]);
    // console.log(match);
    length = match[0].length + (isNaN(value) ? 0 : value - 1);
    return [char, length];
}

function makePaths(instructions) {
    let direction = 0;
    let paths = [[0, 0]];
    console.log(`initState: ${instructions}`);
    instructions.forEach(e => {
        [instruction, n] = e;
        // console.log(direction);
        switch (instruction) {
            case 'L':
                direction = rotateLeft(direction, n);
                break;
            case 'R':
                direction = rotateRight(direction, n);
                break;
            case 'F':
                forward(n);
                break;
            default:
                break;
        }
    });
    return paths;

    function rotateLeft(direction, n) {
        return (direction + 4 - (n % 4)) % 4;
    }

    function rotateRight(direction, n) {
        return (direction + n) % 4;
    }

    function forward(n) {
        const [x, y] = paths[paths.length - 1];
        console.log(x, y);
        const callbacks = [
            (_, i) => [x + i + 1, y],
            (_, i) => [x, y + i + 1],
            (_, i) => [x - i - 1, y],
            (_, i) => [x, y - i - 1]];
        paths.push(...Array(n).fill(0).map(callbacks[direction]));
    }
}

function makeResult(paths) {
    const measure = paths.reduce((a, [x, y]) => {
        a.leftMost = Math.min(a.leftMost, x);
        a.rightMost = Math.max(a.rightMost - 1, x) + 1;
        a.upMost = Math.min(a.upMost, y);
        a.downMost = Math.max(a.downMost - 1, y) + 1;
        return a;
    }, { leftMost: 0, rightMost: 0, upMost: 0, downMost: 0 });
    const width = measure.rightMost - measure.leftMost;
    const height = measure.downMost - measure.upMost;
    const offsetX = 0 - measure.leftMost;
    const offsetY = 0 - measure.upMost;

    console.log(width, height, offsetX, offsetY);
    const array = Array(height).fill(0).map(_ => Array(width).fill(' '));
    paths.map(([x, y]) => [x + offsetX, y + offsetY]).forEach(([x, y]) => {
        array[y][x] = '*';
    });
    return array;
}

input1 = "FFFFFLFFFFFLFFFFFLFFFFFL";
input2 = "LFFFFFRFFFRFFFRFFFFFFF";
input3 = "LF5RF3RF3RF7";

console.log(execute(input1));
console.log(execute(input2));
console.log(execute(input3));
