function calc(expr) {
    if (expr == '') return 0;
    tokens = expr.split(' ');
    console.log(tokens);
    stack = [];
    ops = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };
    tokens.forEach(token => {
        console.log(stack);
        if ('-+*/'.includes(token)) {
            a = stack.pop();
            b = stack.pop();
            stack.push(ops[token](b, a));
        }
        else {
            stack.push(Number(token));
        }

    });
    return stack[0];
}

console.log(calc("5 1 2 + 4 * + 3 -"));


