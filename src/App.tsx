import './App.css';
import { useState } from 'react';
import Buttons from './components/Buttons/Buttons';

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  return (
        <div className="calculator-container">
          <div className="calculator">
            <div className="display">
              <div className="expression">{expression}</div>
              <div className="result">{result}</div>
            </div>
            <Buttons setExpression={setExpression} setResult={setResult} expression={expression} />
          </div>
        </div>
  );
};

export default App;
