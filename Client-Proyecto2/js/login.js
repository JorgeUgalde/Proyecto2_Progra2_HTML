
function details(user) {
    window.alert(`${user.email} Detalles`);
    window.location.replace('supplies.html');
}

// Función para mostrar error
function showError(message) {
    alert(message);
}

function handleLogin(resp) {
    console.log(resp);
    window.location.replace('/web/supplies.html');

};


// Agrego el evento onclick al botón con el id add-button
document.getElementById('login-button').onclick = function () {
    // Obtengo información del campo de entrada txt-name
    const email = document.getElementById('email').value;
    const passsword = document.getElementById('password').value;

    if (email === "" && passsword === "") {
        showError("Ingrese datos validos");
        return;
    }

    const data = JSON.stringify({
        "email": email,
        "password": passsword,
    });

    // Ejecuto el método post
    executeRequest(
        'post',
        'http://localhost:3000/api/login',
        handleLogin,
        showError,
        data
    );

};

// Agrego el evento onclick al botón con el id add-button
document.getElementById('register-button').onclick = function () {
    location.href = './web/register.html';
};


// Agrego un evento para la carga de la página que recupere y llene los da