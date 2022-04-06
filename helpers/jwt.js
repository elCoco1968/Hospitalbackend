const jwt = require('jsonwebtoken');



const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        //tener en cuenta que en el payload grabamos informacion que no sea sensible
        const payload = {
            uid,
            nombre: "kevin"
            //nombre
        };

        //sing es para crearlo
        jwt.sign(payload, process.env.JWT_SECRET, {
            //cuando tiempo para expirar el token
            expiresIn: '12h'
            //este callback nos da un error y hacemos la validacion
            //o que nos devuelva el toekn
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el JWT')
            } else {
                //que si todo sale bien la promesa nos devuelva el token
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT,
}



