//  https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa
/*
isMerge :: String -> String -> String -> Bool
isMerge "" "" "" = True
isMerge a "" c =  a == c
isMerge a b "" =  a == b
isMerge a@(x:xs) b@(y:ys) c@(z:zs) 
    | a == b ++ c = True
    | a == c ++ b = True
    | and [x == y, x == z] = or [mergeLeft , mergeRight]
    | x == y = mergeLeft
    | x == z = mergeRight
    | otherwise = False
    where 
        mergeLeft  = isMerge xs ys c
        mergeRight = isMerge xs b zs
isMerge _ _ _ = False
*/

function isMerge(s, part1, part2) {
    console.log("isMerge");
    console.log({ s });
    console.log({ part1 });
    console.log({ part2 });
    console.log();

    if (s.length == 0) {
        return part1.length == 0 && part2.length == 0;
        // if (part1.length == 0 && part2.length == 0) return true;
        // else return false;
    }
    else {
        isMergeLeft = function () {
            console.log("isMergeLeft");
            // console.log({ s });
            // console.log({ part1 });
            // console.log({ part2 });
            // console.log();

            return isMerge(s.slice(1), part1.slice(1), part2);
        };

        isMergeRight = function () {
            console.log("isMergeRight");
            // console.log({ s });
            // console.log({ part1 });
            // console.log({ part2 });
            // console.log();

            return isMerge(s.slice(1), part1, part2.slice(1));
        };

        switch (true) {
            case part1.length == 0: return s == part2;
            case part2.length == 0: return s == part1;
            case s == part1 + part2: return true;
            case s == part2 + part1: return true;
            case s[0] == part1[0] && s[0] == part2[0]: {
                // return isMergeLeft() || isMergeRight();
                return isMerge(s.slice(1), part1.slice(1), part2) || isMerge(s.slice(1), part1, part2.slice(1));
            }
            // case s[0] == part1[0]: return isMergeLeft();
            // case s[0] == part2[0]: return isMergeRight();
            case s[0] == part1[0]: return isMerge(s.slice(1), part1.slice(1), part2);
            case s[0] == part2[0]: return isMerge(s.slice(1), part1, part2.slice(1));
            default: return false;
        }
    }
}

// console.log(isMerge('', '', ''));
// console.log(isMerge('', 'a', ''));
// console.log(isMerge('', '', 'b'));
// console.log(isMerge('', '', 'b'));
console.log( isMerge("cac", "c", "ca"));
// console.log(isMerge('codewars', 'code', 'wars'));
// console.log(isMerge('codewars', 'wars', 'code'));
// console.log(isMerge('codewars', 'cdw', 'oears'));
// console.log(isMerge('codewars', 'cod', 'wars'));
// console.log(isMerge("Bananas from Bahamas", "Bahas", "Bananas from am"));
