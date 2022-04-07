const { response } = require("express");
const Medico = require('../models/medico')

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'name email')
                                .populate('hospital', 'name ')

    
    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

 
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico : medicoDB,

        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error al crear medico"
        })
    }


}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'actualizarMedicos'
    })
}

const eliminarMedico = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'borrarMedicos'
    })
}



module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    eliminarMedico
}