import calculation from './service.js';

let display = '';

let expression = document.querySelector('.grid');
let screen = document.querySelector('.expression');


render();

expression.addEventListener('click', (e) => {
    const point = Object.entries(e.target.dataset);
    console.log(e.target.disabled)
    for(const [key, value] of point) {
        if(key === 'num') {
            display += value;
            render()
        }
        if(value === 'clear') {
            display = '';
            render()
        }
        if(key === 'operation') {
            if(display.length === 0 && value !== '-') {
                render()
            }

            display += value;
            render()
        }
        
    }
    
})

function render()  {
    screen.innerText = display
}



