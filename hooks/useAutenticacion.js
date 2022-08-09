import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAutenticacion() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, usuario => {
      if( usuario ) {
        setUsuarioAutenticado(usuario)
      } else {
        setUsuarioAutenticado(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return usuarioAutenticado
}

export default useAutenticacion