// Genera un objeto Router para el manejo de las rutas
const {Router} = require("express");
// Inicializa el Router
const router = Router();

// exporto el objeto router con sus verbos (get)
module.exports = router;

// método get al directorio raíz
router.get('/', (req, resp) => {
    resp.send("Hello World 1...");
});