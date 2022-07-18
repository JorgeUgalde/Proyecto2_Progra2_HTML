// Importa el módulo express
const express = require('express');
// Genera una aplicación express
const app = express();
// Importa el módulo cors
const cors = require('cors');

// carga el middleware
app.use(express.json());
app.use(cors());

// define settings
app.set('json spaces', 2);

// importa las rutas
 app.use(require('./routes/router')) // directorio raíz, solo recibe el archivo con las funciones
 app.use('/api/orders', require('./routes/orders')) // directorio de cursos que contiene los verbos (get, post, put, delete)
 app.use('/api/supplies', require('./routes/supplies')) // directorio de cursos que contiene los verbos (get, post, put, delete)
 app.use('/api/requisitions', require('./routes/requisitions')) // directorio de cursos que contiene los verbos (get, post, put, delete)

// Inicializo la aplicación
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});