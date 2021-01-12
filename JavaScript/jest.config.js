module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.tsx?$': 'jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  // testMatch:[]
  // testRegex: '(/__tests__/ParseInt\.spec\.ts)$',
  // testRegex: '(ParseInt\.spec\.ts)$',
  // testRegex: '(RegEx\.spec\.ts)$',
  // testRegex: '(AddingBigNumbers\.spec\.ts)$',
  // testRegex: '(Parser\.spec\.ts)$',
  testRegex: '(Common\.spec\.js)$',
  // testRegex: '(ParseInt.*.ts)',
  // testRegex: '(/__tests__/ParseInt.*)$',
  // testRegex: '(/__tests__/.*|\.spec\.ts)$',
  // testRegex: '(/__tests__/ParseInt.*|\.spec\.ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleFileExtensions: ['ts'],
}