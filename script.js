window.onload = () => {
    let key, text;
    let arrayOfRussianSymbols = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 'Control', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
    const body = document.querySelector('body'),
        keyboard = document.createElement('DIV'),
        arrOfKeys = keyboard.childNodes;
    let elem;
    keyboard.classList.add('keyboard-wrap');
    body.append(keyboard);
    arrayOfRussianSymbols.forEach(elem => {
        key = document.createElement('DIV');
        text = document.createTextNode(elem);
        keyboard.append(key);
        key.append(text);
        key.classList.add('key');
    });
    document.addEventListener('keydown', event => {
        let indexOfPushedButton = arrayOfRussianSymbols.indexOf(event.key);
        elem = arrOfKeys[indexOfPushedButton];
        specialButtonsSelector();
        elem.classList.add('pushed-button');
    });
    document.addEventListener('keyup', event => {
        let indexOfPushedButton = arrayOfRussianSymbols.indexOf(event.key);
        elem = arrOfKeys[indexOfPushedButton];
        specialButtonsSelector();
        elem.classList.remove('pushed-button');
    });
    function specialButtonsSelector() {
        if (event.code == 'ControlLeft') {
            elem = arrOfKeys[55];
        } else if (event.code == 'ControlRight') {
            elem = arrOfKeys[60];
        } else if (event.code == 'ShiftLeft') {
            elem = arrOfKeys[42];
        } else if (event.code == 'ShiftRight') {
            elem = arrOfKeys[54];
        } else if (event.code == 'AltRight') {
            elem = arrOfKeys[59];
        } else if (event.code == 'AltLeft') {
            elem = arrOfKeys[57];
        }
    }
}
