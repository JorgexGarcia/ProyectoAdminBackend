const Medico = require('../models/medico');


const getMedicos = async (req, res) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
    
}

const crearMedico = async (req, res) => {
    
    const uid = req.uid;
    console.log(req.body);
    const medico = new Medico({
        usuario: uid,
        ...req.body 
    });

    try {

        const medicoDB = await medico.save();
        
        res.json({
           ok: true,
           medico: medicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const actualizarMedico = async (req, res) => {
    
    res.json({
        ok: true,
       msg:'actualizarMedico'
    });
}

const eliminarMedico = async (req, res) => {
    
    res.json({
        ok: true,
       msg:'eliminarMedico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}