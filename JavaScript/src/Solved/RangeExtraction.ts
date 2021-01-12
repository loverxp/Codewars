// https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/solutions/javascript
function solution(list: any[]) {
    if(list.length == 0 ){
        return [];
    }
    let rangeStart: number | undefined;
    let last: number | undefined;
    let result = [];
    for (const i of list) {
        console.log(`${rangeStart}, ${last}, ${i}`);
        
        if(!rangeStart){
            rangeStart = i;
            last = i;
        }
        else{
            if(last != undefined){
                if (i - last > 1){
                    if (rangeStart == last) {
                        result.push(rangeStart);
                    }
                    else if(last - rangeStart == 1){
                        result.push(rangeStart);
                        result.push(last);
                    }
                    else{
                        result.push(rangeStart + '-' + last);
                    }
                    rangeStart = i;
                }
                else if(i - last <= 0){
                    throw new Error("order error!");
                }
                last = i;
            }
            else{
                throw new Error("no last!" + i);
            }
        }
    }
    if(rangeStart == undefined || last == undefined){
        return [];
    }
    if (rangeStart == last) {
        result.push(rangeStart);
    }
    else if (last - rangeStart == 1) {
        result.push(rangeStart);
        result.push(last);
    }
    else{
        result.push(rangeStart + '-' + last);
    }
    return result.join(',');
}

// const result = solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// const result = solution([-6, -3, -2, -1, 0]);
// const result = solution([-6, -3, -2, -1, 0, 1]);
// const result = solution([1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// console.log(result);

// const result = solution([-72, -71]);
// console.log(result);
// console.log(solution([71, 72]));