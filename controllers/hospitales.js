const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {
    //podemos verlos demanera sencilla con una funcion de mongoose
    const hospitales = await Hospital.find()
    //con populate podemos ver datos de otras tablas, por ejemplo en este caso
    //estamos viendo el nombre de la persona que lo creo
    .populate('usuario','name email img')

    res.json({
        ok: true,
        hospitales
    })
}
const crearHospital = async(req, res = response) => {

    //obtenemos el id
    const uid = req.uid
    const hospital = new Hospital({
        //desestructuramos y mandamos el id obtenido del usuario
        usuario: uid,
        ...req.body
    });
    console.log(uid);
    try {

        const hospitalDB = await hospital.save();
    
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: " hable con el admin"
        })
    }
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const eliminarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    eliminarHospital
}