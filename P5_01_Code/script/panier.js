/* Affichage du panier */
function displayPanier(){
    
    document.querySelector('#panier-total').textContent = '0,00 €'
    
    let panier = JSON.parse(localStorage.getItem('panier'))
    let panierTotal = 0;

    panier.forEach( (product, key) => {

        fetch('http://localhost:3000/api/' + product.cat + '/' + product.ref)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let newRow = document.createElement('tr')
            newRow.setAttribute('id', 'panier-produit-'+ key)
            newRow.innerHTML = '<td>' + data.name + '</td>' + '<td>' + product.spec + '</td>' + '<td>' + product.qtt + '</td>' + '<td>' + parseFloat(data.price).toFixed(2) + ' €</td>' + '<td>' + parseFloat(data.price*product.qtt).toFixed(2) + ' €</td><td class="panier-delete" style="cursor: pointer;" data-delete="'+ key +'">X</td>' 
            
            newRow.addEventListener('click', () => {
                panier.splice(key, 1)
                localStorage.setItem('panier', JSON.stringify(panier))
                document.querySelector('#panier').innerHTML = ''
                displayPanier()
            })
    
            document.querySelector('#panier').appendChild(newRow)
    
            panierTotal += data.price*product.qtt
            document.querySelector('#panier-total').textContent = parseFloat(panierTotal).toFixed(2) + " €"
        })  
    
    });
}

displayPanier()

/* Soumission du formulaire */

document.querySelector('.needs-validation').addEventListener('submit', function (event) {
    event.preventDefault()
    event.stopPropagation()

    let panier = JSON.parse(localStorage.getItem('panier'))

    let contact = {
                 firstName: document.querySelector('#form-firstName').value,
                 lastName: document.querySelector('#form-lastName').value,
                 address: document.querySelector('#form-address').value,
                 city: document.querySelector('#form-city').value,
                 email: document.querySelector('#form-email').value,
            };

    let products = []
    panier.forEach((product) => {
        products.push(product.ref)
    })

    fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({products, contact})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('commande', data.orderId)
            localStorage.setItem('total', document.querySelector('#panier-total').textContent)
            window.location.href = "./confirmation.html"
        })

})