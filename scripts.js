const form = document.querySelector('.search-form');
const text = document.querySelector('.form-control');
const suggestions = document.querySelector('.suggestions');
const characters = [];
let allData = [];
let dataItems;
let count = 2;
let index = 1;
let index2 = 1;

let callAgain = true;

const requests = [];
var url;


async function getAllRequests(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        url = data.next;
        characters.push(...data.results);
        if(url !== null) {
            return getAllRequests(url);
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function foo(index) {
    let url = 'https://swapi.dev/api/people/?page=1';
    await getAllRequests(url);
    console.log(characters);
}

const result = form.addEventListener('submit', foo(5));

// Less efficient way..because we're hard coding the number of pages

// function getAllRequests(url) {
//     for(let i = 1; i < 10; i++) {
//         requests.push(fetch('https://swapi.dev/api/people/?page=' + i));
//     }
//     return requests;   
// }

// async function foo(index) {
//     const responses = await Promise.all(getAllRequests());
//     const data = await Promise.all(responses.map(res => res.json()));
//     data.forEach(object => characters.push(...object.results));

//     console.log(characters)
// }

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
        
            if(link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.1s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

}

function findMatches(value) {
    console.log(value);
    return characters.filter(character => {
        const regex = new RegExp(value, 'gi');
        return character.name.match(regex);
    })
}

function displayMatches() {
    const matches = findMatches(this.value);
    const html = matches.map(match => {
        console.log(match.name);
        return `
        <li>
        <span class="name">${match.name}</span>
      </li>`
    })
    .join('');
    console.log(html);
    suggestions.innerHTML = html;
}

const app = ()=> {
    navSlide();
}

suggestions.html = '<h1>hey</h1>'

    text.addEventListener('change', displayMatches);
    text.addEventListener('keyup', displayMatches);

app();