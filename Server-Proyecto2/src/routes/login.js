const { Router } = require("express");
const router = Router();
module.exports = router;

const Joi = require('joi'); 
const fs = require('fs')

const loginPath = './data/users.json';
let loginData;

//read the especific file
function readUsersFile(resp) {
    let fileData;
    try {
        fileData = fs.readFileSync(loginPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    try {
        loginData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

// verify if the user credentias exist and are correct
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

// validate if the email and password are valids
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(user);
}
