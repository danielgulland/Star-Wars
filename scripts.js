const nav = document.querySelector('nav')
const form = document.querySelector('.search-form');
const text = document.querySelector('.form-control');
const navLinks = document.querySelector('.nav-links');
const characters = [];
let films = [];
let allData = [];
let dataItems;
let count = 2;
let index = 1;
let index2 = 1;

let callAgain = true;

const requests = [];
var url;

async function getAllCharacters(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        url = data.next;
        characters.push(...data.results);
        if(url !== null) {
            return getAllCharacters(url);
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function foo() {
    let url = 'https://swapi.dev/api/people/?page=1';
    await getAllCharacters(url);
    console.log(characters);
}

async function getAllFilms() {
    try {
        const response = await fetch('https://swapi.dev/api/films/')
        const data = await response.json();
        films.push(...data.results);
        console.log(films);
    }
    catch(err) {
        console.log(err);
    }
}

 const result = form.addEventListener('submit', foo());
 const links = navLinks.addEventListener('click', getAllFilms);
 console.log(nav);

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

const app = ()=> {
    navSlide();
}

app();