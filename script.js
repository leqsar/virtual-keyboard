window.onload = () => {
    let key, text, elem;
    let arrayOfRussianSymbols = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 'Control', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        arrayOfEnglishSymbols = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift', 'Control', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        language = sessionStorage.getItem('language') == null ? 'english' : sessionStorage.getItem('language'),
        isCapsLock = false,
        specialButtons = ['Tab', 'Shift', 'Meta', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Backspace', 'Delete', 'CapsLock', 'Control'];
    const body = document.querySelector('body'),
        keyboard = document.createElement('DIV'),
        arrOfKeys = keyboard.childNodes,
        textarea = document.createElement('textarea');
    let specialSymbols = {
        'Tab':'\t',
        'Enter':'\n'
    }
    body.append(textarea);
    body.append(keyboard);
    textarea.setAttribute('readonly', 'readonly');
    keyboard.classList.add('keyboard-wrap');

    if (language == 'russian') {
        keyGeneration(arrayOfRussianSymbols);
    } else {
        keyGeneration(arrayOfEnglishSymbols);
    }

    document.addEventListener('keydown', event => {
        if ((event.ctrlKey) && (event.shiftKey)) {
            language = language == 'russian' ? 'english' : 'russian';
            language == 'russian' ? swapLanguage(arrayOfRussianSymbols) : swapLanguage(arrayOfEnglishSymbols);
            sessionStorage.setItem('language',`${language}`);
        }
        if (specialButtons.indexOf(event.key) !== -1) event.preventDefault();
        defineButton();
        if (event.key == 'CapsLock') {
            isCapsLock = isCapsLock == true ? false : true;
        }
        elem.classList.add('pushed-button');
        textOutput(elem);
    });
    document.addEventListener('keyup', event => {
        defineButton();
        elem.classList.remove('pushed-button');
    });
    keyboard.addEventListener('mousedown', event => {
        event.target.classList.add('pushed-button');
        textOutput(event.target);
    });
    keyboard.addEventListener('mouseup', event => {
        event.target.classList.remove('pushed-button');
    });

    function keyGeneration(arrayOfSymbols) {
        arrayOfSymbols.forEach(elem => {
            key = document.createElement('DIV');
            text = document.createTextNode(elem);
            keyboard.append(key);
            key.append(text);
            key.classList.add('key');
        });
    }

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

    function swapLanguage(arrayOfSymbols) {
        arrOfKeys.forEach((item, i) => {
            item.textContent = `${arrayOfSymbols[i]}`;
        });
    }

    function textOutput(pressedButton) {
        if (specialSymbols[event.key] !== undefined) {
            textarea.textContent = `${textarea.textContent+specialSymbols[event.key]}`;
        } else if (specialButtons.indexOf(event.key) !== -1) {
            textarea.textContent = `${textarea.textContent}`;
        } else if (isCapsLock) {
            textarea.textContent = `${textarea.textContent+pressedButton.textContent.toUpperCase()}`;
        } else {
            textarea.textContent = `${textarea.textContent+pressedButton.textContent}`;
        }
    }

    function defineButton() {
        let key = (isCapsLock) && (event.key !== 'CapsLock') ? event.key.toLowerCase() : event.key,
            indexOfPushedButton = arrayOfRussianSymbols.indexOf(key) == -1 ? arrayOfEnglishSymbols.indexOf(key) : arrayOfRussianSymbols.indexOf(key);
            console.log(key);
        elem = arrOfKeys[indexOfPushedButton];
        specialButtonsSelector();
    }
}
