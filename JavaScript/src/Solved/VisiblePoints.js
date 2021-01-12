// https://www.codewars.com/kata/58a6b5f28c08b1e9c40001e7/train/javascript
// https://www.codewars.com/kata/58a6b5f28c08b1e9c40001e7/solutions/javascript

/*
function visiblePoints(points) {
    
    rads = points.map(([x, y]) => Math.atan2(y, x));
    // rads = points.map(([x, y]) => Math.atan2(y, x)).sort();
    counts = rads.map(rad => {
        return rads.filter(r =>  {
            return (rad - r + Math.PI * 2) % (Math.PI * 2) <= (Math.PI / 4);
        }).length;
    });
    return counts.reduce((c1, c2) => Math.max(c1,c2));
}
*/
/*
function visiblePoints(points) {
    // console.log(points);
    rads = points.map(([x, y]) => Math.atan2(y, x)).sort((a, b) => b - a);
    // console.log(rads);
        
    return rads.reduce((max, rad, i, rads) => {

        for (count = 1; i + count < rads.length && inScope(rad, rads[i + count]); ++count);
        for (count2 = 0; count2 < i && inScope(rad, rads[count2]); ++count2);
        // const newRads = cycleArray(rads, i);
        // console.log('i:',i);
        // console.log('rads:', rads);
        // console.log('newRads:', newRads);

        // for (count = 1; count < newRads.length && inScope(rad, newRads[count]); ++count);

        // for (let count2 = 1; i + count2 < rads.length && inScope(rad, rads[i + count2]); ++count2);
        // console.log('count:', rad, count);
        return Math.max(max, count + count2);
        // return Math.max(max, count);
    }, 0);

    function cycleArray(array, i) {
        return [...array.slice(i), ...array.slice(0, i)];
    }

    function inScope(r1, r2) {
        let difference = r1 - r2;
        difference = difference >= 0 ? difference : difference + Math.PI * 2;
        // console.log("difference:", difference);
        
        // return difference <= Math.PI / 4;
        modifier = 0.0000000000000009;
        // modifier = 0.1220020200222229;
        return difference <= Math.PI / 4 + modifier;
        // return Math.PI - difference / 4 >= modifier;
        // return difference - Math.PI / 4 > modifier;
    }
}
/*/
function visiblePoints(points) {
    return points
        .map(([x, y]) => Math.atan2(y, x))
        .sort((a, b) => b - a)
        .reduce((max, rad, i, rads) => {
            for (count = 1; i + count < rads.length && inScope(rad, rads[i + count]); ++count);
            for (count2 = 0; count2 < i && inScope(rad, rads[count2]); ++count2);
            return Math.max(max, count + count2);
            // for (count = 1; compare(rad, rads, i, count); ++count);
            // return Math.max(max, count);
        }, 0);

    function compare(rad, rads, i, count) {
        let index = i + count;
        if (index >= rads.length) {
            index -= rads.length;
            return index < i ? inScope(rad, rads[index]) : false;
        }
        else {
            return inScope(rad, rads[index]);
        }
    }

    function inScope(r1, r2) {
        let difference = r1 - r2;
        difference = difference >= 0 ? difference : difference + Math.PI * 2;
        modifier = 0.0000000000000009;
        return difference <= Math.PI / 4 + modifier;
    }
}
//*/

// Math.PI/4 : 0.7853981633974483

points0 = [[5, 4]];
points1 = [[1, 1], [3, 1], [3, 2], [3, 3], [1, 3], [2, 5], [1, 5], [-1, -1], [-1, -2], [-2, -3], [-4, -4]];
points2 = [[27, -88], [76, 56], [-82, 62], [-5, 48], [-85, 60], [-86, 6], [-100, -54], [-22, 30], [58, 47], [12, 80]];
points3 = [[3, 3], [-4, 4], [-2, -2], [1, -1]];
points4 = [[1, -9], [-1, -9]];
points5 = [[3, 3], [-4, 4], [-2, -2], [1, -1], [10, -10]];

// Expected: 33, instead got: 31
points6 = [[-840, -712], [-840, -641], [-840, -610], [-840, -579], [-840, -561], [-840, -469], [-840, -438], [-840, -388], [-840, -363], [-840, -340], [-840, -316], [-840, -262], [-840, -171], [-840, -137], [-840, -64], [-840, 31], [-840, 94], [-840, 109], [-840, 114], [-840, 171], [-840, 268], [-840, 320], [-840, 340], [-840, 425], [-840, 432], [-840, 466], [-840, 506], [-840, 533], [-840, 624], [-840, 648], [-840, 677], [-840, 767], [-840, 784], [-840, 831], [-840, 924], [-840, 979], [-839, -980], [-839, -890], [-839, -844], [-839, -805], [-839, -755], [-839, -678], [-839, -632], [-839, -573], [-839, -526], [-839, -506], [-839, -432], [-839, -333], [-839, -281], [-839, -207], [-839, -206], [-839, -181], [-839, -84], [-839, 13], [-839, 23], [-839, 49], [-839, 60], [-839, 105], [-839, 142]];
// Expected: 22, instead got: 21
points7 = [[-871, 948], [-871, 977], [-870, -927], [-870, -828], [-870, -780], [-870, -773], [-870, -757], [-870, -685], [-870, -647], [-870, -597], [-870, -595], [-870, -522], [-870, -495], [-870, -422], [-870, -358], [-870, -329], [-870, -314], [-870, -228], [-870, -194], [-870, -154], [-870, -152], [-870, -151], [-870, -113], [-870, -24], [-870, 54], [-870, 56], [-870, 58], [-870, 91], [-870, 95], [-870, 125]];

// Expected: 8, instead got: 4
points8 = [[-826, -201], [-826, -178], [-826, -86], [-826, -53], [-826, 27], [-826, 105], [-826, 176], [-826, 238]];

// Expected: 15, instead got: 13
points9 = [[-819, -20], [-819, -8], [-819, 48], [-819, 141], [-819, 240], [-819, 257], [-819, 258], [-819, 306], [-819, 402], [-819, 434], [-819, 483], [-819, 508], [-819, 583], [-819, 669], [-819, 671]];

// console.log(visiblePoints(points0));
// console.log(visiblePoints(points1));
// console.log(visiblePoints(points2));
// console.log(visiblePoints(points3));
// console.log(visiblePoints(points4));
console.log(visiblePoints(points5));
// console.log(visiblePoints(points6));
// console.log(visiblePoints(points7));
console.log(visiblePoints(points8));

sorts =
    [1.1902899496825317,
        0.7853981633974483,
        1.373400766945016,
        0.7853981633974483,
        1.2490457723982544,
        0.5880026035475675,
        0.3217505543966422,
        -2.0344439357957027,
        -2.1587989303424644,
        -2.356194490192345,
        -2.356194490192345];

sorts = sorts.sort((a, b) => a < b);
// console.log(sorts);
sorts = sorts.sort((a, b) => a < b);
// console.log(sorts);
sorts = sorts.sort((a, b) => {
    // console.log(typeof(a));
    // console.log(typeof(b));
    // return a < b;
    // return a - b;
    return b - a;
});
// -2.356194490192345 ].sort((a,b) => a>b)
// console.log(sorts);



function testArray() {
    a = [1, 3, 2];
    modifyArray(a);
    console.log(a);
}

function modifyArray(a) {
    a[2] = 10;
    console.log(a);
}
testArray();