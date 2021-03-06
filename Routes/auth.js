/*
    path: '/api/login'
*/

const { Router} = require('express');
const { check } = require('express-validator');
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
login)

router.post('/google',
[
    check('token', 'El token es obligatorio').not().isEmpty(),
    validarCampos
],
loginGoogle)


//revalidar el token
//si el token expiro sacarlo de la cuenta y si no dejarlo Online
router.get('/renew',validarJWT,renewToken)


//Exportando el router
module.exports = router;