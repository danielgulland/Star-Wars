const form = document.querySelector('.search-form');
    const text = document.querySelector('.form-control');
    const characters = [];
    let allData = [];
    let dataItems;
    let count = 2;
    let index = 1;

    function getCharacter(name) {

        //might just be better to type out all the pages instead of using a loop. Basically the same thing
        allData[0] = fetch(`https://swapi.dev/api/people/`);
        console.log(allData[0]);

        for(let i = 0; i < 30; i+=10) {
            allData[index] = fetch(`https://swapi.dev/api/people/?page=${count}`)
            .then(response => {
                return response.json();
            })
            .then(values => {
                for(let i = 0; i < values.results.length; i++) {
                    if(values.results[i].name == name) {
                        console.log("True");
                    }
                }
            })
            count++;
            index++;
        }
    }
    function search(e) {
        e.preventDefault();
        console.log(text.value);
        getCharacter(text.value);
    }

    const result = form.addEventListener('submit', search);