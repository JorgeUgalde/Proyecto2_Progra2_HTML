const { Router } = require("express");
const router = Router();
module.exports = router;
const Joi = require('joi'); // En mayúscula porque retorna una clase
const fs = require('fs')

const registerPath = './data/users.json';
let registerData;

// write at the specific file
function fileWriter(registerPath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(registerPath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}

//read the especific file
function readUsersFile(resp) {
    let fileData;
    try {
        fileData = fs.readFileSync(registerPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    try {
        registerData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

// add a user account at the sistem
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


// validate if the user email and passwords are correct
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(user);
}
