function details(order) {
    window.alert(`${order.numberOrd} Detalles`);
    window.location.replace('supplies.html');
}

// Show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Show the order details
const divOrder = document.getElementById('orderDetails'); 
function showOrder(order) {
    const fragment = document.createDocumentFragment(); 
    const orderElement = document.createElement('article');
    orderElement.dataset.id = order.numberOrd;
    orderElement.innerHTML = `
                    <h2>Number de orden: ${order.numberOrd}</h3>
                    <h3>Fecha: ${order.date}
                    <br>Productos:
                    </h3>
                    `;
    fragment.appendChild(orderElement);
    order.purchased.forEach(m => {
        const product = document.createElement('article');
        product.dataset.id = `${order.numberOrd}-${m.id}`
        product.innerHTML = `
                    <h5>ID: ${m.id}<br>Unidades: ${m.units}</h5>
                    `;
        fragment.appendChild(product); 
    });
    divOrder.appendChild(fragment); 
}


//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Load the the information of the order
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