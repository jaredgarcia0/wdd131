let pets = ['goldfish', 'dog', 'rhino'];

console.log(pets.length);

pets[3] = 'bunny';

console.log(pets);
pets.push('lizard');

console.log(pets);

const steps = ['one', 'two', 'three'];

//.forEach call a function foe evety item im the array
// steps.forEach(function(item) {
//     console.log(item);
// })


steps.forEach(showSteps);

function showSteps(item) {
    console.log(item)
}

// .map also calls a function but creats a new array from the original array.

let myList = document.querySelector('#myList');
const stepsHtml = steps.map(listTemplate);

function listTemplate(item) {
    return `<li>${item}</li>`
}

myList.innerHTML = stepsHtml

// .map 
let grades = ['A', 'B', 'D'];
let points;
let gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

console.log(gpaPoints);
console.log(grades);

// reduce reduce to a single value with an acumulator
let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, item) {
    return total + item;
}

console.log(totalPoints);

let gpaAverage = totalPoints/gpaPoints.length;
console.log(gpaAverage);

// .filter makes a new array but only items that pass a certain condintion
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const shortWords = words.filter(function(word){
    return word.length < 6;
})

console.log(shortWords);
          