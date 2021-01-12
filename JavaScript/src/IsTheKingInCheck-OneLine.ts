// https://www.codewars.com/kata/5e320fe3358578001e04ad55/train/javascript
let board;
export const isCheck=(chessBoard:string[][])=>{
    board = chessBoard
    return false
}

// const isIn=(a:number,b:number,x:number) =>(a - x)*(x - b) > 0
const isIn=(a:number,b:number,x:number) =>(a - x)*(x - b) > 0