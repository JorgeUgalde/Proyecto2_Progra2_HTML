// Función ejecutar solicitud, recibe:
//   method: verbo get, post, put, delete
//   url: dirección donde está recurso http://localhost:3000/api/courses
//   handleOk: ejecute función cuando está correcto
//   handleError: ejecute función cuando da error
//   data: body del verbo
//   context: podemos enviar parte de la página
function executeRequest(method, url, handleOk, handleError, data, context) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url); // llamo al método get de /api/courses
    xhr.responseType = 'json'; // Establezco el tipo de respuesta como Json

    // Agrego un evento para la carga de la página
    xhr.addEventListener('load', () => {
        //console.log(xhr.status);

        // Si el status es mayor a 200 y menor a 299, fue exitoso
        if (xhr.status >= 200 && xhr.status <= 299) {
            if (context) {
                handleOk({ ...xhr.response, ...context });
            } else {
                handleOk(xhr.response);
            }
        } else {
            handleError(`Error: ${xhr.status}, el recurso no se ha encontrado`);
        }
    });

    // Agrego un evento para cuando genera error
    xhr.addEventListener('error', () => {
        handleError(`Error: página no encontrada`);
    });

    // Si llegan datos en la invocación se definen como json y se adjuntan al envío
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(data);
    } else {
        xhr.send(); // Envío la respuesta
    }
}