import React, { useContext } from 'react'
import Buscador from '../ui/Buscador'
import Navegacion from './Navegacion'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react';
import Boton from '../ui/Boton'
import { FirebaseContext } from '../../firebase'

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

const Header = () => {

  const { user, firebase } = useContext(FirebaseContext)

  console.log(user)

  return (
    <header
      style={css`
        border-bottom: 2px solid #e1e1e1;
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <div
          style={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href='/'>
            <Logo>P</Logo>
          </Link>

          <Buscador />

          <Navegacion />

        </div>

        <div
          style={css`
            display: flex;
            align-items: center;
            margin-top: 2rem;
          `}
        >
          { user ? (
            <>
              <p
                style={css`
                  margin-right: 2rem;
                `}
              >
                Hola {user.displayName}
              </p>
              <Boton bgColor='true'>Cerrar sesión</Boton>
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
        </div>
      </ContenedorHeader>
    </header>
  )
}

export default Header
