
const divSupplies = document.getElementById('supplies'); // obtengo el tag div
// Función para desplegar cursos al usuario
function showSupplies(supplies) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    supplies.forEach(c => {
        // creo un objeto de tipo artículo
        const supplyElement = document.createElement('article');
        // defino el id del articulo
        supplyElement.dataset.id = c.id;
        // cargo el contenido
        supplyElement.innerHTML = `
                    <img class="images" src="${c.img}">
                    <h3>${c.name}</h3>
                    <h3>Cantidad disponible: ${c.existence}</h3>
                    <button class="details-button">Ver detalles</button>
                    <button class="modify-button">Modificar</button>
                    <button class="delete-button">Eliminar movimientos</button>
                    <br><hr>
                    `;
        fragment.appendChild(supplyElement); // agrego o concateno los elementos (curso)
    });
    divSupplies.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}

// Función para mostrar error al usuario
function showError(message) {
    document.getElementById('supplies').innerHTML = message;
}

// Función para eliminar un curso
function deleteSupplies(context) {
    divSupplies.removeChild(context.node);
}

// Agrego el evento a cada botón de borrar con la clase delete-button
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
        } else if (e.target.classList.contains('requisitions-button')) {
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


// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); // Llamo la función
});

