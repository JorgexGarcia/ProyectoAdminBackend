const {Schema, model} = require('mongoose');

const HospitalSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario :{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    collection: 'hospitales' 
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})


module.exports = model('Hospital', HospitalSchema);