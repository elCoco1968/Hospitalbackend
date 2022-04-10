const {response} = require('express');
const Usuario = require('../models/usuario');

//tipado de contraseña
const bcrypt  = require('bcryptjs')

//Token JWT
const { generarJWT } = require('../helpers/jwt')


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //extraemos los datos
        const usuarioDB = await Usuario.findOne({email});

        //TODO: No podemos dar pistas por que pueden haber malas intenciones
        //por eso ponemos email o contraseña no validos
        //Verificar email
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: "Email no valido"
            })
        }

        //Verificar contraseña, aca valida y compara las dos contraseñas si hacen match retorna true
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar TOKEN!!!
        const token = await generarJWT(usuarioDB.id);

        return res.json({
            ok:true,
            token
        })





        res.json({
            ok: true,
            msg: 'Hola mundo'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el admin"
        })
    }
}

module.exports = {
    login,
}