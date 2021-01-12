function makePyramid(layer) {
    return [...Array(layer).keys()]
        // .map(a => ' '.repeat(2 * (layer - a)) + Array((2 * a + 1)).fill('*').join(' '))
        .map(a => ' '.repeat(layer - a) + Array(a ).fill('*').join(' '))
        .join('\n\n\n');
}

// console.log(makePyramid(20));
console.log(makePyramid(10));

str = 
`                    *
                  * * *
                * * * * *
              * * * * * * *
            * * * * * * * * *
          * * * * * * * * * * *
        * * * * * * * * * * * * *
      * * * * * * * * * * * * * * *
    * * * * * * * * * * * * * * * * *
  * * * * * * * * * * * * * * * * * * *`;
//   console.log(str);
  