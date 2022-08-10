import React from 'react'
import styled from '@emotion/styled'

const ErrorMessage = styled.h1`
  margin-top: 5rem;
  text-align: center;
`

const Error404 = () => {
  return (
    <ErrorMessage>
      Producto no existente
    </ErrorMessage>
  )
}

export default Error404
