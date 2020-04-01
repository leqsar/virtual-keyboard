window.onload = () => {
    let key, text;
    let arrayOfRussianSymbols = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'Del', 'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '', '', ''];
    let body = document.querySelector('body');
    let page = document.querySelector('html');
    let meta = document.createElement('META');
    let head = document.querySelector('HEAD');
    let keyboard = document.createElement('DIV');
    keyboard.classList.add('keyboard-wrap');
    body.append(keyboard);
    head.append(meta);
    meta.setAttribute('charset', 'utf-8');
    page.lang = 'ru';
    arrayOfRussianSymbols.forEach(elem => {
        key = document.createElement('DIV');
        text = document.createTextNode(elem);
        keyboard.append(key);
        key.append(text);
        key.classList.add('key');
    });
    let arrayOfKeys = document.querySelectorAll('.key');
    console.log(arrayOfKeys);
    key.addEventListener('keydown', () => {
        item.classList.add('pushed-button');
    })
    arrayOfKeys.forEach((item, i) => {
        item.addEventListener('keydown', () => {
            item.classList.add('pushed-button');
        })
    });

}
