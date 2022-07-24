

function details(supply) {
    window.alert(`${supply.name} Detalles`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

const divSupply = document.getElementById('supply'); // obtengo el tag div
// Función para desplegar cursos al usuario
function showRequisition(supply) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    const supplyElement = document.createElement('article');
    // defino el id del articulo
    supplyElement.dataset.id = supply.id;
    // cargo el contenido
    supplyElement.innerHTML = `
                    <h2>Prenda: ${supply.name}</h3>
                    <h3>Cantidad disponible: ${supply.existence}
                    <br>Id: ${supply.id}
                    <br>Movimientos:
                    </h3>
                    `;
    fragment.appendChild(supplyElement); // agrego o concateno los elementos (curso)
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



// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Agrego un evento para la carga de la página que recupere y llene los datos del curso
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showRequisition,
        showError); // Llamo la función
});


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