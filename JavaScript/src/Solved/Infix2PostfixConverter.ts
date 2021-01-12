// https://www.codewars.com/kata/52e864d1ffb6ac25db00017f/solutions/javascript
let tokens: any = [];
let nextToken = "";
let postfix = "";

export function toPostfix(infix: string) {
	console.log(infix);

	try {
		if (infix.length == 0) {
			return "";
		}
		tokens = tokenizer(infix);
		// console.log(tokens);
		nextToken = tokens[0];
		postfix = "";
		let ast = expr();
		// console.log(flatArray(ast));
		// console.log(postfix);
		// return postfix;
		const result = convert(ast);
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
}

function convert(ast: any[]): string {
	if (ast instanceof Array) {
		const [op, e1, e2] = ast;
		return convert(e1) + convert(e2) + op;
	} else {
		return ast;
	}
}

function tokenizer(input: string) {
	let tokens = input
		.replace(/[+\-*/^()]/g, " $& ")
		.replace(/ +/g, " ")
		.replace(/^ */, "")
		.replace(/ *$/, "")
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
}

function combineExpr(t1: any): any[] | undefined {
	if ("+-".includes(nextToken)) {
		const op = nextToken;
		match();
		const t2 = term();
		writeToPostfix(op);
		return combineExpr([op, t1, t2]);
	} else {
		return t1;
	}
}

function term() {
	return combineTerm(factor());
}

function combineTerm(f1: any): any[] | undefined {
	if ("*/^".includes(nextToken)) {
		const op = nextToken;
		match();
		const f2 = factor();
		writeToPostfix(op);
		return combineTerm([op, f1, f2]);
	} else {
		return f1;
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
		writeToPostfix(i);
		return i;
	} else if(nextToken == ' '){
		return '';
	} else {
		throw "unexpected token:" + nextToken;
	}
}

function writeToPostfix(v: any) {
	postfix += v;
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

// toPostfix("");
// toPostfix("2+7+5"); //[ '2', '+', '7', '*', '5' ]
// toPostfix("2+7*5"); //[ '2', '+', '7', '*', '5' ]
toPostfix(" 3 *3/(7 +1) "); //[ '3', '*', '3', '/', '(', '7', '+', '1', ')' ]
// toPostfix("(3)*3/(7+1)"); //[ '3', '*', '3', '/', '(', '7', '+', '1', ')' ]
// toPostfix("(3*3)/(7+1)"); //[ '3', '*', '3', '/', '(', '7', '+', '1', ')' ]
// toPostfix("(3+3)/(7+1)"); //[ '3', '*', '3', '/', '(', '7', '+', '1', ')' ]
toPostfix("5+(6-2)*9+3^(7-1)"); //[ '5', '+', '(', '6', '-', '2', ')', '*', '9', '+', '3', '^', '(', '7', '-', '1', ')' ]

toPostfix("2^8*(2+3)/4");
// toPostfix("2^8*3/4");
// toPostfix("2*8*3/4");
// toPostfix("1*2*3*4");
// toPostfix("1+2+3+4");
// toPostfix("1+2+3+4+5+6+7");
// toPostfix("1*2*3*4*5*6*7");
// toPostfix("2/8*3/4");
// toPostfix("(2+1)/8*3/4");
// toPostfix("(2*1)/8*3/4");
// toPostfix("(2*1)*3/4");   //ok
// toPostfix("2^8/4");    //ok
// toPostfix("8*3/4");    //ok
// toPostfix("(2^8*(2+3))/4"); //ok
// toPostfix("(2^8*(2+3))-4");
// toPostfix("9^1*(9+1)/7");
// toPostfix("8^6*(8+5)/2");
