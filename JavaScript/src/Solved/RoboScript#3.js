// https://www.codewars.com/kata/58738d518ec3b4bf95000192/solutions/javascript
function execute(code) {
    const instructions = parse(code);
    return makeResult(makePaths(instructions)).map(e => e.join('')).join('\r\n');

    function makePaths(instructions) {
        let direction = 0;
        let lastPos = [0, 0];
        let paths = [lastPos];
        console.log(`initState: ${instructions}`);
        for (let index = 0; index < instructions.length; index++) {
            const instruction = instructions[index];

            switch (instruction) {
                case 'L':
                    direction = (direction + 3) % 4;
                    break;
                case 'R':
                    direction = (direction + 1) % 4;
                    break;
                case 'F':
                    forward();
                    break;
                default:
                    break;
            }
        }
        return paths;

        function forward() {
            const [x, y] = lastPos;
            const nextPos = [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]];
            lastPos = nextPos[direction];
            paths.push(lastPos);
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

    function parse(code) {
        let tokens = code;
        let tokenIndex = 0;
        let nextToken = code[tokenIndex];
        return expr();

        function match(t) {
            console.log('match:', t ? t : nextToken);

            switch (t) {
                case undefined:
                case nextToken:
                    tokenIndex++;
                    nextToken = tokenIndex < tokens.length ? tokens[tokenIndex] : '$';
                    return true;
                default:
                    return false;
            }
        }

        function expr() {
            let e = "";
            while (nextToken != ')' && nextToken != '$') {
                e += term();
            }
            return e;
        }

        function term() {
            const f = factor();
            let n = "";
            console.log('term:', { nextToken });

            while (/[0-9]/.test(nextToken)) {
                console.log('term:', { nextToken });
                n += nextToken;
                match();
            }
            console.log('term:', { nextToken });
            console.log({ n });

            if (n.length > 0) {
                let t = f.repeat(parseInt(n));
                return t;
            }
            else {
                return f;
            }

            function factor() {
                switch (nextToken) {
                    case 'F':
                    case 'L':
                    case 'R': {
                        const token = nextToken;
                        match();
                        return token;
                    }
                    case '(': {
                        match();
                        const e = expr();
                        if (match(")")) {
                            return e;
                        }
                        else {
                            throw "')' expected!";
                        }
                    }
                    case '$':
                        return '';
                    default:
                        throw `unexpected: ${nextToken}`;
                }
            }
        }
    }
}

input1 = "FFFFFLFFFFFLFFFFFLFFFFFL";
input2 = "LFFFFFRFFFRFFFRFFFFFFF";
input3 = "LF5RF3RF3RF7";

// input4 = "F4L((F4R)2(F4L)2)2(F4R)2F4";

input4 = "LF5(RF3)(RF3R)F7";
input5 = "(L(F5(RF3))(((R(F3R)F7))))";
input6 = "F4L(F4RF4RF4LF4L)2F4RF4RF4";
input7 = "F4L((F4R)2(F4L)2)2(F4R)2F4";
input8 = "F4L((F4R)22(F412L)2)250(F4R)2F4";

// console.log(execute(input1));
// console.log(execute(input2));
// console.log(execute(input3));
// console.log(parse(input4));
// console.log(parse(input7));

// console.log(execute(input4));
// console.log(execute(input5));
console.log(execute(input6));
// console.log(execute(input7));
// console.log(execute(input8));
