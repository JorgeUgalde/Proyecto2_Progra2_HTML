
// details
function details(supply) {
    window.alert(`${supply.name} Detalles`);
    window.location.replace('supplies.html');
}

// show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Show the details of the supply
const divSupply = document.getElementById('supply'); 
function showRequisition(supply) {
    const fragment = document.createDocumentFragment();
    const supplyElement = document.createElement('article');
    supplyElement.dataset.id = supply.id;
    supplyElement.innerHTML = `
                    <h2>Prenda: ${supply.name}</h3>
                    <h3>Cantidad disponible: ${supply.existence}
                    <br>Id: ${supply.id}
                    <br>Movimientos:
                    </h3>
                    `;
    fragment.appendChild(supplyElement);
    supply.movements.forEach(m => {
        const movement = document.createElement('article');
        movement.dataset.id = `${supply.id}-${m.movementCode}`
        let movementType;
        if (parseInt(m.type) === 2) {
            movementType = "Requisicion";
        }else{
            movementType = "Orden";
        } 
        movement.innerHTML = `
                    <h5>Tipo: ${movementType}<br>Codigo: ${m.movementCode}<br>Cantidad: ${m.movementQuantity}</h5>
                    `;
        fragment.appendChild(movement); // agrego o concateno los elementos (curso)
    });
    divSupply.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}



//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Load the the information of the supply
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showRequisition,
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