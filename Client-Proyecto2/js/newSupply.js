// Función para agregar curso
function newSupply(supply) {
    window.alert(`${supply.name} agregado correctamente`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

// Agrego el evento onclick al botón con el id add-button
document.getElementById('add-button').onclick = function () {
    // Obtengo información del campo de entrada txt-name
    const name = document.getElementById('txt-name').value;
    // Creo la solicitud para el post en formato JSON
    const data = `{ "name": "${name}" }`;
    // Ejecuto el método post
    executeRequest(
        'post',
        'http://localhost:3000/api/supplies',
        newSupply,
        showError,
        data
    );
};

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

