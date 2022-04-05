//Configuracion de moongose
//import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

//async convierte todo en una funcion que devuelva una promesa
const dbConnection = async() => {

    //manejamos los errores con el try-catch
    try {
        //await esperar que todo pase
       await mongoose.connect(process.env.DB_CNN);

       console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }
}

//para poder exportar
module.exports = {
    dbConnection
}