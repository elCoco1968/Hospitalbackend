/*
    Medicos
    ruta: '/api/medicos'
*/



const { Router } = require('express');
const { crearMedico, actualizarMedico, getMedicos, eliminarMedico, getMedicoById } = require('../controllers/Medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');


const router = Router();

router.get('/' ,getMedicos);

router.post('/',
[
    validarJWT,
    check('name','El nombre del medico es obligatorio').not().isEmpty(),
    validarCampos
],
crearMedico);

router.put('/:id',
[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
 actualizarMedico);

router.delete('/:id', validarJWT,eliminarMedico);


router.get('/:id', validarJWT,getMedicoById);


module.exports = router;