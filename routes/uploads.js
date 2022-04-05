const { Router } = require('express');
const { cargarArchivo, descargarArchivo } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validad.jwt');
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload());

router.put('/:tabla/:id', validarJWT, cargarArchivo );

router.get('/:tabla/:foto', descargarArchivo );

module.exports = router;
