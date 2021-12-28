import './Buttons.css';
import { useRef, useEffect } from 'react';
import calculation, { sqrt, percent, backSpace } from '../../service';
import { isValidInput, isNumber } from '../../validation';

const buttonsOrder: string[] = [
  'C', '√', '%', '/', '7',
  '8', '9', 'x', '4', '5',
  '6', '-', '1', '2', '3',
  '+', '00', '0', '.', '=',
  '(', ')',
];
interface SetDisplay {
    setExpression: any,
    setResult: any,
    expression: string
}

const Button = ({ setExpression, setResult, expression }: SetDisplay) => {
  const divToFocus = useRef(null);

  const isValidExpression = isNumber(expression);

  console.log('kek')

  useEffect(() => {
    divToFocus.current.focus();
  }, []);

  const handleClick = (e) => {
    if (isValidInput(e.target.innerHTML, expression)) {
      // eslint-disable-next-line
        setExpression((prevState) => (prevState += e.target.innerHTML));
    }
    if (e.target.innerHTML === '=' && isValidExpression) setResult(calculation(expression));
    if (e.target.innerHTML === '√' && isValidExpression) setExpression(sqrt(expression));
    if (e.target.innerHTML === '%' && isValidExpression) setExpression(percent(expression));

    if (e.target.innerHTML === 'C') {
      setResult('');
      setExpression('');
    }
  };
  const onKeyPressed = (e) => {
    // eslint-disable-next-line
      if (isValidInput(e.key, expression)) setExpression((prevState) => (prevState += e.key));

    if (e.key === 'Enter' && isNumber) setResult(calculation(expression));
    if (e.key === '√' && isNumber) setExpression(sqrt(expression));
    if (e.key === '%' && isNumber) setExpression(percent(expression));
    if (e.key === 'Backspace' && expression.length !== 0) {
      setExpression((prevState) => backSpace(prevState));
    }
  };
  return (
      <div
        onKeyDown={onKeyPressed}
        ref={divToFocus}
        tabIndex={0}
        className='grid'
      >
        {
          // eslint-disable-next-line
          buttonsOrder.map((value, index) => (
            <button onClick={handleClick} key={index}>
              {value}
            </button>
          ))
        }
      </div>
  );
};
export default Button;
