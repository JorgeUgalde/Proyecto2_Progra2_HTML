
const { Router } = require("express");
const router = Router();

module.exports = router;

const Joi = require('joi'); 
const fs = require('fs')
const suppliesPath = './data/supplies.json';
let suppliesData;

// write at the specific file
function fileWriter(filePath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(filePath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}

//read the especific file
function readSuppliesFile(resp) {
    let fileData;
    try {
        fileData = fs.readFileSync(suppliesPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    try {
        suppliesData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

//return all the information of the respect file
router.get('/', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        resp.send(suppliesData.supplies);
    }
});

//return only the information of the respect element
router.get('/:id', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Supply con id: ${req.params.id} no existe)`);
        resp.send(supply);
    }
});

//return only the movements of the respect element
router.get('/:id/movements', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Supply con id: ${req.params.id} no existe)`);
        resp.send(supply.movements);
    }
});


// add a element at the respect file
router.post('/', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        console.log(req.body)
        const { error } = validateSupply(req.body);
        if (error) return resp.status(400).send(error.details[0].message );

        const index = suppliesData.supplies.length;
        const supply = {
            id: index + 1,
            name: req.body.name,
            existence: 0,
            movements: [],
            img: req.body.img
        }
        suppliesData.supplies.push(supply);
        fileWriter(suppliesPath, suppliesData);
        resp.send(supply);
    }
});

//modify a especific element
router.put('/:id', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Codigo ${req.params.id} no existe)`);

        const { error } = validateSupply(req.body);
        if (error) return resp.status(400).send(error.details[0].message);

        supply.name = req.body.name;
        fileWriter(suppliesPath, suppliesData);
        resp.send(supply);
    }
});

//delete movementes of especific element
router.delete('/:id', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Codigo ${req.params.id} no existe`);

        supply.movements = [];

        fileWriter(suppliesPath, suppliesData);
        resp.send(supply);
    }
});

// validate the name and link of the img of the supply
function validateSupply(supply) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        img: Joi.string()
    });
    return schema.validate(supply);
}


// remove products of the especific element
module.exports.removeProducts = removeProducts;
function removeProducts(resp, numberReq, productsRequested) {
    readSuppliesFile(resp);
    let movement, product;
    for (let i = 0; i < productsRequested.length; i++) {
        product = suppliesData.supplies.find(p => p.id === parseInt(productsRequested[i].id));
        if (!product) {
            resp.status(404).send(`Codigo ${productsRequested[i].id} no existe`);
            return false;
        } else if (productsRequested[i].units < 1) {
            resp.status(400).send(`Debe indicar al menos una unidad del producto ${productsRequest[i].id}`);
            return false;
        } else if (product.units < productsRequested[i].units) {
            resp.status(400).send(`La cantidad de unidades ${product.units} existentes es menor a la solicitada
             ${productsRequested[i].units} para el producto ${product.id}`);
            return false;
        }
    }
    for (let i = 0; i < productsRequested.length; i++) {
        product = suppliesData.supplies.find(p => p.id ===  parseInt(productsRequested[i].id));
        movement = {
            type: 2, //type es requisition
            movementCode: numberReq,
            movementQuantity: productsRequested[i].units
        }
        product.movements.push(movement);
        product.existence -= productsRequested[i].units;

    }
    fileWriter(suppliesPath, suppliesData);
    return true;
}

// add products of the especific element
module.exports.addProducts = addProducts;
function addProducts(resp, numberOrd, productsOrdered) {
    let movement, product;
    for (let i = 0; i < productsOrdered.length; i++) {
        product = suppliesData.supplies.find(p => p.id ===  parseInt(productsOrdered[i].id));
        if (!product) {
            resp.status(404).send(`Codigo ${req.params.id} no existe)`);
            return false;
        } else if (productsOrdered[i].units < 1) {
            resp.status(400).send(`Debe indicar al menos una unidad del producto ${productsOrdered[i].id}`);
        }
    }

    for (let i = 0; i < productsOrdered.length; i++) {
        product = suppliesData.supplies.find(p => p.id ===  parseInt(productsOrdered[i].id));
        movement = {
            type: 1, //type es orden
            movementCode: numberOrd,
            movementQuantity: productsOrdered[i].units
        }
        product.movements.push(movement);
        product.existence += parseInt(productsOrdered[i].units);

    }
    fileWriter(suppliesPath, suppliesData);
    return true;
}




