const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (p) => {
    if(fs.existsSync(p)){
        fs.unlinkSync(p);
    }
}

const actualizarImagen = async (tabla, id, nombre) =>{

    let pathViejo;

    switch ( tabla ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;

            //borrar la imagen anterior
            borrarImagen(pathViejo);

            medico.img = nombre;
            await medico.save();

        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;

            //borrar la imagen anterior
            borrarImagen(pathViejo);

            hospital.img = nombre;
            await hospital.save();
            
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;

            //borrar la imagen anterior
            borrarImagen(pathViejo);

            usuario.img = nombre;
            await usuario.save()
            
        break;
    }

    return true;

}

module.exports ={
    actualizarImagen
}