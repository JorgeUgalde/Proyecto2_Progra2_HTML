// new requisition
function newRequisition(response) {
        window.alert(`${response.numberReq} agregado correctamente`);
        window.location.replace('supplies.html');
}

// Show the available supplies to make a requisition
const divSupplies = document.getElementById('supplies'); // obtengo el tag div
function showSupplies(supplies) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    supplies.forEach(c => {
        if (parseInt(c.existence) > 0) {
            const supplieElement = document.createElement('article');
            supplieElement.dataset.id = c.id;
            supplieElement.innerHTML = `
        <input class="checkBoxElements" type="checkbox">
        Prenda: ${c.name}
        <input class='existence'type="number" value="1" min="1" max='${c.existence}'>
        `;
            fragment.appendChild(supplieElement); 
        }
    });
    divSupplies.appendChild(fragment);
}

// show error
function showError(message) {
    document.getElementById('supplies').innerHTML = message;
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

// get the selected items and the quantity value of the requisition
function getSelectedElements() {
    const elements = document.getElementsByClassName("checkBoxElements");
    const productsRequest = [];
    if (elements.length > 0) {
        const array = Array.from(elements);
        array.forEach(e => {
            if (e.checked) {
                const node = e.parentNode;
                const id = node.dataset.id;
                const value = node.childNodes[3].value;
                const element = {
                    "id": id,
                    "units": value
                };
                productsRequest.push(element);
            }
        });
    }
    return productsRequest;
}

//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

//Add a click event of the create button and execute the post request
document.getElementById('create-button').onclick = function () {
    const data = JSON.stringify({
        "products": getSelectedElements()
    });
    executeRequest(
        'post',
        'http://127.0.0.1:3000/api/requisitions',
        newRequisition,
        showError,
        data
    );
};

// Load the the information of the supplies
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); // Llamo la función
});