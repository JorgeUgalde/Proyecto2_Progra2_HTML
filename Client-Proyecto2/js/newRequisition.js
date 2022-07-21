const divSupplies = document.getElementById('supplies'); // obtengo el tag div

// Función para desplegar cursos al usuario
function showSupplies(supplies) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    supplies.forEach(c => {
        // creo un objeto de tipo artículo
        const supplieElement = document.createElement('article');
        // defino el id del articulo
        supplieElement.dataset.id = c.id;
        // cargo el contenido
        supplieElement.innerHTML = `
                    <h3>${c.name}</h3>
                    <button class="details-button">Ver detalles</button>
                    <button class="modify-button">Modificar</button>
                    <button class="delete-button">Eliminar</button>
                    `;
        fragment.appendChild(supplieElement); // agrego o concateno los elementos (curso)
    });
    divSupplies.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}

// Función para mostrar error al usuario
function showError(message) {
    document.getElementById('supplies').innerHTML = message;
}

// Función para eliminar un curso
function deleteSupplies(context) {
    divSupplies.removeChild(context.node);
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
        'http://localhost:3000/api/requisitions',
        newSupply,
        showError,
        data
    );
};

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); // Llamo la función
});