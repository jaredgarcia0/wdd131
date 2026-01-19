let selectElem = document.getElementById('dark-light-mode');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeMode);

function changeMode() {
    let current = selectElem.value;
    if (current === 'Dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else if (current === 'Light'){
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode');
    }
}