import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import useAutenticacion from '../../hooks/useAutenticacion'

const Nav = styled.nav`
  padding-left: 2rem;

  * {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: 'PT Sans', sans-serif;
  }
`

const Navegacion = () => {

  const [usuario, auth] = useAutenticacion()

  return (
    <Nav>
      <Link href='/'>Inicio</Link>      
      <Link href='/populares'>Populares</Link>    
      {usuario && <Link href='/nuevo-producto'>Nuevo Producto</Link> }
    </Nav>
  )
}

export default Navegacion
