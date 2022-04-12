/*
    Hospitales
    ruta: '/api/hospitales'
*/



const { Router } = require('express');
const { check } = require('express-validator');
const { crearHospital, actualizarHospital, getHospitales, eliminarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validarJWT')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/' ,getHospitales);

router.post('/',
[
    validarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El hospital id debe ser valido').isMongoId,
    validarCampos
]
,crearHospital);

router.put('/:id'
,[
    validarJWT,
    check('name', 'El nombre del hospital es necesario'),
    validarCampos
],
 actualizarHospital);

router.delete('/:id',validarJWT,eliminarHospital);


module.exports = router;