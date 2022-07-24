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
const registerPath = './data/users.json';
let registerData;

// método para escritura
function fileWriter(registerPath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(registerPath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}


function readUsersFile(resp) {
    // Cargamos los datos del archivo
    let fileData;
    try {
        fileData = fs.readFileSync(registerPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    // Convertimos los datos en objeto
    try {
        registerData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

router.post('/', (req, resp) => {
    readUsersFile(resp);
    if (registerData) {
        console.log(registerData);

        const { error } = validateUser(req.body);
        if (error) return resp.status(400).send(error.details[0].message);

        const userExist = registerData.users.find(u => {
            return u.email === req.body.email
        })
        if (userExist) return resp.status(400).send(`Este usuario ya esta registrado`);
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        registerData.users.push(user);
        fileWriter(registerPath, registerData);
        resp.send(user.email);
    }
});



function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(user);
}
