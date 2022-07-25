
//Details
function details(requisition) {
    window.alert(`${requisition.name} Detalles`);
    window.location.replace('supplies.html');
}

// Show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Show the requisition details
const divRequisition = document.getElementById('requisitionDetails'); // obtengo el tag div
function showRequisition(requisition) {
    const fragment = document.createDocumentFragment();
    const requisitionElement = document.createElement('article');
    requisitionElement.dataset.id = requisition.numberReq;
    requisitionElement.innerHTML = `
                    <h2>Number de requisicion: ${requisition.numberReq}</h3>
                    <h3>Fecha: ${requisition.date}
                    <br>Productos:
                    </h3>
                    `;
    fragment.appendChild(requisitionElement); 
    requisition.productsRequested.forEach(m => {
        const product = document.createElement('article');
        product.dataset.id = `${requisition.numberReq}-${m.id}`
        product.innerHTML = `
                    <h5>ID: ${m.id}<br>Unidades: ${m.units}</h5>
                    `;
        fragment.appendChild(product); 
    });
    divRequisition.appendChild(fragment); 
}


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

// Load the the information of the requisition 
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/requisitions/${id}`,
        showRequisition,
        showError); // Llamo la función
});