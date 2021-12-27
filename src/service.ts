import { isValidParentheses } from "./validation";

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



export const isInt = (number: number) => (Number.isInteger(number) ? number : number.toFixed(2));
export const last = (string: string) => string[string.length - 1];
export const backSpace = (string: string) => string.slice(0, string.length - 1);

export const parse = (str: string) => {
  const separateOpsAndNums = str.split(/([\+\-\x\*\/\(\)])/);
  const removedSpaces = separateOpsAndNums.filter((i) => i !== '');

  for (let i = 0; i < removedSpaces.length; i += 1) {
    if (removedSpaces[i] === '(' && removedSpaces[i + 1] === '-') {
      removedSpaces[i + 1] = removedSpaces[i + 1].concat(
        removedSpaces[i + 2],
      );
      removedSpaces[i + 2] = '';
    }
    if (removedSpaces[i] === '-' && removedSpaces.indexOf(removedSpaces[i]) === 0) {
      removedSpaces[i] = removedSpaces[i].concat(removedSpaces[i + 1]);
      removedSpaces[i + 1] = '';
    }
  }
  const result = removedSpaces
    .map((i) => (parseFloat(i) || i === '0' ? Number(i) : i))
    .filter((i) => i !== '');
  return result;
};

export const sqrt = (string: string) => {
  const array: (string | number)[] = parse(string);
  const result = array
    .map((item: number, index) => (index === array.length - 1
      ? item < 0
        ? 'cant sqrt negative'
        : isInt(Math.sqrt(item))
      : item))
    .join('');

  return result;
};

export const percent = (str: string) => {
  const array: any[] = parse(str);

  if (array.length === 1 && array[0] > 0) {
    return array[0] / 100;
  }
  for (let i = array.length - 2; i >= 0; i -= 1) {
    if (!isNaN(array[i])) {
      array[array.length - 1] = (array[i] * array[array.length - 1]) / 100;
      break;
    }
  }
  return array.join('');
};

const infixIntoPolish = (str: string) => {
  const array = parse(str);
  const opsStack: any = [];
  const result = array.reduce((exitStack, sym: string | number) => {
    if (typeof sym === 'number') {
      exitStack.push(sym);
    }
    if (sym === '(') {
      opsStack.push(sym);
    }

    if (sym === ')') {
      while (last(opsStack) !== '(') exitStack.push(opsStack.pop());
      opsStack.pop();
    }

    if (sym in priority) {
      while (
        last(opsStack) in priority
                && priority[sym] <= priority[last(opsStack)]
      ) exitStack.push(opsStack.pop());
      opsStack.push(sym);
    }

    return exitStack;
  }, []);
  const reversed = opsStack.reverse();
  
  return [...result, ...reversed];
};

const calculate = (array: (string | number)[]) => {
  const stack = [];

  array.forEach((sym) => {
    if (sym in operators) {
      const [y, x] = [stack.pop(), stack.pop()];

      stack.push(operators[sym](x, y));
    } else {
      stack.push(sym);
    }
  });

  return stack.pop();
};

export default (string: string) => {
  if (!isValidParentheses(string) || string.length === 0) {
    return 'incorrect input';
  }
  const setValidString = infixIntoPolish(string);
  const result = isInt(calculate(setValidString));
  return result === 'NaN' ? 'incorrect input' : result.toString();
};
