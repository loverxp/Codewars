// https://www.codewars.com/kata/5296bc77afba8baa690002d7
var Test = require('./Common/Test');
var Matrix = require('./Common/Matrix').Matrix;

function sudoku(puzzle) {
    const rows = Array(9).fill(0).map(_ => Array(9).fill(false));
    const columns = Array(9).fill(0).map(_ => Array(9).fill(false));
    const boxes = Array(3).fill(0).map(_ => Array(3).fill(0).map(_ => Array(9).fill(false)));

    prepare();
    fillNums(0, 0);
    return puzzle;

    function prepare() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = puzzle[i][j];
                if (num != '.') {
                    setStatus(j, i, num, true);
                }
            }
        }
    }

    function fillNums(x, y) {
        if (puzzle[y][x] == '.') {
            let result = false;
            for (let i = 0; i < 9; i++) {
                const num = i + 1;
                if (isNumAvailable(x, y, num)) {
                    puzzle[y][x] = num.toString();
                    setStatus(x, y, num, true);
                    result = tryNext();
                    if (!result) {
                        setStatus(x, y, num, false);
                        puzzle[y][x] = '.';
                    }
                }
            }
            return result;
        }
        else {
            return tryNext();
        }

        function tryNext() {
            const [nextX, nextY] = x != 9 ? [x + 1, y] : [0, y + 1];
            return nextY > 8 ? true : fillNums(nextX, nextY);
        }
    }

    function isNumAvailable(x, y, num) {
        const i = num - 1;
        return !rows[y][i] && !columns[x][i] && !boxes[Math.trunc(y / 3)][Math.trunc(x / 3)][i];
    }

    function setStatus(x, y, num, status) {
        const i = num - 1;
        rows[y][i] = status;
        columns[x][i] = status;
        y = Math.trunc(y / 3);
        x = Math.trunc(x / 3);
        boxes[y][x][i] = status;
    }

}


function test(board) {
    Matrix.logMatrixInArray(board);
    const test = new Test.Test(sudoku, board);
    test.logArgs = false;
    test.resultLogger = function (board) {
        Matrix.logMatrixInArray(board);
    }
    test.do();
}

input = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

var puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];

test(input);