
// Show error
function showError(message) {
    alert(message);
}

//If the register is correct redirects the user to the login page
function handleLogin(resp) {
    window.location.replace('../index.html');

};


// Add a click event of the register button and get the email and password, then execute the post request
document.getElementById('register-button').onclick = function () {
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
    executeRequest(
        'post',
        'http://localhost:3000/api/register',
        handleLogin,
        showError,
        data
    );
};

//Add a click event of the back button
document.getElementById('back-button').onclick = () => {
    history.go(-1);
}

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
