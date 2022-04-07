
const {Schema, model} = require('mongoose');


const MedicoSchema = Schema({

    //Tener en cuenta los required
    name:{
        type: String,
        required:true
    },
    img:{
        type: String,
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    //IMPORTANTE: lo que ponemos en required, lo tenemos que mandar, en este casi
    //tenemos que mandar el di del hospital y el del usuario para poder crear 
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
//asi le cambiamos de nombre a las tablas
}, {collection: 'medicos'});

MedicoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object
})

module.exports = model('Medico', MedicoSchema);