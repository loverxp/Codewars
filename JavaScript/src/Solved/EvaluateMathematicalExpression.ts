// https://www.codewars.com/kata/52a78825cdfc2cfc87000005/solutions/javascript
// https://www.codewars.com/kata/52a78825cdfc2cfc87000005/solutions/typescript
let tokens: any = [];
let nextToken = "";
let postfix = "";
export const calc = (input: string): number => {
	// export const calculate = (input: string): string => {
	console.log("input:", input);

	try {
		if (input.length == 0) {
			throwError();
		}
		tokens = tokenizer(input);
		console.log("tokens:", tokens.length, tokens);
		nextToken = tokens[0];
		postfix = "";
		let ast = expr();
		// console.log(flatArray(ast));
		// console.log(postfix);
		// return postfix;
		const result = doCalc(ast);
		console.log("result:", result);
		// return result.toString();
		return result;
	} catch (err) {
		console.log(err);
		return 0;
	}
};

function doCalc(ast: any[]): number {
	if (ast instanceof Array) {
		// if ("-" == ast[0]) {
		if (ast.length == 2) {
			return 0 - doCalc(ast[1]);
		} else {
			const [op, e1, e2] = ast;
			switch (op) {
				case "+":
					return doCalc(e1) + doCalc(e2);
				case "-":
					return doCalc(e1) - doCalc(e2);
				case "*":
					return doCalc(e1) * doCalc(e2);
				case "/":
					return doCalc(e1) / doCalc(e2);
				default:
					throwError();
					return 0;
			}
		}
	} else {
		return parseFloat(ast);
		// return parseInt(ast);
	}
}

function throwError() {
	throw "400: Bad request";
}

function tokenizer(input: string) {
	let tokens = input
		.replace(/ +/g, "")
		.replace(/[-+*/^()]/g, " $& ")
		.replace(/ +/g, " ")
		.trim()
		.split(" ");
	return tokens;
}

function match(t?: string) {
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

function expr(): any {
	return combineExpr(term());

	function combineExpr(t1: any): any[] | undefined {
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

	function combineTerm(f1: any): any[] | undefined {
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

function factor(): any {
	// console.log("factor:", nextToken);

	if (nextToken == "(") {
		match();
		const e = expr();
		if (match(")")) {
			return e;
		} else {
			// throw "')' expected!";
			throwError();
		}
	} else if (nextToken == "-") {
		match();
		return [nextToken, factor()];
	} else if (!isNaN(Number(nextToken))) {
		const i = nextToken;
		match();
		return i;
	} else if (nextToken == " ") {
		return "";
	} else {
		throwError();
	}
}

function flatArray(array: any): string {
	if (array instanceof Array) {
		return (
			"[" +
			array
				.reduce((a: string, b: string) => a + ", " + flatArray(b), "")
				.slice(1) +
			"]"
		);
	} else {
		return array;
	}
}

// calculate('(-10)');

// console.log(tokenizer("1 - 1"));
// console.log(tokenizer("1 - -1"));
// console.log(calculate("1 - -1"));
// console.log(tokenizer('1+1'));
// console.log(calc('1+1'));

// console.log(calc('-123'));
// console.log(calc('2 / (2 + 3) * 4.33 - -6'));
// console.log(tokenizer("12* 123/-(-5 + 2)"));
console.log(calc('12* 123/-(-5 + 2)'));

// console.log(calc(''))
