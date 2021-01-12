import {parseInt} from "../Solved/ParseInt"

const input1 = "one" // 1
const input2 = "twenty" // 20
const input3 = "two hundred forty-six" // 246
const input3_2 = "two hundred and forty-six" // 246
const input4_0 = "seven hundred eighty-three thousand" // 783000
const input4 = "seven hundred eighty-three thousand nine hundred and nineteen" // 783919
const input5 = "forty-six" // 46

test('parseInt1', () => {
    expect(parseInt(input1)).toBe(1);
});

test('parseInt2', () => {
    expect(parseInt(input2)).toBe(20);
});

test('parseInt5', () => {
    expect(parseInt(input5)).toBe(46);
});

test('parseInt3', () => {
    expect(parseInt(input3)).toBe(246);
});

test('parseInt3_2', () => {
    expect(parseInt(input3_2)).toBe(246);
});

test('input4_0', () => {
    expect(parseInt(input4_0)).toBe(783000);
});

test('parseInt4', () => {
    expect(parseInt(input4)).toBe(783919);
});