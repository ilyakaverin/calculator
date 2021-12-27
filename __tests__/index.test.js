var calculation = require('../src/service')["default"];
var _a = require('../src/service'), percent = _a.percent, sqrt = _a.sqrt, parse = _a.parse;
var _b = require('../src/validation'), isValidInput = _b.isValidInput, isValidParentheses = _b.isValidParentheses;
test('parse string', function () {
    expect(parse('50-5')).toEqual([50, '-', 5]);
    expect(parse('-155+5.3-(-45)')).toEqual([-155, '+', 5.3, '-', '(', -45, ')']);
    expect(parse('(50+(-25))*8/(9+(-3))')).toEqual(['(', 50, '+', '(', -25, ')', ')', '*', 8, '/', '(', 9, '+', '(', -3, ')', ')']);
});
var calcCases = [
    ['2+2', '4'],
    ['20+2', '22'],
    ['100-10', '90'],
    ['100/10', '10'],
    ['100x10', '1000'],
    ['0.2+0.4', '0.60'],
    ['2+(-22)', '-20'],
    ['100/(-2)', '-50'],
    ['-25+25', '0'],
    ['((', 'incorrect input'],
    ['-2+(-6.5)', '-8.50'],
    ['-2+25', '23'],
    ['-2-2', '-4'],
    ['', 'incorrect input'],
    ['(50+(-25))*8/(9+(-3))', '33.33'],
    ['2+2-(-)', 'incorrect input'],
    ['-2.2.2', 'incorrect input'],
];
test.each(calcCases)('calculation', function (a, expected) {
    expect(calculation(a)).toBe(expected);
});
test('percentage', function () {
    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('0.6-1')).toEqual('0.6-0.006');
});
test('sqrt', function () {
    expect(sqrt('4')).toEqual('2');
    expect(sqrt('50')).toEqual('7.07');
    expect(sqrt('10-9')).toEqual('10-3');
});
var opsCases = ['2+', '2+()', '2.', '-', '+', '.', '/', 'x', '*'];
test.each(opsCases)('isValidInput', function (a) {
    expect(isValidInput('-', a)).toBeFalsy();
    expect(isValidInput('.', a)).toBeFalsy();
});
test('isValidZero', function () {
    expect(isValidInput('0', ')')).toBeFalsy();
});
test('isValidNums', function () {
    expect(isValidInput('1', ')')).toBeFalsy();
});
var inValidParentheses = ['(', '())', '(()', ')', '()(', '())'];
test.each(inValidParentheses)('isValidParentheses', function (a) {
    expect(isValidParentheses(a)).toBeFalsy();
});
