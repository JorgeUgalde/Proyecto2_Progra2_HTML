// Genera un objeto Router para el manejo de las rutas
const { Router } = require("express");
// Inicializa el Router
const router = Router();

// exporto el objeto router con sus verbos (get, post, put, delete)
module.exports = router;

// Importa el módulo joi
const Joi = require('joi'); // En mayúscula porque retorna una clase
// Importa el módulo fs
const fs = require('fs')

/* requisitions  */
const loginPath = './data/users.json';
let loginData;

// método para escritura
function fileWriter(loginPath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(loginPath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}


function readUsersFile(resp) {
    // Cargamos los datos del archivo
    let fileData;
    try {
        fileData = fs.readFileSync(loginPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    // Convertimos los datos en objeto
    try {
        loginData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}


router.post('/', (req, resp) => {
    readUsersFile(resp);
    if (loginData) {
        const { error } = validateUser(req.body);
        if (error) return resp.status(400).send(error.details[0].message);
       

        const user = loginData.users.find(u => {
            return u.email === req.body.email && u.password === req.body.password 
        })
        if (!user) return resp.status(404).send(`Credenciales incorrecto`);

       
        resp.send({"email" : user.email});
    }
});



function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(user);
}
