// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/solutions/javascript
// http://blog.zhengyi.one/fibonacci-in-logn.html
function fib(n) {
    if (n >= 0) {
        // return positiveFib(n);
        return fibonacci_recursion_fast(n);
    }
    else {
        return negativeFib(n);
    }
}

function positiveFib(n) {
    if (n == 0) return 0n;
    if (n == 1) return 1n;

    let values = [0n, 1n, 0n];
    for (let index = 2; index <= n; index++) {
        const v1Index = (index - 2) % 3;
        const v2Index = (index - 1) % 3;
        const vIndex = index % 3;
        values[vIndex] = values[v1Index] + values[v2Index];
        // console.log(vIndex, v1Index, v2Index);

    }
    return values[n % 3];
}

function negativeFib(n) {
    if (n == -1) return 1n;

    let values = [0n, 1n, 0n];
    for (let index = 2; index <= -n; index++) {
        const v1Index = (index - 2) % 3;
        const v2Index = (index - 1) % 3;
        const vIndex = index % 3;
        values[vIndex] = values[v1Index] - values[v2Index];
    }
    return values[-n % 3];
}

function fibonacci_recursion_fast(n) {
    if (n == 0) return 0n;
    if (n == 1) return 1n;

    const k = n % 2 != 0 ? (n + 1) / 2 : n / 2;
    const fib_k = fibonacci_recursion_fast(k);
    const fib_k_1 = fibonacci_recursion_fast(k - 1);

    return n % 2 != 0 ? fib_k ** 2n + fib_k_1 ** 2n : (2n * fib_k_1 + fib_k) * fib_k;
}

/*
def fibonacci_recursion_fast(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    k = (n + 1) / 2 if n % 2 else n / 2
    fib_k = fibonacci_recursion_fast(k)
    fib_k_1 = fibonacci_recursion_fast(k - 1)
    return fib_k ** 2 + fib_k_1 ** 2 if n % 2 else (2 * fib_k_1 + fib_k) * fib_k
*/

function test(n) {
    console.log(fib(n));
    console.log(fibonacci_recursion_fast(n));
}

// console.log(fib(-6));
// console.log(fib(20));
// console.log(fib(-20));
// console.log(fib(80000));
// console.log(fib(100));
// console.log(fib(-80000));
// console.log(fib(800));
// console.log(fib(-800));
// console.log(fib(-0));
// console.log(fib(-1));
// console.log(fib(-63));
// console.log(fib(-43));
// console.log(fib(-83));
// console.log(fib(-84));
// console.log(fib(800000));
// console.log(fib(1000000));
// console.log(fib(2000000));
// console.log(fib(-800000));
// console.log(fib(2000000000));

// test(10);
// test(3);
// console.log(fibonacci_recursion_fast(10));
// console.log(fibonacci_recursion_fast(100));
// test(100);
// test(10000)
// console.log(fibonacci_recursion_fast(1000000));
console.log(fibonacci_recursion_fast(2000000));
