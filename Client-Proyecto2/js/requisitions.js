
// Show the requisitions to the user
const divRequisitions = document.getElementById('requisitions'); 
function showRequisitions(requisitions) {
    const fragment = document.createDocumentFragment();
    requisitions.forEach(c => {
        const requisitionElement = document.createElement('article');
        requisitionElement.dataset.id = c.numberReq;
        requisitionElement.innerHTML = `
                    <h3>Numero de requisicion: ${c.numberReq}
                    <br>fecha de requisicion: ${c.date}</h3>
                    <button class="details-button">Ver detalle</button>`;
        fragment.appendChild(requisitionElement); 
    });
    divRequisitions.appendChild(fragment); 
}

//Show Error
function showError(message) {
    document.getElementById('requisitions').innerHTML = message;
}

//Add a click event of the details button and redirects the user to the requisitionDetails page
divRequisitions.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('details-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `requisitionDetails.html?id=${id}`;
        }
    }
});
//Add a click event of the new requisition button and redirects the user to the newRequisition page
document.getElementById('new-requisition').onclick = () => {
    location.href = 'newRequisition.html';
};

// Load the the requisitions
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/requisitions',
        showRequisitions,
        showError); // Llamo la función
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
            location.href = `requisitions.html`;
        } else if (e.target.classList.contains('orders-button')) {
            location.href = `orders.html`;
        } else if (e.target.classList.contains('supplies-button')) {
            location.href = `supplies.html`;
        }
    }
});