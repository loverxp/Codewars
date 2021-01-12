// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/solutions/javascript
snail = function (array) {
    if (array.length == 0 || array[0].length == 0) return [];
    let result = [];
    while (array.length > 0) {
        result.push(...array.shift());
        result.push(...array.map(a => a.pop()));
        if (array.length > 0) result.push(...array.pop().reverse());
        // array.length > 0 ? result.push(...array.pop().reverse()) : result;
        result.push(...array.map(a => a.shift()).reverse());
    }
    return result;
};


array1 = [[1, 2, 3], [8, 9, 4], [7, 6, 5]];
array2 = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];

console.log(snail(array1));
console.log(snail(array2));