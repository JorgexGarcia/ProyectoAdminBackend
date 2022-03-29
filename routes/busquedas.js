const { Router } = require('express');
const { getTodo, getTodoCol } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validad.jwt');


const router = Router();

router.get('/:campo', validarJWT, getTodo );

router.get('/coleccion/:tabla/:campo', validarJWT, getTodoCol );

module.exports = router;