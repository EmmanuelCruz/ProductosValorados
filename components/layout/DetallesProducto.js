import React from 'react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link'

const Imagen = styled.img`
  width: 200px;
`

const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`

const DescripcionProducto = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`

const Titulo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`

const DescripcionTexto = styled.p`
  margin: 0;
  color: #888;
  font-size: 1.6rem;
`

const DetallesProducto = ({ producto }) => {

  const { id, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos } = producto

  return (
    <Producto>
      <DescripcionProducto>
        <div>
          <Imagen src={urlImagen} />
        </div>
        <div>
          <Link href={'/productos/[id]'} as={`/productos/${id}`}>
            <Titulo>{nombre}</Titulo>
          </Link>
          <DescripcionTexto>{descripcion}</DescripcionTexto>
          <div>
            <p>Comentarios: {comentarios.length}</p>
          </div>

          <p>Publicado hace: { formatDistanceToNow(new Date(creado), {
            locale: es
          })}</p>
        </div>
      </DescripcionProducto>
      
      <Votos>
       <div>&#9650;</div> 
       <p>{votos}</p>
      </Votos>
    </Producto>
  )
}

export default DetallesProducto
