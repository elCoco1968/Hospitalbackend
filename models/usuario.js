//modelo de mongoose
const {Schema, model} = require('mongoose');

//definicion de cada uno de los registros que van a estar dentro
//de los registros
const UsuarioSchema = Schema({

    name:{
        //tipo de dato
        type: String,
        //si es obligatorio
        require:true
    },
    email:{
        type: String,
        require:true,
        //si es unico
        unique: true
    },
    password:{
        type: String,
        require:true,
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        require:true,
        //valor por default
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },

});

//con esto vamos a obviar la informacion de la version y del id
//tener en cuenta que solo es para efectos visuales
UsuarioSchema.method('toJSON', function(){
    //le estamos diciendo que obmita el __V y _Id
    const { __v, _id, password, ...object} = this.toObject();
    //guardamos el id en una variable
    object.uid = _id;
    return object
})


//por defecto mongoose le pone usuarioS le pone el plural
module.exports = model('Usuario', UsuarioSchema);