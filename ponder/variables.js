// EXAMPLES

// For constants we use const the name the constant and after add value.
const PI = 3.14;

// For VARIABLES we use let the name the variable and after add value.
let radius = 3;

let area = PI * radius **2

// To check if it worked go in to inspect view on chrome and check console.
console.log(area);


const one = 1;
const two = '2';


let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block
                    