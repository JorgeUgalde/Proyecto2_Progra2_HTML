function newSupply(response) {
    window.alert(`${response.numberOrd} agregado correctamente`);
    window.location.replace('supplies.html');
}

const divSupplies = document.getElementById('supplies'); // obtengo el tag div

// Función para desplegar cursos al usuario
function showSupplies(supplies) {
    // creo un fragmento
    const fragment = document.createDocumentFragment();
    // recorre la respuesta
    supplies.forEach(c => {
        if (parseInt(c.existence) > 0) {
            // creo un objeto de tipo artículo
            const supplieElement = document.createElement('article');
            // defino el id del articulo
            supplieElement.dataset.id = c.id;
            // cargo el contenido
            supplieElement.innerHTML = `
            <input class="checkBoxElements" type="checkbox">
            Prenda: ${c.name}
            <input class='existence'type="number" value="1" min="1" '>
            `;
            fragment.appendChild(supplieElement); // agrego o concateno los elementos (curso)
        }
    });
    divSupplies.appendChild(fragment); // cargo la lista de cursos (fragment) en el div
}
/* setear clase checkBox,  */
// Función para mostrar error al usuario
function showError(message) {
    document.getElementById('supplies').innerHTML = message;
}

function getSelectedElements() {
    const elements = document.getElementsByClassName("checkBoxElements");
    const purchased = [];
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
                purchased.push(element);
            }
        });
    }
    return purchased;
}

// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

// Agrego el evento onclick al botón con el id add-button
document.getElementById('create-button').onclick = function () {
    // Ejecuto el método post
    const data = JSON.stringify({
        "products": getSelectedElements()
    });
    console.log(data);
    executeRequest(
        'post',
        'http://127.0.0.1:3000/api/orders',
        newSupply,
        showError,
        data
    );
};

// Agrego un evento para la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    executeRequest(
        'get',
        'http://127.0.0.1:3000/api/supplies',
        showSupplies,
        showError); // Llamo la función
});