import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

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
  return (
    <FormStyle>
      <InputText
        type='text'
        placeholder='Buscar productos'
      />
      <InputSubmit type='submit'></InputSubmit>
    </FormStyle>
  )
}

export default Buscador
