const {Schema, model} = require('mongoose');

const MedicoSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario :{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital :{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
MedicoSchema.method('toJSON', function() {
    const {__v , ...object} = this.toObject();
    return object;
})


module.exports = model('Medico', MedicoSchema);