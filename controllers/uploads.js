const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.tipo;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  //si los tipos validos no incluyen el tipo entre a este if y responda
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, usuario u hospital(TIPO)",
    });
  }

  //validacion de que exista un file
  //validacion para ver si hay archivos
  //si no viene archivos o si no manda nada devuelva el error
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  //procesar la imagen
  //vamos a extraer la imagen, el nombre imagen -> debe coincidir con el que le estamos mandando
  const file = req.files.imagen

  //si en este pundo hacemos un console.log deberiamos poder ver la data de laimagen
  console.log(file);

  const nombreCortado = file.name.split('.'); //asi obtenemos la extencion, ejemplo wolverone.1.1.jpg
  const extencionArchivo = nombreCortado[ nombreCortado.length -1];

  //validar Extencion
  //validamos las extenciones y si NO esta incluida
  const extencionesValida = ['png','jpg','jpeg','git'];
  if( !extencionesValida.includes( extencionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion permitida'
        });
  }

  //Generar el nombre del archivo
  //esto lo debemos de manejar con la libreria de UUID por que puede que hayan imagenes con el mismo nombre
  //entonces para manejar los errores que esto nos pueda presentar lo manejamos con la libreria que nos de nombres unicos por cada imagen
  //le concatenamos la extencion del Archivo
  const nombreArchivo = `${uuidv4()}.${extencionArchivo}`

  //path para guardar la imagen
  const path =`./uploads/${tipo}/${nombreArchivo}`

   // Mover la imagen o subirla, el file es donde tenemos nuestra imagen almacenada, el path la ruta a donde la vamos a subir
   file.mv(path, (err) => {

    if (err){
        console.log(err)
        return res.status(500).json({
            ok:false,
            msg: 'Error al mover la img'
        })
    }

    res.json({
      ok: true,
      nombreArchivo: nombreArchivo,
      msg: 'archivo subido'
    });

  });


  //con esto en la respuesta podemos ver el nombre del archivo generado por la libreria
};

module.exports = {
  fileUpload,
};
