let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.button'); 
let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        handleButtonClick(e.target.innerHTML); 
        e.target.classList.add('button-clicked');
        setTimeout(() => {
            e.target.classList.remove('button-clicked');
        }, 300);
    });
});


function handleButtonClick(value) {
    buttons.forEach(btn => btn.classList.remove('button-clicked'));

    if (value === '=') {
        string = eval(string);
    } else if (value === 'AC') {
        string = "";
    } else if (value === 'DEL') {
        string = string.substring(0, string.length - 1);
    } else {
        if (input.clientWidth < input.scrollWidth) {
            const overflow = input.scrollWidth - input.clientWidth;
            const substringIndex = Math.max(0, string.length - overflow);
            string = string.substring(substringIndex) + value;
        } else {
            string += value;
        }
    }

    input.value = string;
    
}

function handleKeyboardInput(event) {
    const key = event.key;
    const keyMap = {
        'Enter': '=',
        'Escape': 'AC',
        'Backspace': 'DEL',
        '/': '/',
        '*': '*',
        '-': '-',
        '+': '+',
        '.': '.',
    };

    if (keyMap.hasOwnProperty(key)) {
        handleButtonClick(keyMap[key]);
    } else if (!isNaN(key) || key === '0') {
        handleButtonClick(key);
    }
}


document.addEventListener('keydown', handleKeyboardInput);
