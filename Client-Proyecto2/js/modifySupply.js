//Modify supply
function modifySupply(supply) {
    window.alert(`${supply.name} modifcado correctamente`);
    window.location.replace('supplies.html');
}

// show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

//Show the id and name of the supply
function showSupply(supply) {
    document.getElementById('id').value = supply.id;
    document.getElementById('txt-name').value = supply.name;
}

// Add a click event of the back button for modify supply and execute the modify request
document.getElementById('modify-button').onclick = () => {
    const id = document.getElementById('id').value;
    const name = document.getElementById('txt-name').value;
    const data = `{ "name": "${name}"}`;
    executeRequest(
        'put',
        `http://localhost:3000/api/supplies/${id}`,
        modifySupply,
        showError,
        data
    )
}

// add a click event on the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Load the the information of the supply
document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    executeRequest(
        'get',
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showSupply,
        showError); 
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