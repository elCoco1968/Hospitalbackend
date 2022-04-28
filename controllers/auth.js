const {response} = require('express');
const Usuario = require('../models/usuario');

//tipado de contraseña
const bcrypt  = require('bcryptjs')

//Token JWT
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { findOne } = require('../models/usuario');
const usuario = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
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


const loginGoogle = async(req, res = response) => {

    const googleToken = req.body.token
    try {

        const {name,email,picture } =  await googleVerify(googleToken)
        // buscamos el usuario en la base de datos por email
        const usuarioDB = await Usuario.findOne({email});
        let usuario;
       
        //si no existe el usuario lo creamos
        if ( !usuarioDB ){
            usuario = new Usuario({
                name: name,
                email: email,
                password: '@@@',
                img : picture,
                google: true
            });
            
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }

       //guardar en BD
       await usuario.save();

        //Generar TOKEN!!!
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            usuario,
            menu: getMenuFrontEnd(usuario.role)
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        })
    }
}

const renewToken = async (req, res = response) => {


    const uid = req.uid;
    //Generar TOKEN!!!
    const token = await generarJWT(uid);

    //Obtener usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok:true,
        uid,
        token,
        usuario

    })
}



module.exports = {
    login,
    loginGoogle,
    renewToken
}