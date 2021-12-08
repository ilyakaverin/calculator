const infixIntoPolish = (str) => {
    const arr = str.split(" ");
    const opsStack = [];
    const peek = (a) => a[a.length - 1];
    const priority = {
      "*": 1,
      "/": 1,
      "+": 0,
      "-": 0,
    };
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
  
  const operators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
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
  
    return stack.pop();
  };

  export default (str) => calculate(infixIntoPolish(str))
 
 