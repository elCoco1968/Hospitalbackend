/* get todo */

const { response } = require("express");

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');




const getTodo = async (req, res = response) => {

    //obteniendo el parametro desde la URL
    const busqueda = req.params.busqueda;
    //necesitamos que la busqueda sea mas flexible por lo que utilizamos
    //expresiones regulares, le pasamos el parametro de busqueda y le añadimos 'i'
    const regex = new RegExp(busqueda, 'i');
    //el find para realizar busqueda y {} ponemos las condiciones

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ name: regex }),
        Medico.find({ name: regex }),
        Hospital.find({ name: regex })
    ]);

    // const usuarios = await Usuario.find({
    //      name: regex
    //     })
    // const medicos = await Medico.find({
    //     name: regex
    // })    
    // const hospitales = await Hospital.find({
    //     name: regex
    // }) 

    try {

        return res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales

        })

    } catch (error) {

    }
}



const getDocumentosCol = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    //generamos una array vacio para rellenar dependiendo del switch
    let data = [];
    //validamos el dato obtenido por el parametro de la URL
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({name: regex})
            break;
        case 'hospitales':
            data = await Hospital.find({name: regex})
            break;
        case 'usuarios':
            data = await Usuario.find({name: regex})
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser Usuarios, Medicos o Hospitales'
            })
    }
    //Nos devuelva la data
    res.json({
        ok:true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosCol
}