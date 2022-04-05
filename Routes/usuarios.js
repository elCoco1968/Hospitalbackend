const { Router } = require('express');
//check es la libreria que nos va a permitir validar
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios,crearUsuario, actualizarUsuario} = require('../controllers/usuarios')

const router = Router();



//Rutas, esto se va a ejecutar cuando alguien haga un get al /
//cuando eso pase se dispara el callback, recibe dos argumentos
//es decir la req=lo que se solicita y la res=lo que responde el backend
//le quitamos el app y ponemos router
router.get('/', getUsuarios);

//ruta para crear usuario
router.post('/',
 [
     //Cuando es un solo Middleware podemos ponerlo normal, pero cuando es mas de uno lo hacemos entre llaves
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    //llamamos el middleware, simpre se llama despues del check
    validarCampos,
],
 crearUsuario);



 router.put('/:id',
 [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').isEmail(),
 ], 
 actualizarUsuario);




//exportando el router la variable
module.exports = router;