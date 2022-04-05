
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

//base de datos
dbConnection();

//Rutas, esto se va a ejecutar cuando alguien haga un get al /
//cuando eso pase se dispara el callback, recibe dos argumentos
//es decir la req=lo que se solicita y la res=lo que responde el backend
app.get('/', (req,res) => {

    //respúesta del backend, normalmente en api rest se responde con un json
    //se devuelve con un objeto json
    res.json({
        ok:true,
        msg: 'hola mundo'
    })

});

//TODO:User : kevindb
//TODO: Password : 0000 

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto',+ process.env.PORT )
})




