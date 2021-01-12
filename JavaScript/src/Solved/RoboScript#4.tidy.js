// https://www.codewars.com/kata/594b898169c1d644f900002e/solutions/javascript
function execute(code) {
    const instructions = parse(code);
    console.log(instructions);
    return makeResult(makePaths(instructions)).map(e => e.join('')).join('\r\n');


    function makePaths(instructions) {
        let direction = 0;
        let lastPos = [0, 0];
        let paths = [lastPos];
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
        const { left, right, up, down } = paths.reduce((a, [x, y]) => {
            a.left = Math.min(a.left, x);
            a.right = Math.max(a.right - 1, x) + 1;
            a.up = Math.min(a.up, y);
            a.down = Math.max(a.down - 1, y) + 1;
            return a;
        }, { left: 0, right: 0, up: 0, down: 0 });
        const width = right - left;
        const height = down - up;
        const offsetX = 0 - left;
        const offsetY = 0 - up;

        const array = Array(height).fill(0).map(_ => Array(width).fill(' '));
        paths.map(([x, y]) => [x + offsetX, y + offsetY]).forEach(([x, y]) => {
            array[y][x] = '*';
        });
        return array;
    }

    function parse(code) {
        const env = new Map();
        code = handlePatterns(code);
        if (code.length == 0) return '';
        let tokens = tokenizer(code);
        let tokenIndex = 0;
        let nextToken = tokens[tokenIndex];
        return expr();

        function handlePatterns(code) {
            const patternRegex = /p(\d*)(.*?)q/g;
            let match;
            while ((match = patternRegex.exec(code)) !== null) {
                const [_, name, content] = match;
                if (env.has(name)) {
                    throw `duplicate pattern: p${name}`;
                }
                env.set(name, content);
            }
            code = code.replace(patternRegex, '');
            return replacePatternsRecursive(code, new Set());

            function replacePatternsRecursive(str, topPatterns) {
                return str.replace(/P(\d+)/g, (match, p) => {
                    if (topPatterns.has(p)) {
                        throw `infinite recursion: '${p}'`;
                    }
                    const content = env.get(p);
                    const set = new Set(topPatterns);
                    set.add(p);
                    return replacePatternsRecursive(content, set);
                });
            }
        }

        function tokenizer(code) {
            const tokens = [];
            let temp = "";
            for (let index = 0; index < code.length; index++) {
                const char = code[index];
                if (/[0-9]/.test(char)) {
                    temp += char;
                }
                else {
                    if (temp.length > 0) {
                        tokens.push(Number(temp));
                        temp = "";
                    }
                    tokens.push(char);
                }
            }
            if (temp.length > 0) {
                tokens.push(Number(temp));
            }
            return tokens;
        }

        function match(t) {
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
            while (nextToken != ')' && nextToken != '$' && nextToken != 'q') {
                e += term();
            }
            return e;
        }

        function term() {
            const f = factor();
            if (typeof nextToken == 'number') {
                let t = f.repeat(nextToken);
                match();
                return t;
            }
            else {
                return f;
            }
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
                case '(': return paren();
                default:
                    throw `unexpected: ${nextToken}`;
            }
        }

        function paren() {
            match();
            const e = expr();
            if (match(")")) {
                return e;
            }
            else {
                throw "')' expected!";
            }
        }
    }
}

function testPrint(...args) {
    console.log(...args);
}

// testPrint(1,2,3);


input1 = "FFFFFLFFFFFLFFFFFLFFFFFL";
input2 = "LFFFFFRFFFRFFFRFFFFFFF";
input3 = "LF5RF3RF3RF7";

// input4 = "F4L((F4R)2(F4L)2)2(F4R)2F4";

input4 = "LF5(RF3)(RF3R)F7";
input5 = "(L(F5(RF3))(((R(F3R)F7))))";
input6 = "F4L(F4RF4RF4LF4L)2F4RF4RF4";
input7 = "F4L((F4R)2(F4L)2)2(F4R)2F4";
input8 = "F4L((F4R)22(F412L)2)250(F4R)2F4";

stmt1 = '(F2LF2R)2FRF4L(F2LF2R)2(FRFL)4(F2LF2R)2';
stmt2 = 'p0(F2LF2R)2q';
stmt3 = 'p312(F2LF2R)2q';
stmt4 = 'p0(F2LF2R)2qP0';
stmt5 = 'p312(F2LF2R)2qP312';
stmt6 = 'P0p0(F2LF2R)2q';
stmt7 = 'P312p312(F2LF2R)2q';
stmt8 = 'F3P0Lp0(F2LF2R)2qF2';
stmt9 = '(P0)2p0F2LF2RqP0';
stmt10 = 'p0(F2LF2R)2qP1';
stmt11 = 'P0p312(F2LF2R)2q';
stmt12 = 'P312';
stmt13 = 'P1P2p1F2Lqp2F2RqP2P1';
stmt14 = 'p1F2Lqp2F2Rqp3P1(P2)2P1q(P3)3';
stmt15 = 'p1F2Lqp1(F3LF4R)5qp2F2Rqp3P1(P2)2P1q(P3)3';
// stmt15_ = 'p10F2Lqp1(F3LF4R)5qp2F2Rqp3P1(P2)2P1q(P3)3PP';
stmt15_ = 'p10F2Lqp1(F3LF4R)5qp2F2Rqp3P1(P2)2P1q(P3)3';
stmt16 = 'p1F2RP1F2LqP1';
stmt17 = 'p1F2LP2qp2F2RP1qP1';

// console.log(execute(input1));
// console.log(execute(input2));
// console.log(execute(input3));
// console.log(parse(input4));
// console.log(parse(input7));

// console.log(execute(input4));
// console.log(execute(input5));
// console.log(execute(input6));
// console.log(execute(input7));
// console.log(execute(input8));

console.log(execute(stmt1));
// execute(stmt1);
// console.log(execute(stmt2));
// console.log(execute(stmt4));
// console.log(execute(stmt15));
// console.log(execute(stmt15_));

// console.log(tokenizer(input8));
// console.log(tokenizer(stmt7));

// execute("p1F2RP1F2LqP1");      // throws
// execute("p1F2LP2qp2F2RP1qP1"); // throws
// testPrint(execute("p1F2RP1F2Lq"));        // does not throw