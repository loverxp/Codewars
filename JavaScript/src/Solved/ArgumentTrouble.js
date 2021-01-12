// https://www.codewars.com/kata/59dbf97627ee00720f0000ee/solutions/javascript
function sum() {
    const args = Array.prototype.slice.call(arguments); 
    if (args.length == 2) {
        return args[0] + args[1];
    }
    else if (args.length == 1){
        return function(x) {
            return args[0] + x;
        }
    }
}

console.log(sum(2,3));
console.log(sum(2)(3));

