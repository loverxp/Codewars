
exports.Matrix = class {
    constructor() {

    }

    static logMatrixInArray(matrix) {
        console.log();
        console.log(matrix.map(a => a.join(' ')).join('\n'));
    }

    static logBooleanMatrixInArray(matrix) {
        console.log();
        console.log(matrix.map(a => a.map(b => b ? 't' : 'f').join(' ')).join('\n'));
    }

    static logMatrixInString(matrix) {
        console.log();
        console.log(matrix.join('\n'));
    }

    static random(size) {
        const matrix = [];
        for (i = 0; i < size; i++) {
            const row = [];
            for (j = 0; j < size; j++) {
                row.push(Math.floor(Math.random() * 10));
            }
            matrix.push(row);
        }
        return matrix;
    }
};