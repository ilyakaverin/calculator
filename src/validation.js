"use strict";
exports.__esModule = true;
exports.isValidInput = exports.isValidParentheses = void 0;
var inputDictionary = {
    '/': 'operation',
    7: 'num',
    8: 'num',
    9: 'num',
    x: 'operation',
    4: 'num',
    5: 'num',
    6: 'num',
    '-': 'minus',
    1: 'num',
    2: 'num',
    3: 'num',
    '+': 'operation',
    '00': 'zero',
    0: 'zero',
    '.': 'dot',
    '=': 'action',
    '(': 'open',
    ')': 'close',
    C: 'action',
    '√': 'action',
    '%': 'action'
};
var isValidParentheses = function (string) {
    var open = ['('];
    var close = [')'];
    var stack = [];
    for (var i = 0; i < string.length; i += 1) {
        if (open.includes(string[i])) {
            stack.push(string[i]);
        }
        if (close.includes(string[i])) {
            if (close.indexOf(string[i])
                !== open.indexOf(stack[stack.length - 1])) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
};
exports.isValidParentheses = isValidParentheses;
var isValidInput = function (input, expression) {
    var inputType = inputDictionary[input];
    var lastSym = expression[expression.length - 1];
    var isCorrectLastSym = inputType === 'operation' && (inputDictionary[lastSym] !== 'num' && inputDictionary[lastSym] !== 'zero');
    var isCorrectDots = (inputType === 'dot' && inputDictionary[lastSym] !== 'num') && inputDictionary[lastSym] !== 'zero';
    var isCorrectZero = inputType === 'zero' && inputDictionary[lastSym] === 'close';
    var isCorrectNums = inputType === 'num' && inputDictionary[lastSym] === 'close';
    var action = inputType === 'action';
    var isCorrectMinus = inputType === 'minus' && (inputDictionary[lastSym] !== 'num' && expression.length !== 0) && (inputDictionary[lastSym] !== 'open' && inputDictionary[lastSym] !== 'zero');
    var isCorrectOpenBrace = inputType === 'open' && inputDictionary[lastSym] === 'num';
    if (isCorrectNums)
        return false;
    if (isCorrectLastSym)
        return false;
    if (isCorrectDots)
        return false;
    if (isCorrectZero)
        return false;
    if (action)
        return false;
    if (isCorrectMinus)
        return false;
    if (isCorrectOpenBrace)
        return false;
    return input in inputDictionary;
};
exports.isValidInput = isValidInput;
