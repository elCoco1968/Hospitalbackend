const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-image");
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

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
  //console.log(file);

  const nombreCortado = file.name.split('.'); //asi obtenemos la extencion, ejemplo wolverone.1.1.jpg
  const extencionArchivo = nombreCortado[ nombreCortado.length -1];


  //validar Extencion
  //validamos las extenciones y si NO esta incluida
  const extencionesValida = ['png','jpg','jpeg','git','PNG'];
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
  const path =`./upload/${tipo}/${nombreArchivo}`

   // Mover la imagen o subirla, el file es donde tenemos nuestra imagen almacenada, el path la ruta a donde la vamos a subir
   file.mv(path, (err) => {

    if (err){
        console.log(err)
        return res.status(500).json({
            ok:false,
            msg: 'Error al mover la img'
        })
    }

    //actualizar base de dtos
    actualizarImagen(tipo,id,nombreArchivo)

    res.json({
      ok: true,
      nombreArchivo,
      msg: 'archivo subido'
    });
  });


  //con esto en la respuesta podemos ver el nombre del archivo generado por la libreria
};

const retornaImagen = ( req, res=response) => {

  const tipo = req.params.tipo;
  const idFoto = req.params.idFoto;

  //Utilizamos una libreria direcamnete de express, llamada path que nos permite
  //reconstruir una ruta o un path, ponemos dirname y donde se encuentra la imagen
  const pathImg = path.join(__dirname, `../upload/${tipo}/${idFoto}`);


  //poner imagen por defecto
  if( fs.existsSync( pathImg)){
    
      //en ese punto nos devuelve la imagen
      res.sendFile( pathImg );
  } else {
    const pathImg = path.join(__dirname, `../upload/no-img.jpg`);
    res.sendFile( pathImg );
  }

}

module.exports = {
  fileUpload,
  retornaImagen,
};
