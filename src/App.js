import './App.css';
import { useState, useRef, useEffect } from 'react';
import calculation, { last, ops, sqrt, percent, backSpace} from './service.js'

const App = () => {

    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const divToFocus = useRef(null);

    useEffect(()=>{
        divToFocus.current.focus();
     },[])

    const handleClick = (e) => {
        const point = Object.entries(e.target.dataset);

        for (const [key, value] of point) {

            if (key === 'num' || key === 'braces') {
              setExpression(prevState => prevState += value === '.' && expression.length === 0 ? '0.' : value )
             
            }
            if (key === 'zero' && expression.length !== 0) {
              setExpression(prevState => prevState += value)
            }
            if (value === 'clear') {
              setExpression('');
              setResult('');
            }
            if (value === 'sqrt' && !isNaN(last(expression))) {
              const result = sqrt(expression);
              setExpression(result)
            }
            if (value === 'percent' && !isNaN(last(expression))) {
              const result = percent(expression);
              setExpression(result)
            }
            const isCorrectLastSym = (key === 'operation' && !ops.includes(last(expression)));
            const isCorrectDots = (last(expression) !== '.' && expression.length !== 0);
        
            if (isCorrectLastSym && isCorrectDots) {
              setExpression(prevState => prevState += value)
            }
            if (value === '-' && expression.length === 0) {
              setExpression(prevState => prevState += value)
            }
            if (value === '=' && !ops.includes(last(expression))) {
              const output = calculation(expression);
        
              setResult(output)
              setExpression(output)
            }
          }
        
       
    }
    const  onKeyPressed = (e) => {

        console.log(e.key)
        const eventCodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '+', '-', '(', ')', 'x', '*'];

  if (eventCodes.includes(e.key)) {
    setExpression(prevState => prevState += e.key)
  }
  if(e.key === 'Backspace' && expression.length !== 0) {
      setExpression(prevState => backSpace(prevState))
  }
  
  if (e.key === 'Enter' && !ops.includes(last(expression))) {
    const output = calculation(expression)

        setResult(output)
        setExpression(output)
  }
  if (e.key === '√' && !isNaN(last(expression))) {
    const result = sqrt(expression);
    setExpression(result);
  }
  if (e.key === '%') {
    const result = percent(expression);
    setExpression(result)
  }
      }

    return (
        <div onKeyDown={onKeyPressed} ref={divToFocus} tabIndex={0} className="calculator-container">
        <div className="calculator">
            <div className="expression">{expression}</div>
            <div  className="result">{result}</div>
            <div onClick={handleClick}  className="grid">
                <button data-init="clear">C</button>
                <button data-init="sqrt">√</button>
                <button data-init="percent">%</button>
                <button data-operation="/">/</button>
                <button data-num="7">7</button>
                <button data-num="8">8</button>
                <button data-num="9">9</button>
                <button data-operation="x">x</button>
                <button data-num="4">4</button>
                <button data-num="5">5</button>
                <button data-num="6">6</button>
                <button data-operation="-">-</button>
                <button data-num="1">1</button>
                <button data-num="2">2</button>
                <button data-num="3">3</button>
                <button data-operation="+">+</button>
                <button data-zero="00">00</button>
                <button data-zero="0">0</button>
                <button data-num=".">,</button>
                <button data-result="=">=</button>
                <button data-braces="(">(</button>
                <button data-braces=")">)</button>
            </div>
        </div>
    </div>
    )
}

export default App;