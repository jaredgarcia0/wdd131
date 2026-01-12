let title = document.querySelector('h1');
console.log(title);

title.textContent = 'Web Page Components';


let topic_title = document.getElementById('topics');
topic_title.style.color = 'red';

let list = document.querySelector('.list');
list.style.border = '3px solid black'

let para = document.querySelector('p');

// This two do the same thing but one of them the first one is better.
// the first one allow you to just out the css call that you want to change any style
para.classList.add('background');

// This second one is calling a method call backgroundColor.
// para.style.backgroundColor('#000')

let image = document.querySelector('img');



let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
})
                
const newPara = document.createElement('p');
newPara.innerText= 'Added JavaScipt';
document.body.appendChild(newPara);