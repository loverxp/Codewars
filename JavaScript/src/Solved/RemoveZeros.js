// https://www.codewars.com/kata/52aae14aa7fd03d57400058f/train/javascript
// function removeZeros(array) {
// }

function removeZeros(array) {
    let length = array.length;
    console.log(array);
    let i = 0;
    while(i < length){
        const e = array[i];
        if (e === 0 || e === '0') {
            console.log(array);
            for (let j = i; j < array.length - 1; j++) {
                array[j] = array[j + 1];
            }
            array[array.length - 1] = e;
            length--;
        }
        else i++; 
    }
    return array;
}

// console.log(removeZeros([7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]));
console.log(removeZeros([7, 2, 3, 0, 4, 6, '0', 0, 13, 0, 78, 0, 0, 19, 14]));
