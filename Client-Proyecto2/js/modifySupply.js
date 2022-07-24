// Función para modificar curso
function modifySupply(supply) {
    window.alert(`${supply.name} modifcado correctamente`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Función para cargar datos del curso
function showSupply(supply) {
    document.getElementById('id').value = supply.id;
    document.getElementById('txt-name').value = supply.name;
}

// Agrego el evento onclick al botón con el id modify-button
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
        `http://127.0.0.1:3000/api/supplies/${id}`,
        showSupply,
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