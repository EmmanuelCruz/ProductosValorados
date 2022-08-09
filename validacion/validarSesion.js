export default function validarSesion(valores) {
  let errores = {}

  // Validar email
  if(!valores.email){
    errores.email = 'El email es obligatorio'
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
    errores.email = 'Email no válido'
  }

  // Password
  if(!valores.password){
    errores.password = 'El password es invpalido'
  } else if(valores.password.length < 6){
    errores.password = 'El password debe contener al menos 6 caracteres'
  }

  return errores
}