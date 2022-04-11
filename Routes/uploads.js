/*

    ruta: api/upload/

*/


const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');
const { fileUpload, retornaImagen } = require('../controllers/uploads');


const router = Router();

//utilizando la libreria
router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT, fileUpload );

//obtener imagen
router.get('/:tipo/:idFoto', retornaImagen );


module.exports = router;