

function details(requisition) {
    window.alert(`${requisition.name} Detalles`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

function showSupply(supply) {
    // creo un fragmento
   document.getElementById('requisition').value = supply.id;
   document.getElementById('requisition').value = supply.name;
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
        `http://127.0.0.1:3000/api/requisitions/${id}`,
        showSupply,
        showError); // Llamo la función
});