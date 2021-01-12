// https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa/solutions/javascript
function isMerge(s, part1, part2) {
    console.log("isMerge");
    console.log({ s });
    console.log({ part1 });
    console.log({ part2 });
    console.log();

    if (s.length == 0) {
        return s1.length == 0 && s2.length == 0;
        // if (part1.length == 0 && part2.length == 0) return true;
        else return false;
    }
    else {
        switch (true) {
            case part1.length == 0: return s == part2;
            case part2.length == 0: return s == part1;
            case s == part1 + part2: return true;
            case s == part2 + part1: return true;
            case s[0] == part1[0] && s[0] == part2[0]: {
                return isMerge(s.slice(1), part1.slice(1), part2) || isMerge(s.slice(1), part1, part2.slice(1));
            }
            case s[0] == part1[0]: return isMerge(s.slice(1), part1.slice(1), part2);
            case s[0] == part2[0]: return isMerge(s.slice(1), part1, part2.slice(1));
            default: return false;
        }
    }
}

// console.log(isMerge('', '', ''));
console.log(isMerge('', 'a', ''));
// console.log(isMerge('', '', 'b'));
// console.log(isMerge('codewars', 'code', 'wars'));
// console.log(isMerge('codewars', 'wars', 'code'));
// console.log(isMerge('codewars', 'cdw', 'oears'));
// console.log(isMerge('codewars', 'cod', 'wars'));
// console.log(isMerge("Bananas from Bahamas", "Bahas", "Bananas from am"));
