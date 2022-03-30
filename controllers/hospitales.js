const Hospital = require('../models/hospital');


const getHospitales = async (req, res) => {
    
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body 
    });

    try {

        const hospitalDB = await hospital.save();
        
        res.json({
           ok: true,
           hospital: hospitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const actualizarHospital = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const hospitalDB  = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg:'El hospital no se encontro'
            })
        }

        //modifico el usuario uid para que se guarde el ultimo que realizo una modificación
        const hospital = {
            ...req.body,
            usuario: uid
        }

        //Con new : true , devuelve el objeto actualizado
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id , hospital, {new : true});

        res.json({
            ok: true,
            hospitalActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const eliminarHospital = async (req, res) => {

    const id = req.params.id;
    
    try {
        
        const hospitalDB  = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg:'El hospital no se encontro'
            })
        }

        const hospitalActualizado = await Hospital.findByIdAndDelete( id, {new : true});

        res.json({
            ok: true,
            msg: 'Hospital eliminado',
            hospitalActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}