const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    //podemos verlos demanera sencilla con una funcion de mongoose
    const hospitales = await Hospital.find()
        //con populate podemos ver datos de otras tablas, por ejemplo en este caso
        //estamos viendo el nombre de la persona que lo creo
        .populate('usuario', 'name email img')

    res.json({
        ok: true,
        hospitales
    })
}
const crearHospital = async (req, res = response) => {

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

const actualizarHospital =  async (req, res = response) => {


    const id = req.params.id;
    const uid = req.uid;


    try {

        const hospitalDB = await Hospital.findById(id);

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por ID',
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})




        res.json({
            ok: true,
            msg: 'actualizarHospitales',
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        })

    }

}

const eliminarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por ID',
            })
        }

        await Hospital.findByIdAndDelete(id)
     

        res.json({
            ok: true,
            msg: 'Hospital Eliminado',
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        })

    }
}

module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    eliminarHospital
}