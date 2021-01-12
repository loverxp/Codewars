// https://www.codewars.com/kata/51c8e37cee245da6b40000bd/solutions/javascript
function solution(input, markers) {
    return input.split("\n").map(s => s.replace(new RegExp(` *(${markers.join("|").replace('$', '\\$')}).*`), "")).join("\n");
}

function print(s) {
    console.log(s);
}

print(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]));
print(solution("Q @b\nu\ne -e f g", ["@", "-"]));