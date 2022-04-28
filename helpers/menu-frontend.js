//vamos a recibir el rol para el filtrado del menu
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          //generamos el menu de manera dinamica
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'main', url: '/' },
            { titulo: 'ProgressBar', url: 'progress' },
            { titulo: 'Graficas', url: 'grafica1' },
            { titulo: 'Promesas', url: 'promesas' },
            { titulo: 'rxjs', url: 'rxjs' },
          ]
        },
    
        {
          //generamos el menu de manera dinamica
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Medicos', url: 'medicos' }
          ]
        },
      ];


      //el menu es un arreglo estamos accediendo al segundo item del array
      //este helper lo vamos a usar en el controller de auth
      //con esto podemos verificar que si el usuario es un adminRole,podra ver el menu completo
      //si no es un adminRole no podra, lo podemos comprar por postman
      if( role === 'ADMIN_ROLE'){
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios'})
      }

      return menu;
}

module.exports = {
  getMenuFrontEnd
}