/*
    ruta: api/todo/:busqueda
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getTodo, getDocumentosCol} = require('../controllers/busquedas');
const {validarJWT} = require('../middlewares/validarJWT');

const router = Router();

router.get('/:busqueda',validarJWT, getTodo);
//Busqueda por coleccion
router.get('/coleccion/:tabla/:busqueda',validarJWT, getDocumentosCol);



module.exports = router;
