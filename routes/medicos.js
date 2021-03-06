const {Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validad.jwt');
const { getMedicos, crearMedico,
        actualizarMedico, eliminarMedico, getOneMedico} = require('../controllers/medicos');

const router = Router();

router.get( '/:id',
    validarJWT,
    getOneMedico
);

router.get( '/',
    validarJWT,
    getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospitales obligatorio').isMongoId(),
        validarCampos
    ] , crearMedico
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospitales obligatorio').isMongoId(),
        validarCampos
    ], 
    actualizarMedico
);

router.delete( '/:id',
    validarJWT,
    eliminarMedico
);




module.exports = router;
