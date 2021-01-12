// https://www.codewars.com/kata/525f4206b73515bffb000b21/train/javascript
// https://www.codewars.com/kata/5324945e2ece5e1f32000370/train/javascript

const step = 15;
function sumStrings(a,b) { 
// function add(a, b) {
    if (a.length == 0) return b;
    if (b.length == 0) return a;
    if (a.length <= step && b.length <= step) return (parseInt(a) + parseInt(b)).toString();
    else return addNumbers(parseNumbers(a), parseNumbers(b));
}

function parseNumbers(str) {
    console.log('parseNumbers:', str, str.length);
    const length = str.length;
    nums = [];
    for (let start = length - step, end = length; start >= 0; end = start, start = start > step ? start - step : 0) {
        console.log(start, end);
        nums.push(str.slice(start, end));
        if (start == 0) break;
    }
    console.log(nums);
    return nums;
}

function addNumbers(a, b) {
    let carry = 0;
    result = [];
    for (let i = 0; i < a.length && i < b.length; i++) {
        x = a[i] == undefined ? 0 : parseInt(a[i]);
        y = b[i] == undefined ? 0 : parseInt(b[i]);
        str = (x + y + carry).toString();
        if (str.length > step) {
            str = str.slice(1);
            carry = 1;
        }
        else {
            carry = 0;
        }
        result.push(str);
    }
    if (carry == 1) {
        result.push('1');
    }
    console.log('result:');
    console.log(result);
    return result.reverse().join('');
}

input1 = ["1", "1"];
input3 = ["1372", "69"];
input9 = ['63829983432984289347293874', '90938498237058927340892374089'];

// console.log(add(...input1));
// console.log(add(...input3));
console.log(add(...input9));

// parseNumbers("71257741348840263196482132");