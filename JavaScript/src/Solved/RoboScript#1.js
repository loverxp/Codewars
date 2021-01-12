function highlight(code) {
    return code.match(/(F+|R+|L+|[0-9]+)|[()]+/g).reduce((s1, s2) => {
        switch (true) {
            case /F+/.test(s2):
                return s1 + `<span style="color: pink">${s2}</span>`;
            case /L+/.test(s2):
                return s1 + `<span style="color: red">${s2}</span>`;
            case /R+/.test(s2):
                return s1 + `<span style="color: green">${s2}</span>`;
            case /[0-9]+/.test(s2):
                return s1 + `<span style="color: orange">${s2}</span>`;
            default:
                return s1 + s2;
        }

    }, "");
}

console.log(highlight("F3RF5LF7"));
console.log(highlight("FFFR345F2LL"));
// '<span style="color: green">RRRRR</span>(<span style="color: pink">F</span><span style="color: orange">45</span><span style="color: red">L</span><span style="color: orange">3</span>)<span style="color: pink">F</span><span style="color: orange">2</span>', 
// '<span style="color: green">RRRRR</span><span style="color: pink">F</span><span style="color: orange">45</span><span style="color: red">L</span><span style="color: orange">3</span><span style="color: pink">F</span><span style="color: orange">2</span>'