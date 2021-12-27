"use strict";
exports.__esModule = true;
require("./Buttons.css");
var react_1 = require("react");
var service_js_1 = require("../../service.js");
var validation_js_1 = require("../../validation.js");
var buttonsOrder = [
    'C', '√', '%', '/', '7',
    '8', '9', 'x', '4', '5',
    '6', '-', '1', '2', '3',
    '+', '00', '0', '.', '=',
    '(', ')'
];
var Button = function (_a) {
    var setExpression = _a.setExpression, setResult = _a.setResult, expression = _a.expression;
    var divToFocus = (0, react_1.useRef)(null);
    var isNumber = !isNaN(expression[expression.length - 1]) || expression[expression.length - 1] === ')';
    (0, react_1.useEffect)(function () {
        divToFocus.current.focus();
    }, []);
    var handleClick = function (e) {
        if ((0, validation_js_1.isValidInput)(e.target.innerHTML, expression)) {
            setExpression(function (prevState) { return prevState += e.target.innerHTML; });
        }
        if (e.target.innerHTML === '=' && isNumber)
            setResult((0, service_js_1["default"])(expression));
        if (e.target.innerHTML === '√' && isNumber)
            setExpression((0, service_js_1.sqrt)(expression));
        if (e.target.innerHTML === '%' && isNumber)
            setExpression((0, service_js_1.percent)(expression));
        if (e.target.innerHTML === 'C') {
            setResult('');
            setExpression('');
        }
    };
    var onKeyPressed = function (e) {
        if ((0, validation_js_1.isValidInput)(e.key, expression))
            setExpression(function (prevState) { return prevState += e.key; });
        if (e.key === 'Enter' && isNumber)
            setResult((0, service_js_1["default"])(expression));
        if (e.key === '√' && isNumber)
            setExpression((0, service_js_1.sqrt)(expression));
        if (e.key === '%' && isNumber)
            setExpression((0, service_js_1.percent)(expression));
        if (e.key === "Backspace" && expression.length !== 0) {
            setExpression(function (prevState) { return (0, service_js_1.backSpace)(prevState); });
        }
    };
    return (<div onKeyDown={onKeyPressed} ref={divToFocus} tabIndex={0} className="grid">
        {buttonsOrder.map(function (value, index) { return <button onClick={handleClick} key={index}>{value}</button>; })}
            </div>);
};
exports["default"] = Button;
