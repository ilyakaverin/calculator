export const ops = ['+', '-', '/', 'x'];

const priority = {
    "x": 1,
    "/": 1,
    "+": 0,
    "-": 0,
  };
  const operators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "x": (x, y) => x * y,
    "/": (x, y) => x / y,
  };
  
  export const isValid = (s) => {
    
    const open = ['(','{','['];
    const close = [')','}',']'];
    const stack = [];
    
    for(let i = 0; i < s.length; i += 1) {
        if(open.includes(s[i])) {
            stack.push(s[i])
        }
        if(close.includes(s[i])) {
            if(close.indexOf(s[i]) !== open.indexOf(stack[stack.length - 1])) {
                return false
            } else {
              stack.pop()
            }
        }
    }
    return stack.length === 0
  }

  export const sqrt = (str) => {
    const arr = str.split(/([\+\-\x\/\(\)])/);
    return arr
    .map((item, index) => 
    index === arr.length - 1 ? parseFloat(Math.sqrt(item)).toFixed(2) : item)
    .join('')
}

  

const infixIntoPolish = (str) => {
    const arr = str.split(/([\+\-\x\/\(\)])/);
    console.log(arr)
    const opsStack = [];
    const peek = (a) => a[a.length - 1];
    
    const result = arr.reduce((exitStack, sym) => {
      if (parseFloat(sym)) {
        exitStack.push(sym);
      }
      if (sym == "(") {
        opsStack.push(sym);
      }
  
      if (sym == ")") {
        while (peek(opsStack) != "(") exitStack.push(opsStack.pop());
        opsStack.pop();
      }
  
      if (sym in priority) {
        while (
          peek(opsStack) in priority &&
          priority[sym] <= priority[peek(opsStack)]
        )
          exitStack.push(opsStack.pop());
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
  
    return stack.pop()
  };

  export default (str) => calculate(infixIntoPolish(str))
 
 