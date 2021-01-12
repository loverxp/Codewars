// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/train/javascript
// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/solutions/javascript
const intMap: any = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,

    "eleven": 11,
    "twelve": 12,
    "thirteen": 13,
    "fourteen": 14,
    "fifteen": 15,
    "sixteen": 16,
    "seventeen": 17,
    "eighteen": 18,
    "nineteen": 19,

    "twenty": 20,
    "thirty": 30,
    "forty": 40,
    "fifty": 50,
    "sixty": 60,
    "seventy": 70,
    "eighty": 80,
    "ninety": 90,
}

const thousand = "thousand";
const hundred = "hundred";

function parseThousand(str: string) {
    console.log(`parseThousand: ${str}`);
    str = trim(str)
    return parseRest(str) * 1000;
}

function parseRest(str: string) {
    console.log(`parseRest: ${str}`);
    str = trim(str)
    str = str.replace(/^ | $/g, "");
    if (str.includes(hundred)) {
        const array = str.split(' ' + hundred);
        if (array[1].length > 0) {
            return parseHundred(array[0]) + parseOther(array[1]);
        }
        else {
            return parseHundred(array[0]);
        }
    }
    else {
        return parseOther(str);
    }
}

function parseHundred(str: string) {
    console.log(`parseHundred: ${str}`);
    str = trim(str)
    return parseOther(str) * 100;
}

function parseOther(str: string) {
    console.log(`parseOther: ${str}`);
    str = trim(str)
    return str.split('-').reduce((a, b) => a + intMap[b], 0);
}

export function parseInt(str: string) {
    str = trim(str)
    if(str == "one million"){
        return 1000000;
    }
    else if (str.includes(thousand)) {
        const array = str.split(' ' + thousand);
        if (array[1].length > 0) {
            return parseThousand(array[0]) + parseRest(array[1]);
        }
        else {
            return parseThousand(array[0]);
        }
    }
    else {
        return parseRest(str);
    }
}

function trim(str:string) {
    return str
        .replace(/ and /g, " ")
        .replace(/ +/g, " ")
        .replace(/^ | $/g, "");
}
