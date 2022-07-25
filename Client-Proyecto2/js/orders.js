
// Show the orders to user
const divOrders = document.getElementById('orders'); 
function showOrders(orders) {
    const fragment = document.createDocumentFragment();
    orders.forEach(c => {
        const orderElement = document.createElement('article');
        orderElement.dataset.id = c.numberOrd;
        orderElement.innerHTML = `
                    <h3>Numero de orden: ${c.numberOrd}
                    <br>fecha de orden: ${c.date}</h3>
                    <button class="details-button">Ver detalle</button>`;
        fragment.appendChild(orderElement); 
    });
    divOrders.appendChild(fragment); 
}

//Show error
function showError(message) {
    document.getElementById('orders').innerHTML = message;
}

//Add a click event of the details button and redirect to orderDetails page
divOrders.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('details-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `orderDetails.html?id=${id}`;
        }
    }
});

//Add a click event of the new order button and redirect to newOrder page
document.getElementById('new-order').onclick = () => {
    location.href = 'newOrder.html';
};

// Load the the information of the orders
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/orders',
        showOrders,
        showError);
});

//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

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

