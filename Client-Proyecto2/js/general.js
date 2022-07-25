
// execute the request send by the user
function executeRequest(method, url, handleOk, handleError, data, context) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
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
    xhr.addEventListener('error', () => {
        handleError(`Error: página no encontrada`);
    });
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(data);
    } else {
        xhr.send();
    }
}