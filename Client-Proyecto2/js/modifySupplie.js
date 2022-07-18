// Función para modificar curso
function modifySupply(supplie) {
    window.alert(`${supplie.name} modifcado correctamente`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Función para cargar datos del curso
function showSupplie(supplie) {
    document.getElementById('id').value = supplie.id;
    document.getElementById('txt-name').value = supplie.name;
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
        showSupplie,
        showError); // Llamo la función
});