// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6/solutions/javascript
var spiralize = function (size) {
    let left = -2, right = size, top = 0, bottom = size;

    function makeEdge(length, x, y, d) {
        return Array(length).fill(0).map((_, i) => {
            return {
                'x': d == 0 ? x + i : x,
                'y': d == 1 ? y + i : y,
            };
        });
    }
    const positions = [];
    while (true) {
        if (right - left > 2) {
            positions.push(...makeEdge(right - left - 1, left + 1, top, 0));
            left += 2;
        }
        else {
            break;
        }
        if (bottom - top > 1) {
            positions.push(...makeEdge(bottom - top - 1, right - 1, top + 1, 1));
            top += 2;
        }
        else {
            break;
        }
        if (right - left > 2) {
            console.log(left, right, bottom);
            positions.push(...makeEdge(right - left - 1, left, bottom - 1, 0));
            // positions.push(...makeEdge(right - left - 1, left, bottom - 1, 0).reverse());
            right -= 2;
        }
        else {
            break;
        }
        if (bottom - top > 1) {
            positions.push(...makeEdge(bottom - top, left, top, 1));
            // positions.push(...makeEdge(bottom - top, left, top, 1).reverse());
            bottom -= 2;
        }
        else {
            break;
        }
    }

    positions.shift();

    const array = Array(size).fill(0).map(_ => Array(size).fill(0));
    positions.forEach(({ x, y }) => {
        array[y][x] = 1;
    });
    return array;
};

function printSpiral(spiral) {
    str = spiral.map(a => a.map(a => a == 0 ? ' ' : '*').join(' ')).join('\n');
    console.log(str);
}

// printSpiral(spiralize(5));
// printSpiral(spiralize(6));
// printSpiral(spiralize(7));
// printSpiral(spiralize(8));
// printSpiral(spiralize(10));
printSpiral(spiralize(30));
// printSpiral(spiralize(100));
