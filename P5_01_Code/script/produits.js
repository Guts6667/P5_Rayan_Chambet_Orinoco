window.addEventListener("load", () => {

    /* Selector */
    let image = document.querySelector('#products-image')
    let name = document.querySelector('#products-name')
    let description = document.querySelector('#products-description')
    let button = document.querySelector('#products-button')

    /* Récupération des paramètres */
    let url = new URL(window.location.href);
    let ref = url.searchParams.get("ref");
    let cat = url.searchParams.get("cat");

    /* Création de la page produit */
    fetch('http://localhost:3000/api/' + cat + '/' + ref)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        image.src = data.imageUrl
        name.textContent = data.name
        description.textContent = data.description
        button.textContent = 'Mettre au panier ' + parseFloat(data.price).toFixed(2) + ' €'

        switch(cat){
            case 'furniture' :
                displayOptions(data.varnish, "vernissage")
            break;
            case 'teddies' :
                displayOptions(data.colors, "couleur")
            break;
            case 'cameras' :
                displayOptions(data.lenses, "type de lentille")
            break;
        }


    })

    /* Evenement soumission formulaire */
    document.querySelector('#products-button').addEventListener('click', () => {

        let addToCart = { 
            "ref": ref, 
            "cat": cat, 
            "qtt": document.querySelector('#products-qtt').value,
            "spec": document.querySelector('#products-select').value,
        };

        if(localStorage.getItem('panier') == null){

            let panier = []
            panier[0] = addToCart;
            localStorage.setItem('panier', JSON.stringify(panier))
    
        } else{

            let panier = JSON.parse(localStorage.getItem('panier'))
            panier.push(addToCart)
            localStorage.setItem('panier', JSON.stringify(panier))
        }

        console.log(JSON.parse(localStorage.getItem('panier')))
        
        window.location.href = "../index.html"
    
    })

});

function displayOptions(options, spec){
    
    let select = '';

    options.forEach((option) => {
        select += '<option value="'+ option +'">' + option + '</option>';
    })

    document.querySelector('#products-select').innerHTML = select
    document.querySelector('#products-select-label').textContent = spec
}