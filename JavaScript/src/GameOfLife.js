function getGeneration(cells, generations) {
    console.log(cells);
    console.log({ generations });



    // let cells1 = cells;
    let cells1 = cells.map(a => a.map(i => i));
    let cells2 = cells.map(a => a.map(i => 0));

    // htmlize(cells1);
    // htmlize(cells2);
    // htmlize({cells2});
    // console.log(cells1);
    // console.log(cells2);


    for (let index = 0; index < generations; index++) {
        if (index % 2 == 0) {
            cells = nextGeneration(cells1, cells2);
        }
        else {
            cells = nextGeneration(cells2, cells1);
        }
    }
    return cells;

    function nextGeneration(cells1, cells2) {
        for (let y = 0; y < cells1.length; y++) {
            const row = cells1[y];
            for (let x = 0; x < row.length; x++) {
                // const element = row[x];
                cells2[y][x] = willLive(x, y, cells1) ? 1 : 0;
            }
        }
        // cells1.forEach((line, y) => {
            // line.forEach((_, x) => {
                // cells2[y][x] = willLive(x, y, cells1) ? 1 : 0;
            // });
        // });
        // console.log(cells2);
        htmlize(cells2);
        return cells2;
    }

    function willLive(x, y, cells) {
        // console.log('willLive:',{ x, y });
        const neighbours = [
            isLive(y - 1, x - 1),
            isLive(y - 1, x),
            isLive(y - 1, x + 1),
            isLive(y, x + 1),
            isLive(y + 1, x + 1),
            isLive(y + 1, x),
            isLive(y + 1, x - 1),
            isLive(y, x - 1),
        ];
        // console.log(neighbours);


        const lives = neighbours.reduce((lives, live) => lives + (live == 1 ? 1 : 0), 0);

        // console.log({lives});

        console.log({ x, y, lives });

        // if(cells[y][x] == 1 && (lives==2 || lives==3)){
        // newCells[y][x]=1;
        // }
        // else if(cells[y][x] == 0 && (lives==2 || lives==3)){
        // 
        // }
        if (lives == 3 || (lives == 2 && cells[y][x] == 1)) {
            // newCells[y][x]=1;
            return true;
        }
        return false;

        // function isLive(x, y) {
        function isLive(y, x) {
            if (cells[y] != undefined) {
                return cells[y][x] == 1 ? 1 : 0;
            }
            return 0;
        }
    }

}

function htmlize(cells) {
    console.log(cells.map(a => a.map(c => c == 1 ? '*' : '.').join(' ')).join('\n'));
}

function test(cells, generations) {
    const result = getGeneration(cells, generations);
    htmlize(result);
}



test([[1, 0, 0], [0, 1, 1], [1, 1, 0]], 1);
// test([[1, 0, 0], [0, 1, 1], [1, 1, 0]], 2);
