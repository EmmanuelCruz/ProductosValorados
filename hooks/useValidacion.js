import React, { useEffect, useState } from 'react'

const useValidacion = (initialState, validar, fn) => {

  const [valores, setValores] = useState(initialState)
  const [errores, setErrores] = useState({})
  const [submitForm, setSubmitForm]= useState(false)

  useEffect(() => {
    if(submitForm){
      const noErrores = Object.keys(errores).length === 0

      if(noErrores){
        fn()
      }

      setSubmitForm(false)
    }
  }, [errores])

  // Cuando se hace un cambio
  const handleChange = e => {
    setValores({
      ...valores,
      [e.target.name] : e.target.value
    })
  }

  // Cuando se hace submit
  const handleSubmit = e => {
    e.preventDefault()
    const erroresValidacion = validar(valores)
    setErrores(erroresValidacion)
    setSubmitForm(true)
  }

  return {
    valores, errores, submitForm, handleChange, handleSubmit
  }
}

export default useValidacion
