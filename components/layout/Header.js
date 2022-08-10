import React, { useContext } from 'react'
import Buscador from '../ui/Buscador'
import Navegacion from './Navegacion'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react';
import Boton from '../ui/Boton'
import { FirebaseContext } from '../../firebase'
import useAutenticacion from '../../hooks/useAutenticacion'
import { signOut, getAuth } from 'firebase/auth'

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px){
    display: flex;
    justify-content: space-between;
  }
`

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
  cursor: pointer;
`

const HeaderElements = styled.div`
  display: flex;
  align-items: center;
`

const SesionElements = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`

const HelloUser = styled.p`
  margin-right: 2rem;
`

const HeaderStyles = styled.header`
  border-bottom: 2px solid #e1e1e1;
  padding: 1rem 0;
`

const Header = () => {

  const [user, auth] = useAutenticacion()


  const cerrarSesion = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <HeaderStyles>
      <ContenedorHeader>
        <HeaderElements>
          <Link href='/'>
            <Logo>P</Logo>
          </Link>

          <Buscador />

          <Navegacion />

        </HeaderElements>

        <SesionElements>
          { user ? (
            <>
              <HelloUser>
                Hola {user.displayName}
              </HelloUser>
              <Boton onClick={() => cerrarSesion()} bgColor='true'>Cerrar sesión</Boton>
            </>
          ) : (
            <>
              <Link href='/login'>
                <Boton bgColor='true'>Login</Boton>
              </Link>
              <Link href='/crear-cuenta'>
                <Boton>Crear cuenta</Boton>
              </Link> 
            </>

          )}
        </SesionElements>
      </ContenedorHeader>
    </HeaderStyles>
  )
}

export default Header
