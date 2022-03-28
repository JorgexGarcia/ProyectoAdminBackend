const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config();
const cors = require('cors');


//Crear el servidor Express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos 
dbConnection();


//Rutas
app.get( '/' , (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});