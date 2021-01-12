// https://www.codewars.com/kata/581bc0629ad9ff9873000316/solutions/javascript
// https://www.codewars.com/kata/reviews/581bd249024b91b476000047/groups/5dcaca062d55c30001186d3b
// https://www.codewars.com/kata/reviews/581bd249024b91b476000047/groups/5a0b2d349f6c6dfdd20036bb
// https://www.codewars.com/kata/reviews/581bd249024b91b476000047/groups/5ea6d2039de752000108bfaa
// https://www.codewars.com/kata/reviews/581bd249024b91b476000047/groups/5e8c7ad42309750001392cac
let tokens: any = [];
let nextToken = "";
let postfix = "";
// export const calculate = (input: string): number => {
export const calculate = (input: string): string => {
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
		const result = calc(ast);
		console.log("result:", result);
		return result.toString();
		// return result;
	} catch (err) {
		console.log(err);
		return err;
	}
};

function calc(ast: any[]): number {
	if (ast instanceof Array) {
		const [op, e1, e2] = ast;
		switch (op) {
			case "+": return calc(e1) + calc(e2);
			case "-": return calc(e1) - calc(e2);
			case "*": return calc(e1) * calc(e2);
			case "$": return calc(e1) / calc(e2);
			default: throwError(); return 0;
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
		.replace(/[+\-*$^()]/g, " $& ")
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
		if ("*$^".includes(nextToken)) {
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
	} else if (!isNaN(Number(nextToken))) {
		const i = nextToken;
		match();
		return i;
	} else if (nextToken == " ") {
		return "";
	} else {
		// throw "unexpected token:" + nextToken;
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

function calculate2(sum:any){
    return /^[0-9\+\-\$\*\.]+$/i.test(sum) 
	//   ? []["sort"]["constructor"]("return " + sum.replace(/\$/g, '/'))()
	  ? [].sort.constructor("return " + sum.replace(/\$/g, '/'))()
	  : '400: Bad request';

	//   []["sort"]["constructor"]('return ' + "1000/2.5/5+5-5+6/6")()
}

// console.log(calculate('1'));
// console.log(calculate('5+5+5+5'));
// console.log(calculate('5-5-5-5'));
// console.log(calculate('5*5*5*5'));
// console.log(calculate('5$5$5$5'));
// console.log(calculate('1+1-1'));
// console.log(calculate('5*6$2+5-10'));
// console.log(calculate('1*1*1*1*1*1$1$1$1$1+1-1+9-1'));
// console.log(calculate("1000$2.5$5+5-5+6$6")); //error
// console.log(calculate2("1000$2.5$5+5-5+6$6")); //error
// console.log(calculate('5*6$2&5-10'));
// console.log(calculate('5/10'));
// console.log(calculate('5k10'));
// console.log(calculate('p'));
// console.log(calculate('9^9'));
// console.log(calculate(' 1.5 '));
// console.log(calculate('1.5'));

// console.log(calculate('44844*7175*66-46+54$58194*57671-4988*1489$27376*787$769+344+952816-69+7397$32+691*38'));
// 44844*7175*66-46+54$58194*57671-4988*1489$27376*787$769+344+952816-69+7397$32+691*38
// console.log(calculate('41433*755626+592573$41825$52-28948$578688-775793-128924+8917$6655$482684+6281$9756$757143-511'));
// 31306946830.222443
// 31306946830.22244
// console.log(calculate(' 2892*533+733523+62571+76$11+8216*5878$43619$663198+124496*1734-25684*6267-972*341-99554*542+69+94*797 '));
// 3037239.910760343
// 3037239.91076035
// console.log(calculate(' 94331$892*357419$1385*56857$79864+19229-8354+75865-6128-92$412518*7459+62+1671$42375+798741-6499$12749-75718$24+18343 '));
// 914029.9441455778
// 914029.9441455777
console.log(calculate(' 54*273446*85325*961414-6179*31*82$75*755335*796597+74+28*78+541-4751$1264 '));
// 1085289327929289200
// 1085289327929289300