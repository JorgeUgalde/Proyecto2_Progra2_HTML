// details of the movements
function details() {
    window.alert('Movimientos eliminados');
    window.location.replace('supplies.html');
}
let id;
// show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Show the movements of the supply
const divMovements = document.getElementById('movements'); // obtengo el tag div
function showMovements(supply) {
    id = supply.id;
    const fragment = document.createDocumentFragment();
    supply.movements.forEach(m => {
        const movement = document.createElement('article');
        movement.dataset.id = `${supply.id}-${m.movementCode}`
        movement.innerHTML = `
                    <h5>Tipo: ${m.type}<br>Codigo: ${m.movementCode}<br>Cantidad: ${m.movementQuantity}</h5>
                    `;
        fragment.appendChild(movement); // agrego o concateno los elementos (curso)
    });
    divMovements.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}

//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

//Add a click event of the delete button and delete the movements of the supply
document.getElementById('delete-button').onclick = () => {
    executeRequest(
        'delete',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        details,
        showError); 

};


// Load the the information of the supply
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showMovements,
        showError);
});

// add event listener for the header, if user press a botton
const divHeader = document.getElementById("header");
divHeader.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('requisitions-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `requisitions.html`;
        } else if (e.target.classList.contains('orders-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `orders.html`;
        } else if (e.target.classList.contains('supplies-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `supplies.html`;
        }
    }
});