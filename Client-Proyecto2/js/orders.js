const divOrders = document.getElementById('orders'); // obtengo el tag div

// Función para desplegar cursos al usuario
function showOrders(orders) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    orders.forEach(c => {
        // creo un objeto de tipo artículo
        const orderElement = document.createElement('article');
        // defino el id del articulo
        orderElement.dataset.id = c.numberOrd;
        // cargo el contenido
        orderElement.innerHTML = `
                    <h3>Numero de orden: ${c.numberOrd}
                    <br>fecha de orden: ${c.date}</h3>
                    <button class="details-button">Ver detalle</button>`;
        fragment.appendChild(orderElement); // agrego o concateno los elementos (curso)
    });
    divOrders.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}

// Función para mostrar error al usuario
function showError(message) {
    document.getElementById('orders').innerHTML = message;
}


// Agrego el evento a cada botón de borrar con la clase delete-button
divOrders.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('details-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `orderDetails.html?id=${id}`;
        }
    }
});

// Agrego el evento click al botón con el id new-button
document.getElementById('new-order').onclick = () => {
    location.href = 'newOrder.html';
};

// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/orders',
        showOrders,
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

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}