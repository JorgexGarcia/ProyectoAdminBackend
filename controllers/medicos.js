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
    
    const uid = req.uid;
    const id = req.params.id;

    try {

        const doctorDB  = await Medico.findById(id);

        if(!doctorDB){
            return res.status(404).json({
                ok: false,
                msg:'El médico no se encontro'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        
        const medicoDB = await Medico.findByIdAndUpdate( id , cambiosMedico , {new: true});
        
        res.json({
           ok: true,
           medico: medicoDB
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarMedico = async (req, res) => {
    
    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}