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
const suppliesPath = './data/supplies.json';
let suppliesData;

// método para escritura
function fileWriter(filePath, fileContent) {
    const jsonString = JSON.stringify(fileContent, null, 2);

    fs.writeFile(filePath, jsonString, (error) => {
        console.log("Error writing file: ", error);
    });
}


function readSuppliesFile(resp) {
    // Cargamos los datos del archivo
    let fileData;
    try {
        fileData = fs.readFileSync(suppliesPath, 'utf8');
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
    // Convertimos los datos en objeto
    try {
        suppliesData = JSON.parse(fileData);
    } catch (error) {
        return resp.status(404).send({ "error": "Datos del archivo no encontrados" });
    }
}

router.get('/', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        resp.send(suppliesData.supplies);
    }
});

router.get('/:id', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Supply con id: ${req.params.id} no existe)`);
        resp.send(supply);
    }
});


router.get('/:id/movements', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const supply = suppliesData.supplies.find(p => p.id === parseInt(req.params.id))
        if (!supply) return resp.status(404).send(`Supply con id: ${req.params.id} no existe)`);
        resp.send(supply.movements);
    }
});


router.post('/', (req, resp) => {
    readSuppliesFile(resp);
    if (suppliesData) {
        const { error } = validateSupply(req.body);
        if (error) return resp.status(400).send(error.details[0].message);

        const index = suppliesData.supplies.length;
        const supply = {
            id: index + 1,
            name: req.body.name,
            units: 0,
            movements: []
        }
        suppliesData.supplies.push(supply);
        fileWriter(suppliesPath, suppliesData);
        resp.send(supply);
    }
});


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

function validateSupply(supply) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(supply);
}

function sortByField(supplies, sortKey) {
    readSuppliesFile(resp);
    if (suppliesData) {
        supplies.sort((p1, p2) => {
            return p1[sortKey] > p2[sortKey] ? 1 : -1;
        });
    }
}

module.exports.removeProducts = removeProducts;

function removeProducts(resp, numberReq, productsRequested) {
    let movement, product;
    for (let i = 0; i < productsRequested.length; i++) {
        product = requisitionsData.products.find(p => p.id === productsRequested[i].id);
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
        product = requisitionsData.products.find(p => p.id === productsRequested[i].id);
        movement = {
            type: 2, //type es requisition
            movementCode: numberReq,
            movementQuantity: productsRequested[i].units
        }
        product.movements.push(movement);
        product.units -= productsRequested[i].units;

    }
    fileWriter(suppliesPath, suppliesData);
    return true;
}
module.exports.addProducts = addProducts;

function addProducts(resp, numberOrd, productsOrdered) {
    let movement, product;
    for (let i = 0; i < productsOrdered.length; i++) {
        product = ordersData.products.find(p => p.id === productsOrdered[i].id);
        if (!product) {
            resp.status(404).send(`Codigo ${req.params.id} no existe)`);
            return false;
        } else if (productsOrdered[i].units < 1) {
            resp.status(400).send(`Debe indicar al menos una unidad del producto ${productsOrdered[i].id}`);
        }
    }

    for (let i = 0; i < productsOrdered.length; i++) {
        product = ordersData.products.find(p => p.id === productsOrdered[i].id);
        movement = {
            type: 1, //type es requisition
            movementCode: numberOrd,
            movementQuantity: productsOrdered[i].units
        }
        product.movements.push(movement);
        product.units += productsOrdered[i].units;

    }
    fileWriter(suppliesPath, suppliesData);
    return true;
}