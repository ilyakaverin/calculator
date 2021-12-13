export const ops = ['+', '-', '/', 'x'];

const priority = {
  x: 1,
  '/': 1,
  '+': 0,
  '-': 0,
  '*': 1,
};
const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  x: (x, y) => x * y,
  '/': (x, y) => x / y,
  '*': (x, y) => x * y,
};
const parse = (str) => {
  const result = str.split(/([\+\-\x\*\/\(\)])/)
  .filter(i => i !== '') ;

  for(let i=0; i < result.length; i += 1) {
    if(result[i] === '(' && result[i + 1] === '-') {
     result[i + 1] =  result[i + 1].concat(result[i + 2]);
     result[i + 2] = ''
    }
    if(result[i] === '-' && str.startsWith('-')) {
      result[i] = result[i].concat(result[i + 1]);
      result[i + 1] = ''

    }
    
  }
  return result
}

export const isValid = (s) => {
  const open = ['('];
  const close = [')'];
  const stack = [];

  for (let i = 0; i < s.length; i += 1) {
    if (open.includes(s[i])) {
      stack.push(s[i]);
    }
    if (close.includes(s[i])) {
      if (close.indexOf(s[i]) !== open.indexOf(stack[stack.length - 1])) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};

export const sqrt = (str) => {
  const arr = parse(str);
  const result = arr
    .filter(i =>  i !== '')
    .map((item, index) => (index === arr.length - 1 ? isInt(Math.sqrt(item)) : item))
    .join('');

    return Number(result) < 1 ? 'cant sqrt negative' : result
};
export const percent = (str) => {
  const arr = parse(str);
  if (arr.length === 1) {
    return arr[0] / 100;
  }
  for (let i = arr.length - 2; i >= 0; i -= 1) {
    if (!isNaN(arr[i])) {
      arr[arr.length - 1] = (arr[i] * arr[arr.length - 1]) / 100;
      break;
    }
  }
  return arr.join('');
};

export const isInt = (str) => {
  const a = Number(str);
  return Number.isInteger(a) ? str : parseFloat(str).toFixed(2);
};



const infixIntoPolish = (str) => {
  const arr = parse(str);
  const opsStack = [];
  const peek = (a) => a[a.length - 1];

  const result = arr.reduce((exitStack, sym) => {
    if (parseFloat(sym) || sym === 0) {
      exitStack.push(sym);
    }
    if (sym === '(') {
      opsStack.push(sym);
    }

    if (sym === ')') {
      while (peek(opsStack) !== '(') exitStack.push(opsStack.pop());
      opsStack.pop();
    }

    if (sym in priority) {
      while (
        peek(opsStack) in priority
          && priority[sym] <= priority[peek(opsStack)]
      ) exitStack.push(opsStack.pop());
      opsStack.push(sym);
    }

    return exitStack;
  }, []);
  const reversed = opsStack.reverse();
  return [...result, ...reversed];
};

const calculate = (array) => {
  const stack = [];

  array.forEach((sym) => {
    if (sym in operators) {
      const [y, x] = [stack.pop(), stack.pop()];

      stack.push(operators[sym](x, y));
    } else {
      stack.push(parseFloat(sym));
    }
  });

  return isInt(stack.pop());
};

export default (str) => calculate(infixIntoPolish(str));
