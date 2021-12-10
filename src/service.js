export const ops = ['+', '-', '/', 'x'];

const priority = {
  'x': 1,
  '/': 1,
  '+': 0,
  '-': 0,
  '*': 1,
};
const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  'x': (x, y) => x * y,
  '/': (x, y) => x / y,
  '*': (x, y) => x * y,
};

export const isValid = (s) => {
  const open = ['(', '{', '['];
  const close = [')', '}', ']'];
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
  const arr = str.split(/([\+\-\x\/\(\)])/); // 
  return arr
    .map((item, index) => (index === arr.length - 1 ? isInt(Math.sqrt(item)) : item))
    .join('');
};
export const percent = (str) => {
  const arr = str.split(/([\+\-\x\/\(\)])/);
  if(arr.length === 1) {
      return arr[0] / 100
  }
  for (let i = arr.length - 2; i >= 0; i -= 1) {
    if (!isNaN(arr[i])) {
      arr[arr.length - 1] = (arr[i] * arr[arr.length - 1]) / 100;
      break;
    }
  }
  return arr.join('');
};

const isInt = (str) => {
  const a = Number(str);
  return Number.isInteger(a) ? str : parseFloat(str).toFixed(2);
};

const infixIntoPolish = (str) => {
  const arr = str.split(/([\+\-\x\/\(\)])/); // regex to split string;

  // console.log(arr)
  const opsStack = [];
  const peek = (a) => a[a.length - 1];

  const result = arr.reduce((exitStack, sym) => {
    if (parseFloat(sym)) {
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
