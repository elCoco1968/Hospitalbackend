
const jwt = require('jsonwebtoken')
//Esta validacion del token la vamos a utilizar al momento de hacer el get a usuarios
const validarJWT = (req ,res, next) => {

    //leer el token
    const token = req.header('x-token');

    //Con esto estamos validando el token
    //si no hay token nos retirna el 401 y su respectivo error
    //y no continua
    if( !token ){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        //verificamos el token, si todo sale bien accederemos al try, verifica
        // y salta al next() nos realiza la peticion
        const {uid} = jwt.verify( token, process.env.JWT_SECRET);
       //le damos a la req el uid recibido en la verificacion
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

    //siempre hay que llamar el next() , si no la peticion se quedara pensando
    // y nos podria parecer que el servicio no esta funcionando
}

module.exports = {
    validarJWT
}