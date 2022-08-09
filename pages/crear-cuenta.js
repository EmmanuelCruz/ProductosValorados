import React, { useState } from "react"
import Layout from "../components/layout/Layout"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import styled from '@emotion/styled'
import validarCrearCuenta from "../validacion/validarCrearCuenta"
import Router from 'next/router'

// Firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// Validaciones
import useValidacion from "../hooks/useValidacion"

const stateInicial = {
  nombre: '',
  email: '',
  password: ''
}

const Titulo = styled.h1`
  text-align: center;
  margin-top: 5rem;
`

const CrearCuenta = () => {
  const { valores, errores, handleChange, handleSubmit } = useValidacion(stateInicial, validarCrearCuenta, crearCuenta)
  
  const { nombre, email, password} = valores

  const [error, setError] = useState(false)
  
  async function crearCuenta() {
    const auth = getAuth()
    try {
      const nuevoUsuario = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(nuevoUsuario.user, {
        displayName: nombre
      })
      Router.push('/')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <Titulo>Crear cuenta</Titulo>

          <Formulario
            onSubmit={handleSubmit}
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type='text'
                id='nombre'
                placeholder="Escribe tu nombre"
                name='nombre'
                value={nombre}
                onChange={handleChange}
              />
            </Campo>

            {errores.nombre && <Error>{errores.nombre}</Error>}

            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type='email'
                id='email'
                placeholder="Escribe tu email"
                name='email'
                value={email}
                onChange={handleChange}
              />
            </Campo>

            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input 
                type='password'
                id='password'
                placeholder="Escribe tu contraseña"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </Campo>

            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type='submit' value='Crear cuenta'/>
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default CrearCuenta
