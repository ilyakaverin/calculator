const inputDictionary: any = {
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
  '%': 'action',
};

export const isValidParentheses = (string: string) => {
  const open = ['('];
  const close = [')'];
  const stack = [];

  for (let i = 0; i < string.length; i += 1) {
    if (open.includes(string[i])) {
      stack.push(string[i]);
    }
    if (close.includes(string[i])) {
      if (
        close.indexOf(string[i])
                  !== open.indexOf(stack[stack.length - 1])
      ) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};

export const isValidInput = (input: string, expression: string) => {
  const inputType = inputDictionary[input];
  const lastSym = expression[expression.length - 1];

  const isCorrectLastSym = inputType === 'operation' && (inputDictionary[lastSym] !== 'num' && inputDictionary[lastSym] !== 'zero');
  const isCorrectDots = (inputType === 'dot' && inputDictionary[lastSym] !== 'num') && inputDictionary[lastSym] !== 'zero';
  const isCorrectZero = inputType === 'zero' && (expression.length === 0 || inputDictionary[lastSym] === 'close');
  const isCorrectNums = inputType === 'num' && inputDictionary[lastSym] === 'close';
  const action = inputType === 'action';
  const isCorrectMinus = inputType === 'minus' && (inputDictionary[lastSym] !== 'num' && expression.length !== 0) && (inputDictionary[lastSym] !== 'open' && inputDictionary[lastSym] !== 'zero');
  const isCorrectOpenBrace = inputType === 'open' && inputDictionary[lastSym] === 'num';

  if (isCorrectNums) return false;
  if (isCorrectLastSym) return false;
  if (isCorrectDots) return false;
  if (isCorrectZero) return false;
  if (action) return false;
  if (isCorrectMinus) return false;
  if (isCorrectOpenBrace) return false;

  return input in inputDictionary;
};
