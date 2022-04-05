const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const cargarArchivo = (req, res) => {

    const tabla = req.params.tabla;
    const id = req.params.id;

    const tablasValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tablasValidos.includes(tabla)){
        return res.status(400).json({
            ok:false,
            msg: 'Tabla no encontrada'
        })
    }

    //Comprobar si tenemos archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay archivo'
        })
    }

    //Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    //Validar estension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            ok:false,
            msg: 'Extensión no válida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //Crear el path 
    const path = `./uploads/${tabla}/${nombreArchivo}`;

    //Mover imagen
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok:false,
                nombreArchivo,
                msg: 'Error al mover la imagen'
            })
        }

        //Actualizar base de datos
        actualizarImagen(tabla, id, nombreArchivo);
    
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });
}

const descargarArchivo = (req, res) =>{

    const tabla = req.params.tabla;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${tabla}/${foto}`);

    if(!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, '../uploads/noImagen.jpeg');
    }

    res.sendFile(pathImg);
}


module.exports = {
    cargarArchivo,
    descargarArchivo
}
