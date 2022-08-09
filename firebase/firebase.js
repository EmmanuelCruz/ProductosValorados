import app from 'firebase/compat/app';
import firebaseConfig from './config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import 'firebase/auth'

class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig);
    this.auth = getAuth()
  }

  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password)

    return await nuevoUsuario.user.updateProfile({
      displayName: nombre
    })
  }
}

const firebase = new Firebase()

export default firebase