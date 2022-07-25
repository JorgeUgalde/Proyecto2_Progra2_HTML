// New Supply
function newSupply(supply) {
    window.alert(`${supply.name} agregado correctamente`);
    window.location.replace('supplies.html');
}

// show error
function showError(message) {
    document.getElementById('responseText').innerHTML = message;
}

//Add a click event of the add button, get the value of the name and url and execute the post request 
document.getElementById('add-button').onclick = function () {
    // Obtengo información del campo de entrada txt-name
    const name = document.getElementById('txt-name').value;
    const url = document.getElementById('url-image').value;

    const data = JSON.stringify({
        "name": name, "img": url
    });
    console.log(data);
    executeRequest(
        'post',
        'http://localhost:3000/api/supplies',
        newSupply,
        showError,
        data
    );
};

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

//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

