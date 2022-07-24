

function details() {
    window.alert('Movimientos eliminados');
    window.location.replace('supplies.html');
}
let id;
// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

const divMovements = document.getElementById('movements'); // obtengo el tag div
// Función para desplegar cursos al usuario
function showMovements(supply) {
    id = supply.id;
    // creo un fragmento
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

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

document.getElementById('delete-button').onclick = () => {
    executeRequest(
        'delete',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        details,
        showError); // Llamo la función

};

// Función para eliminar un curso
function deleteMovements(context) {
    divMovements.removeChild(context.node);
}

// Agrego un evento para la carga de la página que recupere y llene los datos del curso
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showMovements,
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