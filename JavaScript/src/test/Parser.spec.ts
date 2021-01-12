import { toPostfix } from "../Solved/Infix2PostfixConverter"

test('Infix2PostfixConverter', () => {
    expect(toPostfix("2+7*5")).toBe("275*+");
    // expect(toPostfix("3*3/(7+1)")).toBe("33*71+/");
    // expect(toPostfix("5+(6-2)*9+3^(7-1)")).toBe("562-9*+371-^+");
    // expect(toPostfix("(5-4-1)+9/5/2-7/1/7")).toBe("54-1-95/2/+71/7/-");
});
