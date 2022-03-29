const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async (req, res) => {
    
    const campo = req.params.campo;
    const regex = new RegExp(campo, 'i');

    const [usuario , medicos , hospitales] = await Promise.all ([
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex})
    ]);

    res.json({
        ok: true,
        usuario,
        medicos,
        hospitales,
        campo
    });

}

const getTodoCol = async (req, res) => {
    
    const campo = req.params.campo;
    const tabla = req.params.tabla;
    const regex = new RegExp(campo, 'i');

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Tabla no encontrada'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getTodoCol
}

