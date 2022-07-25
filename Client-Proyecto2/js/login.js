// details of the user
function details(user) {
    window.alert(`${user.email} Detalles`);
    window.location.replace('supplies.html');
}

// show error
function showError(message) {
    alert(message);
}

// if the login is correct the user is redirected to the supplies page
function handleLogin(resp) {
    window.location.replace('/web/supplies.html');

};

// gets the information wirted by the user and execute the login request
document.getElementById('login-button').onclick = function () {
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
    executeRequest(
        'post',
        'http://localhost:3000/api/login',
        handleLogin,
        showError,
        data
    );

};

// Add event listener to the register button, redirects the user to the register page
document.getElementById('register-button').onclick = function () {
    location.href = './web/register.html';
};
