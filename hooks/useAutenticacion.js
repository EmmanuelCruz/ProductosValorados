import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAutenticacion() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)
  const [auth, setAuth] = useState(getAuth())

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, usuario => {
      if( usuario ) {
        setUsuarioAutenticado(usuario)
      } else {
        setUsuarioAutenticado(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return [usuarioAutenticado, auth]
}

export default useAutenticacion