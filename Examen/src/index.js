//usar el framework
const express = require('express');
//instancia de express
const app = express();
//middleware para ver las solicitudes 
const morgan = require('morgan');
const { testConnection } = require('./config/Connection');

//cargar las variables de entorno
require('dotenv').config();

testConnection();

//configuracion del puerto 
const port = process.env.PORT || 3000;

//iniciando servidor 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});