const divRequisitions = document.getElementById('requisitions'); // obtengo el tag div

// Función para desplegar cursos al usuario
function showRequisitions(requisitions) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    requisitions.forEach(c => {
        // creo un objeto de tipo artículo
        const requisitionElement = document.createElement('article');
        // defino el id del articulo
        requisitionElement.dataset.id = c.numberReq;
        // cargo el contenido
        requisitionElement.innerHTML = `
                    <h3>Numero de requisicion: ${c.numberReq}
                    <br>fecha de requisicion: ${c.date}</h3>
                    <button class="details-button">Ver detalle</button>`;
        fragment.appendChild(requisitionElement); // agrego o concateno los elementos (curso)
    });
    divRequisitions.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}

// Función para mostrar error al usuario
function showError(message) {
    document.getElementById('requisitions').innerHTML = message;
}

// Función para eliminar un curso
function deleteRequisition(context) {
    divRequisitions.removeChild(context.node);
}

// Agrego el evento a cada botón de borrar con la clase delete-button
divRequisitions.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('details-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `requisitionDetails.html?id=${id}`;
        }
    }
});

// Agrego el evento click al botón con el id new-button
document.getElementById('new-requisition').onclick = () => {
    location.href = 'newRequisition.html';
};

// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/requisitions',
        showRequisitions,
        showError); // Llamo la función
});

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}
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