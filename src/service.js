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
exports.percent = exports.sqrt = exports.parse = exports.backSpace = exports.isInt = void 0;
var validation_1 = require("./validation");
var priority = {
    x: 1,
    '/': 1,
    '+': 0,
    '-': 0,
    '*': 1
};
var operators = {
    '+': function (x, y) { return x + y; },
    '-': function (x, y) { return x - y; },
    x: function (x, y) { return x * y; },
    '/': function (x, y) { return x / y; },
    '*': function (x, y) { return x * y; }
};
var isInt = function (number) { return (Number.isInteger(number) ? number : number.toFixed(2)); };
exports.isInt = isInt;
var backSpace = function (string) { return string.slice(0, string.length - 1); };
exports.backSpace = backSpace;
var parse = function (str) {
    // eslint-disable-next-line
    var separateOpsAndNums = str.split(/([\+\-\x\*\/\(\)])/);
    var removedSpaces = separateOpsAndNums.filter(function (i) { return i !== ''; });
    for (var i = 0; i < removedSpaces.length; i += 1) {
        if (removedSpaces[i] === '(' && removedSpaces[i + 1] === '-') {
            removedSpaces[i + 1] = removedSpaces[i + 1].concat(removedSpaces[i + 2]);
            removedSpaces[i + 2] = '';
        }
        if (removedSpaces[i] === '-' && removedSpaces.indexOf(removedSpaces[i]) === 0) {
            removedSpaces[i] = removedSpaces[i].concat(removedSpaces[i + 1]);
            removedSpaces[i + 1] = '';
        }
    }
    var result = removedSpaces
        .map(function (i) { return (parseFloat(i) || i === '0' ? Number(i) : i); })
        .filter(function (i) { return i !== ''; });
    return result;
};
exports.parse = parse;
var sqrt = function (string) {
    var array = (0, exports.parse)(string);
    var result = array
        .map(function (item, index) { return (index === array.length - 1
        ? item < 0
            ? 'cant sqrt negative'
            : (0, exports.isInt)(Math.sqrt(item))
        : item); })
        .join('');
    return result;
};
exports.sqrt = sqrt;
var percent = function (str) {
    var array = (0, exports.parse)(str);
    var lastSym = array[array.length - 1];
    if (typeof lastSym !== 'number') {
        return str;
    }
    if (array.length === 1 && array[0] > 0) {
        return lastSym / 100;
    }
    for (var i = array.length - 2; i >= 0; i -= 1) {
        if (typeof array[i] === 'number') {
            array[array.length - 1] = (array[i] * lastSym) / 100;
            break;
        }
    }
    return array.join('');
};
exports.percent = percent;
var infixIntoPolish = function (str) {
    var array = (0, exports.parse)(str);
    var opsStack = [];
    var result = array.reduce(function (exitStack, sym) {
        if (typeof sym === 'number') {
            exitStack.push(sym);
        }
        if (sym === '(') {
            opsStack.push(sym);
        }
        if (sym === ')') {
            while (opsStack[opsStack.length - 1] !== '(')
                exitStack.push(opsStack.pop());
            opsStack.pop();
        }
        if (sym in priority) {
            while (opsStack[opsStack.length - 1] in priority
                && priority[sym] <= priority[opsStack[opsStack.length - 1]])
                exitStack.push(opsStack.pop());
            opsStack.push(sym);
        }
        return exitStack;
    }, []);
    var reversed = opsStack.reverse();
    return __spreadArray(__spreadArray([], result, true), reversed, true);
};
var calculate = function (array) {
    var stack = [];
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
    if (!(0, validation_1.isValidParentheses)(string) || string.length === 0) {
        return 'incorrect input';
    }
    var setValidString = infixIntoPolish(string);
    var result = (0, exports.isInt)(calculate(setValidString));
    return result === 'NaN' ? 'incorrect input' : result.toString();
});
