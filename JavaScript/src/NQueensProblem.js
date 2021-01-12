function nQueen(N) {
    // Return array of queen positions
    
}

function solve(firstQueen, size) {
    // let queens = Array(size).fill(-1);
    let queens = [];
    let chessboard = Array(size).fill(0).map(a => Array(size).fill('.'));
    visalizeQueens();
    const result = tryQueen(firstQueen);
    visalizeQueens();
    console.log({ count });
    console.log(result);
    return queens;

    function tryQueen(candidate) {
        console.log({ candidate });
        count++;
        if (queens.some(queen => isConflict(candidate, queen))) {
            return false;
        }
        queens.push(candidate);
        const [x, y] = candidate;
        const nextX = (x + 1) % size;
        if (nextX == firstQueen[0]) {
            return true;
        }
        for (let i = 0; i < size; i++) {
            if (tryQueen([nextX, i])) {
                return true;
            }
        }
        queens.pop();
        return false;
    }

    function isConflict([x1, y1], [x2, y2]) {
        return y1 == y2 || x1 == x2 || y1 - x1 == y2 - x2 || y1 + x1 == y2 + x2;
    }

    function visalizeQueens() {
        queens.forEach(([x, y]) => {
            chessboard[y][x] = 'Q';
        });
        console.log(chessboard.map(a => a.join(' ')).join('\n'));
    }
}