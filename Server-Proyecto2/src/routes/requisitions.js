const { Router } = require("express");
const router = Router();
module.exports = router;
const Joi = require('joi'); 
const fs = require('fs');
const supplies = require('./supplies.js');

const requisitionsPath = './data/requisitions.json';
let requisitionsData;

//read the especific file
function readRequisitionsFile(resp) {
    let fileData;
    try {
        fileData = fs.readFileSync(requisitionsPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    try {
        requisitionsData = JSON.parse(fileData);
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
    readRequisitionsFile(resp);
    if (requisitionsData) {
        resp.send(requisitionsData.requisitions);
    }
});

//return only the information of the respect element
router.get('/:numberReq', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const requisition = requisitionsData.requisitions.find(r => r.numberReq === parseInt(req.params.numberReq));
        if (!requisition) return resp.status(404).send(`Codigo ${req.params.numberReq} no existe)`);
        resp.send(requisition);
    }
});

//return only the products of the respect element
router.get('/:numberReq/products', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const requisition = requisitionsData.requisitions.find(r => r.numberReq === parseInt(req.params.numberReq));
        if (!requisition) return resp.status(404).send(`Codigo ${req.params.numberReq} no existe)`);
        resp.send(requisition.productsRequested);
    }
});


// add a element at the respect file
router.post('/', (req, resp) => {
    readRequisitionsFile(resp);
    if (requisitionsData) {
        const schema = Joi.object({
            products: Joi.array().default([]).required()

        });
        const result = schema.validate(req.body);
        if (result.error) return resp.status(400).send(result.error.details[0].message);

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