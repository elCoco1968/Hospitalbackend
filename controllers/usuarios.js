const { response } = require('express')

//exportamos el usuario models
const Usuario = require('../models/usuario')
//resultado de validacion
const { validationResult } = require('express-validator')
//encriptar contraseñas
const bcrypt  = require('bcryptjs')
const res = require('express/lib/response');

//Token JWT
const { generarJWT } = require('../helpers/jwt')


const getUsuarios = async (req, res) => {

    //Obtener valor desde la URL
    //Tener en cuenta que si vamos a mandar la variable es opcional
    //por lo que utilizamos ?, el ejemplo practico es el siguiente
    //TODO: http://localhost:3005/api/usuarios?desde=5
    const desde = (req.query.desde) || 0;
    const hasta = (req.query.hasta)
    //console.log(desde)



    //lo devolvemos en un array en el cual las posiciones determinan
    //donde se van a almacenar los resultados de cada promesa,
    //lo importante es que ya se van a ejecutar a la vez y no tenemos un await y despues otro
    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'name email role google img')
            .skip(desde)
            .limit( 5 ),

        Usuario.countDocuments()
    ]);

    // const usuarios = await Usuario.find({}, 'name email password')
    //                                 //Que se sale los valores desde
    //                                 .skip(desde)
    //                                 //tambien podemos poner un limite
    //                                 .limit(5)


    // const total = await Usuario.count();
    //respúesta del backend, normalmente en api rest se responde con un json
    //se devuelve con un objeto json




    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    //extraer la informacion, estos son los requeridos los datos obligatorios
    const { email, password} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email})
        if(existeEmail && email != undefined){
            
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

         //Generar TOKEN!!!
         const token = await generarJWT(usuario.id);

        await usuario.save();
    
        res.json({
            ok: true,
            usuario,
            token
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

    //obtenemos el id de la url
    const uid = req.params.id;

    try {
        //TODO: Validar token y comprobar si es el usuario correcto
        
        //buscando el usuario por el id obtenido de los parametros
        const usuarioDB = Usuario.findById(uid);
        //podriamos desestructural el body
        //const { name, email, password} = req.body
        const {} = req.body

        //si no existe el usuario devolver un error
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }
        
        //Actualizaciones
        const campos = req.body;

        //tenemos que verificar que el email no sea el mismo, si es el mismo,
        //lo elimine si no es el mismo que lo mande
        if(usuarioDB.email === req.body.email){
            delete campos.email;
        } else{
           //para manejar el error de cuando manden errores que ya existen
            // const existeEmail = await Usuario.findOne({email: req.body.email});
            // if(existeEmail){
            //     return res.status(400).json({
            //         ok:false,
            //         msg: 'ya existe usuario con ese email'
            //     })
            // }
        }

        //borramos los que no queremos actualizar y grabar en la base de datos
        //no queremos mandar el password, para no caerle encima, lo podemos borrar siempre que lo tengamos estructurado
        //en la base de datos mongoose
        delete campos.password;
        //tiene que ser parte del modelo
        delete campos.google;
       
        //de esta manera vamos a mandar a actualizar, debemos mandar el id y los campos que queremos actualizar
        //si no le ponemos al final , {new: true}, nos va a devolver el ususario que actualizamos con new nos devolver loa data nueva
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new : true})

        res.json({
            ok:true,
            //devolvemos el ID
            //uid
            usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const eliminarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = Usuario.findById(uid);
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(201).json({
            ok: true,
            msg:"Usuario eliminado",
            uid
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error desde deleteUsers"
        })
    }   
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}





