// Importamos variables de entorno de nuestro fichero .env
require('dotenv').config();

// Importamos las dependencias
const express = require('express');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Importamos las rutas
const routes = require('./routes');

// Importamos las funciones controladoras de errores.
const { 
    errorController,
    notFoundController,
} = require('./controllers/errors');

// Creamos el servidor
const app = express();

// Middleware que indica a Express dónde estan ubicados los ficheros estáticos.
const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);
app.use('/uploads', express.static(uploadsDir));

// Middleware que deserializa un body en formato "raw" creando la propiedad "body" en el objeto request
app.use(express.json());

// Middleware que permite leer en form-data
app.use(fileupload());

// Middleware que muestra por consola información de la petición entrante
app.use(morgan('dev'));

// Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con el servidor
app.use(cors());

// Middleware que indica a Express dónde se encuentran las rutas
app.use(routes);

// Middleware ruta no encontrada
app.use(notFoundController);

// Middleware de manejo de errores
app.use(errorController);

// Ponemos a funcionar el servidor en el puerto dado
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`);
});
