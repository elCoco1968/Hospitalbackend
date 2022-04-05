const { response } = require('express')

//exportamos el usuario models
const Usuario = require('../models/usuario')
//resultado de validacion
const { validationResult } = require('express-validator')
//encriptar contraseñas
const bcrypt  = require('bcryptjs')
const res = require('express/lib/response')


const getUsuarios = async (req, res) => {

    const usuarios =await Usuario.find({}, 'name email password');

    //respúesta del backend, normalmente en api rest se responde con un json
    //se devuelve con un objeto json
    res.json({
        ok: true,
        usuarios
    });
}


const crearUsuario = async(req, res = response) => {

    //extraer la informacion, estos son los requeridos los datos obligatorios
    const { email, password} = req.body;



    try{

        const existeEmail = await Usuario.findOne({email})
        if(existeEmail && email != undefined){
            console.log(email)
            return res.status(400).json({
               
                ok: false,
                mgs: 'El correo ya esta registrado'
            })
            
        }

        const usuario = new Usuario(req.body);
        //para grabar en la base de datos es muy simple

        //Encriptar contraseña una sola via es imposible llegar a ese punto,
        //nosotros tampoco vamos poder regresar a la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)


        await usuario.save();
    
    
        res.json({
            ok: true,
            usuario
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

    //con esto  ya le estamos mandando un objeto de tipo usuario y con el
    //req.body le estamos mandando los parametros obligatorios
   
}





//actualizar usuario
const actualizarUsuario = async(req ,res = response) => {


    const uid = req.params.id;

    try {
        

        res.json({
            ok:true,
            uid
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}