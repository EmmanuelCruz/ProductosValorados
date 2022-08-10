import React, { useState } from "react"
import Layout from "../components/layout/Layout"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import styled from '@emotion/styled'
import validarSesion from "../validacion/validarSesion"
import Router from 'next/router'

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Validaciones
import useValidacion from "../hooks/useValidacion"
import useAutenticacion from "../hooks/useAutenticacion"

const stateInicial = {
  email: '',
  password: ''
}

const Titulo = styled.h1`
  text-align: center;
  margin-top: 5rem;
`

const Login = () => {
  const { valores, errores, handleChange, handleSubmit } = useValidacion(stateInicial, validarSesion, iniciarSesion)
  
  const { email, password} = valores

  const [error, setError] = useState(false)

  const [usuario, auth] = useAutenticacion()
  
  async function iniciarSesion() {
    try {
      await signInWithEmailAndPassword(auth, email, password)
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
          <Titulo>Iniciar sesión</Titulo>

          <Formulario
            onSubmit={handleSubmit}
          >
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

            <InputSubmit type='submit' value='Iniciar sesión'/>
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default Login
