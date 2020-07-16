const form = document.querySelector(".search-form");
const text = document.querySelector(".form-control");
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
  // *UNDERSTAND*
  try {
    const response = await fetch(url);
    const data = await response.json();
    url = data.next;
    characters.push(...data.results);
    if (url !== null) {
      return getAllRequests(url);
    }
  } catch (err) {
    console.log(err);
  }
}

async function foo(index) {
  let url = "https://swapi.dev/api/people/?page=1";
  await getAllRequests(url);
  console.log(characters);
}

const promise = fetch("https://swapi.dev/api/species").then((res) =>
  res.json()
);

promise.then((values) => console.log(values));

// Async / Await / Fetch *Using Fetch to output names of species
async function fetchSpecies() {
  const res = await fetch("https://swapi.dev/api/species");
  const data = await res.json();
  myArray = [];
  myArray = data.results;
  mySpecies = [];
  for (i = 0; i < myArray.length; i++) {
    mySpecies += myArray[i].name;
  }
  console.log(mySpecies);
}
fetchSpecies();

// const result = form.addEventListener("submit", foo(5));

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
