import './Buttons.css';
import { useRef, useEffect } from 'react';
import calculation, { sqrt, percent, backSpace } from '../../service';
import { isValidInput } from '../../validation';

const buttonsOrder = [
  'C', '√', '%', '/', '7',
  '8', '9', 'x', '4', '5',
  '6', '-', '1', '2', '3',
  '+', '00', '0', '.', '=',
  '(', ')',
];

const Button = ({ setExpression, setResult, expression }) => {
  const divToFocus = useRef(null);
  // eslint-disable-next-line
  const isNumber = !isNaN(expression[expression.length - 1]) || expression[expression.length - 1] === ')';

  useEffect(() => {
    divToFocus.current.focus();
  }, []);

  const handleClick = (e) => {
    if (isValidInput(e.target.innerHTML, expression)) {
      // eslint-disable-next-line
      setExpression((prevState) => prevState += e.target.innerHTML);
    }
    if (e.target.innerHTML === '=' && isNumber) setResult(calculation(expression));
    if (e.target.innerHTML === '√' && isNumber) setExpression(sqrt(expression));
    if (e.target.innerHTML === '%' && isNumber) setExpression(percent(expression));

    if (e.target.innerHTML === 'C') {
      setResult('');
      setExpression('');
    }
  };
  const onKeyPressed = (e) => {
    // eslint-disable-next-line
    if (isValidInput(e.key, expression)) setExpression((prevState) => prevState += e.key);

    if (e.key === 'Enter' && isNumber) setResult(calculation(expression));
    if (e.key === '√' && isNumber) setExpression(sqrt(expression));
    if (e.key === '%' && isNumber) setExpression(percent(expression));
    if (e.key === 'Backspace' && expression.length !== 0) {
      setExpression((prevState) => backSpace(prevState));
    }
  };
  return (
        <div onKeyDown={onKeyPressed} ref={divToFocus} tabIndex={0} className="grid">
        { // eslint-disable-next-line
            buttonsOrder.map((value, index) => <button onClick={handleClick} key={index} >{value}</button>)
        }
            </div>

  );
};
export default Button;
