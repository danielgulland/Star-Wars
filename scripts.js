const nav = document.querySelector("nav");
const form = document.querySelector(".search-form");
const text = document.querySelector(".form-control");
const navLinks = document.querySelector(".nav-links");
const suggestions = document.querySelector(".suggestions");
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
    if (url !== null) {
      return getAllCharacters(url);
    }
  } catch (err) {
    console.log(err);
  }
}

async function foo() {
  let url = "https://swapi.dev/api/people/?page=1";
  await getAllCharacters(url);
  console.log(characters);
}

async function getAllFilms() {
  try {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    films.push(...data.results);
    console.log(films);
  } catch (err) {
    console.log(err);
  }
}

const result = form.addEventListener("submit", foo());
const links = navLinks.addEventListener("click", getAllFilms);
console.log(nav);

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.1s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};

function findMatches(value) {
  console.log(value);
  return characters.filter((character) => {
    const regex = new RegExp(value, "gi");
    return character.name.match(regex);
  });
}

function displayMatches() {
  const matches = findMatches(this.value);
  const html = matches
    .map((match) => {
      console.log(match.name);
      return `
        <li>
        <span class="name">${match.name}</span>
      </li>`;
    })
    .join("");
  console.log(html);
  suggestions.innerHTML = html;
}

const app = () => {
  navSlide();
};

suggestions.html = "<h1>hey</h1>";

text.addEventListener("change", displayMatches);
text.addEventListener("keyup", displayMatches);

app();
