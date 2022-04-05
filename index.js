
//Importacion en express
//import express from 'express'
const express = require('express');

//import la configuracion de mongoose
const { dbConnection } = require('./database/config')

//importando el file .env, asi podemos acceder a sus variables
require('dotenv').config();

//importacion del cors
var cors = require('cors')

//crear el servidor de express
const app = express();

//configurando cors (Siempre despues de crear el servidor)
app.use(cors())

//lectura y parseo del body, hay que ponerlo aca para que haga primero el parseo
app.use( express.json());

//base de datos
dbConnection();


//para que todas las rutas inicien con /api/usuarios
//le decimos que todo lo que pase por esa URL sea respondido por el require, la carpeta
app.use( '/api/usuarios', require('./Routes/usuarios') )




//TODO:User : kevindb
//TODO: Password : 0000 

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto',+ process.env.PORT )
})




