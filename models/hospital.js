
const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({

    name:{
        type: String,
        require:true
    },
    img:{
        type: String,
    },
    //Para que tenga relacion con usuarios
    usuario:{
        //con esto estamos dando a entender la relacion que hay entre las dos tablas
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
//asi le cambiamos de nombre a las tablas
}, {collection: 'hospitales'});

HospitalSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object
})


module.exports = model('Hospital', HospitalSchema);