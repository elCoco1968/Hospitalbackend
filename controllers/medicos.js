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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const medicoDB = await Medico.findById(id);

        if( !medicoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado',
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

      
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true});

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:true,
            msg: 'hable conmigo'
        })
        
    }


}

const eliminarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        
        if( !medicoDB ){
            return res.status(404).json({
                ok:false,
                msg: 'Medico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Medico Eliminado'
        })
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }
}


const getMedicoById = async(req, res = response) => {

    //obtenemos el id por los params
    const id = req.params.id;

    try {
        const medicos = await Medico.findById(id)
                                    .populate('usuario', 'name email')
                                    .populate('hospital', 'name ')
    
        
        res.json({
            ok:true,
            medicos
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg: 'hable con el admin'
        })
    }

}


module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    eliminarMedico,
    getMedicoById
}