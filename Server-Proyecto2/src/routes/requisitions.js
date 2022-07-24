// Genera un objeto Router para el manejo de las rutas
const { Router } = require("express");
// Inicializa el Router
const router = Router();

// exporto el objeto router con sus verbos (get, post, put, delete)
module.exports = router;

// Importa el módulo joi
const Joi = require('joi'); // En mayúscula porque retorna una clase
// Importa el módulo fs
const fs = require('fs');
const supplies = require('./supplies.js');

/* requisitions  */
const requisitionsPath = './data/requisitions.json';
let requisitionsData;


function readRequisitionsFile(resp) {
    // Cargamos los datos del archivo
    let fileData;
    try {
        fileData = fs.readFileSync(requisitionsPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    // Convertimos los datos en objeto
    try {
        requisitionsData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

// método para escritura
function writeRequisitionsFile(filePath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(filePath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}

//Metodo para escribir archivo, se reutiliza el del inventario al recibir path y data
router.get('/', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        resp.send(requisitionsData.requisitions);
    }
});


router.get('/:numberReq', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const requisition = requisitionsData.requisitions.find(r => r.numberReq === parseInt(req.params.numberReq));
        if (!requisition) return resp.status(404).send(`Codigo ${req.params.numberReq} no existe)`);
        resp.send(requisition);
    }
});

// get requisitions id/ productos
router.get('/:numberReq/products', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const requisition = requisitionsData.requisitions.find(r => r.numberReq === parseInt(req.params.numberReq));
        if (!requisition) return resp.status(404).send(`Codigo ${req.params.numberReq} no existe)`);
        resp.send(requisition.productsRequested);
    }
});


router.post('/', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const schema = Joi.object({
            products: Joi.array().default([]).required()

        });
        const result = schema.validate(req.body);
        if (result.error) return resp.status(400).send(result.error.details[0].message);

        //fecha
        const date = new Date();
        const index = requisitionsData.requisitions.length;
        const requisition = {
            numberReq: index + 1,
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            productsRequested: req.body.products
        }

        if (supplies.removeProducts(resp, requisition.numberReq, requisition.productsRequested)) {
            requisitionsData.requisitions[index] = requisition;
            writeRequisitionsFile(requisitionsPath, requisitionsData);
            resp.send(requisition);
        }
    }
});