import calculation, { ops } from './service.js';

let display = '';
const lastChar = (str) => str[str.length - 1];
console.log(ops)


let expression = document.querySelector('.grid');
let screen = document.querySelector('.expression');
let result = document.querySelector('.result');


render();

expression.addEventListener('click', (e) => {
    const point = Object.entries(e.target.dataset);
    console.log(e.target.disabled);
    for(const [key, value] of point) {
        if(key === 'num') {
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
        if((key === 'operation' && !ops.includes(lastChar(display))) && (lastChar(display) !== '.' && display.length !== 0)) {
            display += value;
            render()
            
            
        }
        if(value === '=' && !ops.includes(lastChar(display)) ) {
            const output = display.length === 0 ? 'There is no input' : calculation(display)
            result.innerHTML = output;
        }
        
        
    }
    
    
})

function render()  {
    screen.innerText = display;
}



