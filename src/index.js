import calculation, {
  ops, isValid, sqrt, percent,
} from './service.js';

let display = '';
const lastChar = (str) => str[str.length - 1];

const expression = document.querySelector('.grid');
const screen = document.querySelector('.expression');
const result = document.querySelector('.result');

function render() {
    screen.innerText = display;
  }

render();

expression.addEventListener('click', (e) => {
  const point = Object.entries(e.target.dataset);

  for (const [key, value] of point) {
      result.innerText = ''
    if (key === 'num' || key === 'braces') {
      display += value === '.' && display.length === 0 ? '0.' : value;
      render();
    }
    if (key === 'zero' && display.length !== 0) {
      display += value;
      render();
    }
    if (value === 'clear') {
      display = '';
      result.innerText = '';
      render();
    }
    if (value === 'sqrt' && !isNaN(lastChar(display))) {
      const a = sqrt(display);
      display = a;
      render();
    }
    if (value === 'percent' && !isNaN(lastChar(display))) {
      const b = percent(display);
      display = b;
      render();
    }
    if ((key === 'operation' && !ops.includes(lastChar(display))) && (lastChar(display) !== '.' && display.length !== 0)) {
      display += value;
      render();
    }
    if (value === '=' && !ops.includes(lastChar(display))) {
      const output = display.length === 0 ? 'There is no input'
        : isValid(display) === false ? 'incorrect input'
          : calculation(display);

      result.innerText = output;
      display = output;
      render();
    }
  }
});

document.addEventListener('keypress', (e) => {
    const point = Object.entries(e.target.dataset);

    const eventCodes = ['1','2','3','4','5','6','7','8','9','0', '/', '+', '-', '(', ')', 'x',];
    const percentKey = 36;
    const enter = 13;
    const square = 8730;
    const clear = 32;

    if(eventCodes.includes(e.key)) {
        display += e.key;
        render()
    }

    if (e.key === 'Enter' && !ops.includes(lastChar(display))) {
        const output = display.length === 0 ? 'There is no input'
          : isValid(display) === false ? 'incorrect input'
            : calculation(display);
  
        result.innerText = output;
        display = output;
        render();
      }
      if (e.key === ' ') {
        display = '';
        result.innerText = '';
        render();
      }
      if (e.key === '√' && !isNaN(lastChar(display))) {
        const a = sqrt(display);
        display = a;
        render();
        result.innerText = a
      }


    console.log(e.key, 'dis',display)


})
