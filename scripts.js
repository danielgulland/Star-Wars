const form = document.querySelector('.search-form');
const text = document.querySelector('.form-control');
const characters = [];
let allData = [];
let dataItems;
let count = 2;
let index = 1;
let index2 = 1;

let callAgain = true;
// function getCharacter(name, index) {

//     //might just be better to type out all the pages instead of using a loop. Basically the same thing

//     fetch(`https://swapi.dev/api/people/?page=1`)
//     .then(blob => blob.json())
//     .then(data => {
//         console.log(data);
//         characters.push(...data.results);
//         if(data.next === null) {
//             return;
//         }
//     })
//     .catch(error => console.log(error));

//     index++;

//     console.log(characters);
//     // getCharacter(name, index++);
    
// }
// function search(e) {
//     e.preventDefault();
//     console.log(text.value);
//     getCharacter(text.value, index);
// }

// const result = form.addEventListener('submit', search);

let bool = true;
function getAllRequests() {
    const requests = [];
    for(let i = 1; i < 10; i++) {
        requests.push(fetch('https://swapi.dev/api/people/?page=' + i));
    }
    

    console.log(requests);
    
    return requests;   
}

function foo(index) {

    Promise.all(getAllRequests())
    .then(response => {
        console.log(response);
        let x = response.map(res => res.json());
        console.log(x);
        return Promise.all(x)
    })
    .then(data => {
        console.log(data);
        data.forEach(object => characters.push(...object.results));
    });

    console.log(characters);
}

const result = form.addEventListener('submit', foo(5));