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

// Agrego el evento a cada botón de borrar con la clase delete-button
divSupplies.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.parentNode.dataset.id;

            executeRequest(
                'delete',
                `http://localhost:3000/api/supplies/${id}`,
                deleteSupplies,
                showError,
                null,
                {
                    node: e.target.parentNode
                }
            );
        } else if (e.target.classList.contains('modify-button')) {
            const id = e.target.parentNode.dataset.id;
            location.href = `modify_supplies.html?id=${id}`;
        }
    }
});

// Agrego el evento click al botón con el id new-button
document.getElementById('new-button').onclick = () => {
    location.href = 'new_supplies.html';
};

// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); // Llamo la función
});