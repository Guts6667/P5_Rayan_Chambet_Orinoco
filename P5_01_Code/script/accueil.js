/* Selector */

let btnOrinoOak = document.querySelector("#btnOrinoOak");
let btnOrinoCamera = document.querySelector("#btnOrinoCamera");
let btnOrinoTeddy = document.querySelector("#btnOrinoTeddy");

/* Listeners */

btnOrinoOak.addEventListener("click", () => {
    displayCards('http://localhost:3000/api/furniture', 'furniture')
});

btnOrinoCamera.addEventListener("click", () => {
    displayCards('http://localhost:3000/api/cameras', 'cameras')
});

btnOrinoTeddy.addEventListener("click", () => {
    displayCards('http://localhost:3000/api/teddies', 'teddies')
});

/* API */

function displayCards(url, cat){

    let sectionProducts = document.querySelector("#sectionProducts");

    sectionProducts.innerHTML = ''

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach( value => {
            let newDiv = document.createElement("div");
            newDiv.className = 'col col-md-4 my-3'
            newDiv.innerHTML = '<article class="card shadow" style="background-color: #FFF7FE;"><img src="' + value.imageUrl + '" class="card-img-top" alt="..."><div class="card-body"><h5 id="title1" class="card-title">' + value.name + '</h5><p id="description" class="card-text">' + value.description + '</p><a href="./P5_01_Code/produits.html?ref='+ value._id +'&cat=' + cat + '" class="btn stretched-link" style="background-image: linear-gradient(to right top, #8f5afe,  #ff809a, #ffb495, #ffe0b9); box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.4);">Acheter pour '+ parseFloat(value.price).toFixed(2) +' €</a></div></article>'

            sectionProducts.appendChild(newDiv);

        })
    });

}