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
const supplies = require('./supplies.js');


const ordersPath = './data/orders.json';
let ordersData;


function readOrdersFile(resp) {
    // Cargamos los datos del archivo
    let fileData;
    try {
        fileData = fs.readFileSync(ordersPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    // Convertimos los datos en objeto
    try {
        ordersData = JSON.parse(fileData);
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
    readOrdersFile(resp);
    if (ordersData) {
        resp.send(ordersData.orders);
    }
});


// get order number
router.get('/:numberOrd', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        const order = ordersData.orders.find(o => o.numberOrd === parseInt(req.params.numberOrd));
        if (!order) return resp.status(404).send(`Codigo ${req.params.numberOrd} no existe)`);
        resp.send(order);
    }
});

// get requisitions id/ productos
router.get('/api/orders/:numberOrd/products', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        const order = ordersData.orders.find(o => o.numberOrd === parseInt(req.params.numberOrd));
        if (!order) return resp.status(404).send(`Codigo ${req.params.numberOrd} no existe)`);
        resp.send(order.productsOrdered);
    }
});

router.post('/', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        const schema = Joi.object({
            products: Joi.array().default([]).required()

        });
        const result = schema.validate(req.body);
        if (result.error) return resp.status(400).send(result.error.details[0].message);
        //fecha
        const date = new Date();
        const index = ordersData.orders.length;

        const order = {
            numberOrd: index + 1,
            date: date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear(),
            purchased: req.body.products
        }
        if (supplies.addProducts(resp, order.numberOrd, order.purchased)) {
            ordersData.orders[index] = order;
            writeRequisitionsFile(ordersPath, ordersData);
            resp.send(order);
        }
    }
});

