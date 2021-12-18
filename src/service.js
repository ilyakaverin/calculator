"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.percent = exports.sqrt = exports.isValid = exports.backSpace = exports.last = exports.isInt = exports.ops = void 0;
exports.ops = ['+', '-', '/', 'x'];
var priority = {
    'x': 1,
    '/': 1,
    '+': 0,
    '-': 0,
    '*': 1
};
var operators = {
    '+': function (x, y) { return x + y; },
    '-': function (x, y) { return x - y; },
    'x': function (x, y) { return x * y; },
    '/': function (x, y) { return x / y; },
    '*': function (x, y) { return x * y; }
};
var isInt = function (number) { return Number.isInteger(number) ? number : number.toFixed(2); };
exports.isInt = isInt;
var last = function (string) { return string[string.length - 1]; };
exports.last = last;
var parse = function (str) {
    var SeparateOpsAndNums = str.split(/([\+\-\x\*\/\(\)])/);
    var removeSpaces = SeparateOpsAndNums.filter(function (i) { return i !== ''; });
    for (var i = 0; i < removeSpaces.length; i += 1) {
        if (removeSpaces[i] === '(' && removeSpaces[i + 1] === '-') {
            removeSpaces[i + 1] = removeSpaces[i + 1].concat(removeSpaces[i + 2]);
            removeSpaces[i + 2] = '';
        }
        if (removeSpaces[i] === '-' && str.startsWith('-')) {
            removeSpaces[i] = removeSpaces[i].concat(removeSpaces[i + 1]);
            removeSpaces[i + 1] = '';
        }
    }
    var result = removeSpaces.map(function (i) { return parseFloat(i) || i === '0' ? Number(i) : i; }).filter(function (i) { return i !== ''; });
    console.log('parsed', result);
    return result;
};
var backSpace = function (string) { return string.slice(0, string.length - 1); };
exports.backSpace = backSpace;
var isValid = function (string) {
    var open = ['('];
    var close = [')'];
    var stack = [];
    for (var i = 0; i < string.length; i += 1) {
        if (open.includes(string[i])) {
            stack.push(string[i]);
        }
        if (close.includes(string[i])) {
            if (close.indexOf(string[i]) !== open.indexOf(stack[stack.length - 1])) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
};
exports.isValid = isValid;
var sqrt = function (string) {
    var array = parse(string);
    var result = array
        .map(function (item, index) { return index === array.length - 1 ? item < 0 ? 'cant sqrt negative' : Math.sqrt(item) : item; })
        .join('');
    return result;
};
exports.sqrt = sqrt;
var percent = function (str) {
    var array = parse(str);
    if (array.length === 1 && array[0] > 0) {
        return array[0] / 100;
    }
    for (var i = array.length - 2; i >= 0; i -= 1) {
        if (!isNaN(array[i])) {
            array[array.length - 1] = (array[i] * array[array.length - 1]) / 100;
            break;
        }
    }
    return array.join('');
};
exports.percent = percent;
var infixIntoPolish = function (str) {
    var array = parse(str);
    var opsStack = [];
    var result = array.reduce(function (exitStack, sym) {
        if (typeof sym === 'number') {
            exitStack.push(sym);
        }
        if (sym === '(') {
            opsStack.push(sym);
        }
        if (sym === ')') {
            while ((0, exports.last)(opsStack) !== '(')
                exitStack.push(opsStack.pop());
            opsStack.pop();
        }
        if (sym in priority) {
            while ((0, exports.last)(opsStack) in priority
                && priority[sym] <= priority[(0, exports.last)(opsStack)])
                exitStack.push(opsStack.pop());
            opsStack.push(sym);
        }
        return exitStack;
    }, []);
    var reversed = opsStack.reverse();
    var output = __spreadArray(__spreadArray([], result, true), reversed, true);
    return output;
};
var calculate = function (array) {
    var stack = [];
    console.log('calcArr', array);
    array.forEach(function (sym) {
        if (sym in operators) {
            var _a = [stack.pop(), stack.pop()], y = _a[0], x = _a[1];
            stack.push(operators[sym](x, y));
        }
        else {
            stack.push(sym);
        }
    });
    return stack.pop();
};
exports["default"] = (function (string) {
    if (!(0, exports.isValid)(string) || string.length === 0) {
        return 'incorrect input';
    }
    var setValidString = infixIntoPolish(string);
    var result = (0, exports.isInt)(calculate(setValidString));
    return result.toString();
});
