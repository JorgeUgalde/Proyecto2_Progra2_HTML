const { Router } = require("express");
const router = Router();

module.exports = router;

const Joi = require('joi');
const fs = require('fs')
const supplies = require('./supplies.js');


const ordersPath = './data/orders.json';
let ordersData;

//read the especific file
function readOrdersFile(resp) {
    let fileData;
    try {
        fileData = fs.readFileSync(ordersPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    try {
        ordersData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

// write at the specific file
function writeRequisitionsFile(filePath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(filePath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}

//return all the information of the respect file
router.get('/', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        resp.send(ordersData.orders);
    }
});


//return only the information of the respect order
router.get('/:numberOrd', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        const order = ordersData.orders.find(o => o.numberOrd === parseInt(req.params.numberOrd));
        if (!order) return resp.status(404).send(`Codigo ${req.params.numberOrd} no existe)`);
        resp.send(order);
    }
});

//return only the products of the respect element
router.get('/:numberOrd/products', (req, resp) => {
    readOrdersFile(resp);
    if (ordersData) {
        const order = ordersData.orders.find(o => o.numberOrd === parseInt(req.params.numberOrd));
        if (!order) return resp.status(404).send(`Codigo ${req.params.numberOrd} no existe)`);
        resp.send(order.productsOrdered);
    }
});


// add a element at the respect file
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
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            purchased: req.body.products
        }
        if (supplies.addProducts(resp, order.numberOrd, order.purchased)) {
            ordersData.orders[index] = order;
            writeRequisitionsFile(ordersPath, ordersData);
            resp.send(order);
        }
    }
});

