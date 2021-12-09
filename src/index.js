import calculation, { ops, isValid, sqrt, percent } from './service.js';

let display = '';
const lastChar = (str) => str[str.length - 1];


let expression = document.querySelector('.grid');
let screen = document.querySelector('.expression');
let result = document.querySelector('.result');


render();

expression.addEventListener('click', (e) => {
    const point = Object.entries(e.target.dataset);
    
    for(const [key, value] of point) {
        if(key === 'num' || key === 'braces') {
            display += value ==='.' && display.length === 0 ? '0.' : value;
            render()
        }
        if(key === 'zero' && display.length !== 0) {
            display += value;
            render()
        }
        if(value === 'clear') {
            display = '';
            result.innerText = ''
            render()
        }
        if(value === 'sqrt' && !isNaN(lastChar(display))) {
            const a = sqrt(display);
            display = a;
            render()
        }
        if(value === 'percent' && !isNaN(lastChar(display))) {
            const b = percent(display);
            display = b;
            render();
        }
        if((key === 'operation' && !ops.includes(lastChar(display))) && (lastChar(display) !== '.' && display.length !== 0)) {
            display += value;
            render()
            
        }
        if(value === '=' && !ops.includes(lastChar(display)) ) {

            const output = display.length === 0 ? 'There is no input' : 
                       isValid(display) === false ? 'incorrect input' :
                       calculation(display)

            result.innerHTML = output;
        }
        
        
    }
    
    
})

function render()  {
    screen.innerText = display;
}



