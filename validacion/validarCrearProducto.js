export default function validarCrearProducto(valores) {
  let errores = {}

  // Validar el nombre
  if(!valores.nombre){
    errores.nombre = 'El nombre es obligatorio'
  }

  // Validar empresa
  if(!valores.empresa){
    errores.empresa = 'Nombre de empresa es obligatori'
  }

  // url
  if(!valores.url){
    errores.url = 'La url es obligatoria'
  } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
    errores.url = 'La URL es inválida'
  }

  // descripcion
  if(!valores.descripcion){
    errores.descripcion = 'Descripcion del producto es obligatorio'
  }

  return errores
}