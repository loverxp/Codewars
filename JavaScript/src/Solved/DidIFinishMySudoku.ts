// https://www.codewars.com/kata/53db96041f1a7d32dc0004d2/solutions/javascript

export function doneOrNot(board: number[][]) {
    let rows = board;
    let columns = [];
    for (let i = 0; i < 9; i++) {
        const row = board[i];
        const column: number[] = [];
        columns.push(column);
        for (let j = 0; j < 9; j++) {
            column.push(rows[j][i]);
        }
    }
    let blocks = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const block: number[] = [];
            blocks.push(block);
            for (let m = 0; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                    let x = i * 3 + m;
                    let y = j * 3 + n;
                    block.push(rows[x][y])
                }
            }

        }
    }

    let noZero = checkNoZero(rows);
    let noDuplicate = checkNoDuplicate(rows) && checkNoDuplicate(columns) && checkNoDuplicate(blocks);
    if (noDuplicate && noZero) {
        return "Finished!";
    } else {
        return "Try again!";
    }
}

function checkNoDuplicate(array: number[][]) {
    return array
        .map(element => new Set(element).size == 9)
        .reduce((a, b) => a && b);
}

function checkNoZero(array: number[][]) {
    return array
        .map(element => element.filter(e => e == 0).length == 0)
        .reduce((a, b) => a && b);
}
