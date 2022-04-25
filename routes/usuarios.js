const {Router } = require('express');
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require ('../controllers/usuarios');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT, validarRole, validarMismoUsuario} = require('../middlewares/validad.jwt');

const router = Router();

router.get( '/', validarJWT , getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ] ,
    crearUsuario
);

router.put( '/:id',
    [
        validarJWT,
        validarMismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos, 
    ], 
    actualizarUsuario
);

router.delete( '/:id',
    [validarJWT,
            validarRole],
    borrarUsuario
);




module.exports = router;
