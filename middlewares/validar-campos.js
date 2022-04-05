
const { response } = require('express')
const { validationResult} = require('express-validator')



//next nos dice si pasa o no pasa al siguiente middleware o siguiente ruta, etc
const validarCampos = (req, res = response, next) => {

    //errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }
    next();
}

module.exports = {
    validarCampos
}