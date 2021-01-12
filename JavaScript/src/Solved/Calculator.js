// https://www.codewars.com/kata/5235c913397cbf2508000048/solutions/javascript
let tokens = [];
let nextToken = "";
// let postfix = "";

// export const Calculator = function (this: any) {
const Calculator = function () {
	this.evaluate = (input) => {
		console.log(input);

		try {
			if (input.length == 0) {
				return "";
			}
			tokens = tokenizer(input);
			console.log(tokens);
			nextToken = tokens[0];
			// postfix = "";
			let ast = expr();
			console.log(flatArray(ast));
			// console.log(postfix);
			// return postfix;
			const result = caculate(ast);
			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
		}
	};
};

// function caculate(ast: any[]): number {
function caculate(ast) {
	if (ast instanceof Array) {
		const [op, e1, e2] = ast;
		switch (op) {
			case "+":
				return caculate(e1) + caculate(e2);
			case "-":
				return caculate(e1) - caculate(e2);
			case "*":
				return caculate(e1) * caculate(e2);
			case "/":
				return caculate(e1) / caculate(e2);
			default:
				console.log("unsupported operator");
				return 0;
		}
	} else {
		return parseInt(ast);
	}
}

function tokenizer(input) {
	let tokens = input
		.replace(/[+\-*/^()]/g, " $& ")
		.replace(/ +/g, " ")
		.replace(/^ */, "")
		.replace(/ *$/, "")
		.split(" ");
	return tokens;
}

function match(t) {
	switch (t) {
		case undefined:
		case nextToken:
			tokens.shift();
			nextToken = tokens.length > 0 ? tokens[0] : "#";
			return true;
		default:
			return false;
	}
}

function expr() {
	return combineExpr(term());

	function combineExpr(t1) {
		if ("+-".includes(nextToken)) {
			const op = nextToken;
			match();
			const t2 = term();
			return combineExpr([op, t1, t2]);
		} else {
			return t1;
		}
	}
}

function term() {
	return combineTerm(factor());

	function combineTerm(f1) {
		if ("*/^".includes(nextToken)) {
			const op = nextToken;
			match();
			const f2 = factor();
			return combineTerm([op, f1, f2]);
		} else {
			return f1;
		}
	}
}

function factor() {
	if (nextToken == "(") {
		match();
		const e = expr();
		if (match(")")) {
			return e;
		} else {
			throw "')' expected!";
		}
	} else if (!isNaN(Number(nextToken))) {
		const i = nextToken;
		match();
		return i;
	} else if (nextToken == " ") {
		return "";
	} else {
		throw "unexpected token:" + nextToken;
	}
}

function flatArray(array) {
	if (array instanceof Array) {
		return (
			"[" +
			array
				.reduce((a, b) => a + ", " + flatArray(b), "")
				.slice(1) +
			"]"
		);
	} else {
		return array;
	}
}

var calculate = new Calculator();
console.log(calculate.evaluate('127'));
// console.log(calculate.evaluate('2 + 3'));
// console.log(calculate.evaluate('2 - 3 - 4'));
console.log(calculate.evaluate('10 * 5 / 2'));