
// Show the supplies to the user
const divSupplies = document.getElementById('supplies'); 
function showSupplies(supplies) {
    const fragment = document.createDocumentFragment();
    supplies.forEach(c => {
        const supplyElement = document.createElement('article');
        supplyElement.dataset.id = c.id;
        supplyElement.innerHTML = `
                    <img class="images" src="${c.img}">
                    <h3>${c.name}</h3>
                    <h3>Cantidad disponible: ${c.existence}</h3>
                    <button class="details-button">Ver detalles</button>
                    <button class="modify-button">Modificar</button>
                    <button class="delete-button">Eliminar movimientos</button>
                    <br><hr>
                    `;
        fragment.appendChild(supplyElement); 
    });
    divSupplies.appendChild(fragment); 
}

//Show error
function showError(message) {
    document.getElementById('supplies').innerHTML = message;
}

// add event listener for the divSupplies, if user press a botton
divSupplies.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `deleteMovements.html?id=${id}`;
        } else if (e.target.classList.contains('modify-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `modifySupply.html?id=${id}`;
        } else if (e.target.classList.contains('details-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `details.html?id=${id}`;
        } 
    }
});


//Add a click event of the new button and redirects to the newSupply page
document.getElementById('new-button').onclick = () => {
    location.href = `newSupply.html`;
}


// add event listener for the header, if user press a botton
const divHeader = document.getElementById("header");
divHeader.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('requisitions-button')) {
            location.href = `requisitions.html`;
        } else if (e.target.classList.contains('orders-button')) {
            location.href = `orders.html`;
        } else if (e.target.classList.contains('supplies-button')) {
            location.href = `supplies.html`;
        }
    }
});


// Load the the information of the supplies
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); 
});

