window.onload = () => {
    let key, text, elem,
        russianSymbols = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', `\x5c`, 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 'Control', 'Win', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        englishSymbols = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\x27', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift', 'Control', 'Win', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        specialButtons = ['Tab', 'Shift', 'Meta', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Backspace', 'Delete', 'CapsLock', 'Control'],
        symbolsFromNumbers = ['!', '@', '#', '$', '%', '%', '^', '&', '*', '(', ')', '_', '+'],
        language = sessionStorage.getItem('language') == null ? 'english' : sessionStorage.getItem('language'),
        isCapsLock = false,
        isShift = false,
        isCaretShift = false,
        specialSymbols = {
            'Tab':'\t',
            'Enter':'\n',
            'ArrowUp':'↑',
            'ArrowDown':'↓'
        };
    const body = document.querySelector('body'),
        keyboard = document.createElement('DIV'),
        textarea = document.createElement('textarea'),
        languageContainer = document.createElement('SPAN'),
        warningContainer = document.createElement('P'),
        arrOfKeys = keyboard.childNodes;
    body.append(languageContainer);
    body.append(textarea);
    body.append(keyboard);
    body.append(warningContainer);
    keyboard.classList.add('keyboard-wrap');
    languageContainer.textContent = `${language}(Ctrl+Shift)`;
    warningContainer.textContent = 'You can click on CapsLock BY MOUSE, but nothing will happen, because state of Capslock in your system will not change';

    if (language == 'russian') {
        keyGeneration(russianSymbols);
    } else {
        keyGeneration(englishSymbols);
    }

    textarea.addEventListener('keydown', event => {
        event.preventDefault();
    })

    document.addEventListener('keydown', event => {
        if ((event.ctrlKey) && (event.shiftKey)) {
            language = language == 'russian' ? 'english' : 'russian';
            language == 'russian' ? swapLanguage(russianSymbols) : swapLanguage(englishSymbols);
            sessionStorage.setItem('language',`${language}`);
        }
        if (specialButtons.indexOf(event.key) !== -1) {
            event.preventDefault();
        }
        isShift = event.getModifierState("Shift") ? true : false;
        isCapsLock = event.getModifierState("CapsLock") ? true : false;
        arrowButtons();
        deleteButtons();
        defineButton();
        elem.classList.add('pushed-button');
        animation(elem);
        textOutput(elem);
        if (!isCaretShift) {
            setCaret(textarea.textContent.length);
        }
        if (textarea.selectionEnd == textarea.textContent.length) {
            isCaretShift = false;
        }
    });
    document.addEventListener('keyup', event => {
        defineButton();
        animation(elem);
        elem.classList.remove('pushed-button');
    });

    keyboard.addEventListener('mousedown', event => {
        if (event.target.textContent == 'CapsLock') {
            if (warningContainer.style.visibility == 'visible') {
                warningContainer.style.opacity = '1';
            } else {
                warningContainer.style.visibility = 'visible';
                warningContainer.style.opacity = '0';
            }
        }
        event.target.classList.add('pushed-button');
        animation(event.target);
        textOutput(event.target);
    });
    keyboard.addEventListener('mouseup', event => {
        animation(event.target);
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

    function deleteButtons() {
        let content = textarea.textContent.split(''),
            caretPosition = textarea.selectionEnd;
        if (event.key == 'Backspace') {
            content.splice(caretPosition-1, 1);
            textarea.textContent = `${content.join('')}`;
            setCaret(caretPosition-1);
        }
        if (event.key == 'Delete') {
            if (caretPosition < textarea.textContent.length) {
                content.splice(caretPosition, 1);
                textarea.textContent = `${content.join('')}`;
                setCaret(caretPosition);
            }
        }
    }

    function arrowButtons() {
        if (event.key == 'ArrowLeft') {
            setCaret(textarea.selectionEnd-1);
            isCaretShift = true;
        }
        if (event.key == 'ArrowRight') {
            setCaret(textarea.selectionEnd+1);
            isCaretShift = true;
        }
    }

    function swapLanguage(arrayOfSymbols) {
        arrOfKeys.forEach((item, i) => {
            item.textContent = `${arrayOfSymbols[i]}`;
        });
        languageContainer.textContent = `${language}(Ctrl+Shift)`;
    }

    function textOutput(pressedButton) {
        let textareaContent = textarea.textContent.split(''),
            caretPosition = textarea.selectionEnd;
        if (specialSymbols[pressedButton.textContent] !== undefined) {
            outputGeneration(specialSymbols[pressedButton.textContent]);
        } else if (specialButtons.indexOf(pressedButton.textContent) !== -1) {
            textarea.textContent = `${textarea.textContent}`;
            if (!(4 <= specialButtons.indexOf(event.key) <= 7)) {
                setCaret(caretPosition+1);
            }
        } else if (isCapsLock || isShift) {
            outputGeneration(pressedButton.textContent.toUpperCase());
        } else {
            outputGeneration(pressedButton.textContent);
        }

        function outputGeneration(symbol) {
            textareaContent.splice(caretPosition, 0, symbol);
            textarea.textContent = `${textareaContent.join('')}`;
            setCaret(caretPosition+1);
        }
    }

    function defineButton() {
        let key = event.key;
        if (isCapsLock || isShift) {
            if (specialButtons.indexOf(event.key) !== -1) {
                key = event.key;
            } else {
                key = event.key.toLowerCase();
            }
        }
        let indexOfPushedButton = russianSymbols.indexOf(key) == -1 ? englishSymbols.indexOf(key) : russianSymbols.indexOf(key);
        if (indexOfPushedButton == -1) {
            indexOfPushedButton = symbolsFromNumbers.indexOf(key);
        }
        elem = arrOfKeys[indexOfPushedButton];
        specialButtonsSelector();
    }

    function setCaret(position) {
        textarea.selectionStart = textarea.selectionEnd = position;
    }

    function animation(elem) {
        if (elem.style.boxShadow == 'none') {
            elem.style.boxShadow = '3px 3px 1.5px';
        } else {
            elem.style.boxShadow = 'none';
        }
    }
}
