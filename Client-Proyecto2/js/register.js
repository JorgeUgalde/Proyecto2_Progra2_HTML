
// Función para mostrar error
function showError(message) {
    alert(message);
}

function handleLogin(resp) {
    console.log(resp);
    window.location.replace('../index.html');

};


// Agrego el evento onclick al botón con el id add-button
document.getElementById('register-button').onclick = function () {
    // Obtengo información del campo de entrada txt-name
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "" && password === "") {
        showError("Ingrese datos validos");
        return;
    }
    const data = JSON.stringify({
        "email": email,
        "password": password,
    });

    // Ejecuto el método post
    executeRequest(
        'post',
        'http://localhost:3000/api/register',
        handleLogin,
        showError,
        data
    );

};


// Agrego el evento onclick al botón con el id back-button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}
