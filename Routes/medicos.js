/*
    Medicos
    ruta: '/api/medicos'
*/



const { Router } = require('express');
const { crearMedico, actualizarMedico, getMedicos, eliminarMedico } = require('../controllers/Medicos');
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

router.put('/:id',[], actualizarMedico);

router.delete('/:id',[],eliminarMedico);


module.exports = router;