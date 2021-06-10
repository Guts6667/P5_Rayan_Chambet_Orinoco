
//                           Page d'accueil
//                          ----------------

//       Boutons Orino-""
//      ------------------
var btnOrinoOak = document.querySelector("#btnOrinoOak");
var btnOrinoCamera = document.querySelector("#btnOrinoCamera");
var btnOrinoTeddy = document.querySelector("#btnOrinoTeddy");

//       Sections Cards
//      ---------------

var sectionOak = document.querySelector("#sectionOak");
var sectionCamera = document.querySelector("#sectionCamera");
var sectionTeddy = document.querySelector("#sectionTeddy");

//                          Mise en page 
//                         --------------

// function btnHover(variable){

//    variable.style = "background-image: linear-gradient(to left bottom, #8f5afe,  #ff809a, #ffb495, #ffe0b9); box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.9); ";
// }

// btnOrinoOak.addEventListener("mouseover", () => {
//     btnHover(btnOrinoOak);
// });

btnOrinoOak.addEventListener("click", () => {
    sectionOak.style.display = "block";
    sectionCamera.style.display = "none";
    sectionTeddy.style.display = "none";
});





btnOrinoCamera.addEventListener("click", () => {
    sectionCamera.style.display = "block";
    sectionOak.style.display = "none";
    sectionTeddy.style.display = "none";
    
});

btnOrinoTeddy.addEventListener("click", () => {
    sectionTeddy.style.display = "block";
    sectionOak.style.display = "none";
    sectionCamera.style.display = "none";
});




//                      Gestion des cards
//                     --------------------

// Variables :

fetch('http://localhost:3000/api/teddies')
.then((response) => {
  return response.json();
})
.then((data) => {
    data.forEach( value => {
        console.log(value)
    })
});

