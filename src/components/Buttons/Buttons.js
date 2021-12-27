import './Buttons.css';
import { useRef, useEffect } from 'react'; 
import calculation, { isValidInput, last, sqrt, percent, backSpace } from '../../service.js';
import { isValidInput } from '../../validation.js';

const buttonsOrder = [
    'C', '√',  '%', '/', '7',
    '8', '9',  'x', '4', '5',
    '6', '-',  '1', '2', '3',
    '+', '00', '0', '.', '=',
    '(', ')'
  ]


const Button = ({ setExpression, setResult, expression }) => {

    const divToFocus = useRef(null);
    const isNumber = !isNaN(last(expression)) || last(expression) === ')';

    useEffect(() => {
        divToFocus.current.focus();
     },[]);

    const handleClick = (e) => {

        

        if(isValidInput(e.target.innerHTML, expression)) {
            setExpression(prevState => prevState += e.target.innerHTML);
        }
        if(e.target.innerHTML === '=' && isNumber) setResult(calculation(expression));
        if(e.target.innerHTML === '√' && isNumber) setExpression(sqrt(expression));
        if(e.target.innerHTML === '%' && isNumber) setExpression(percent(expression));

        if(e.target.innerHTML === 'C') {
            setResult('');
            setExpression('');
        }

        };
        const onKeyPressed = (e) => {

            if(isValidInput(e.key, expression)) setExpression(prevState => prevState += e.key);
          
          if(e.key === 'Enter' && isNumber) setResult(calculation(expression));
          if(e.key === '√' && isNumber) setExpression(sqrt(expression));
          if(e.key === '%' && isNumber) setExpression(percent(expression));
        
          if (e.key === "Backspace" && expression.length !== 0) {
            setExpression((prevState) => backSpace(prevState));
          } 
          
        
            
              
            };
    return (
        <div onKeyDown={onKeyPressed}  ref={divToFocus} tabIndex={0}  className="grid">
        {
            buttonsOrder.map((value, index) => <button onClick={handleClick} key={index} >{value}</button>)
        }
            </div>
        
    )
}
export default Button