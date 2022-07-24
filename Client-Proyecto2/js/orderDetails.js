function details(order) {
    window.alert(`${order.numberOrd} Detalles`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

const divOrder = document.getElementById('orderDetails'); // obtengo el tag div
// Función para desplegar cursos al usuario
function showOrder(order) {
    // creo un fragmento
    const fragment = document.createDocumentFragment(); 
    const orderElement = document.createElement('article');
    // defino el id del articulo
    orderElement.dataset.id = order.numberOrd;
    // cargo el contenido
    orderElement.innerHTML = `
                    <h2>Number de orden: ${order.numberOrd}</h3>
                    <h3>Fecha: ${order.date}
                    <br>Productos:
                    </h3>
                    `;
    fragment.appendChild(orderElement); // agrego o concateno los elementos (curso)
    order.purchased.forEach(m => {
        const product = document.createElement('article');
        product.dataset.id = `${order.numberOrd}-${m.id}`
        product.innerHTML = `
                    <h5>ID: ${m.id}<br>Unidades: ${m.units}</h5>
                    `;
        fragment.appendChild(product); // agrego o concateno los elementos (curso)
    });
    divOrder.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
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
        `http://127.0.0.1:3000/api/orders/${id}`,
        showOrder,
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