/*

    ruta: api/uploads/

*/


const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');
const { fileUpload } = require('../controllers/uploads');


const router = Router();

//utilizando la libreria
router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT, fileUpload );



module.exports = router;