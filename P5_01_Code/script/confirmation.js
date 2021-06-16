document.querySelector('#command-numero').textContent = localStorage.getItem('commande')
document.querySelector('#command-total').textContent = localStorage.getItem('total')
localStorage.clear()