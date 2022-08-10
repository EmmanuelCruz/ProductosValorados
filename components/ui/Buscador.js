import React , {useState} from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

const InputText = styled.input`
  border: 1px solid var(--gris2);
  padding: 1rem;
  min-width: 300px;
`

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  background-size: 4rem;
  background-image: url('static/img/buscar.png');
  background-repeat: no-repeat;
  right: 1rem;
  top: 1rem;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`

const FormStyle = styled.form`
  position: relative;
`
const Buscador = () => {

  const [busqueda, setBusqueda] = useState('')

  const router = useRouter()

  const buscarProducto = e => {
    e.preventDefault()

    if(busqueda.trim() === ''){
      return
    }

    router.push({
      pathname: '/buscar',
      query: {
        "busqueda": busqueda.trim()
      }
    })
  }

  return (
    <FormStyle
      onSubmit={buscarProducto}
    >
      <InputText
        type='text'
        placeholder='Buscar productos'
        onChange={e => setBusqueda(e.target.value)}
      />
      <InputSubmit type='submit' value='Buscar' />
    </FormStyle>
  )
}

export default Buscador
