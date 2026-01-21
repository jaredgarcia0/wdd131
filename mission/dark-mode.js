let selectElem = document.getElementById('dark-light-mode');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current === 'Dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.images.remove('#byui-logo')
        document.images.add('')
    } else if (current === 'Light'){
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode');
    }
}