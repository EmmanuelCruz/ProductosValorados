import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

// Firebase
import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firebaseConfig from '../../firebase/config';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';

import styled from '@emotion/styled'
import useAutenticacion from '../../hooks/useAutenticacion';

const HMessage = styled.h1`
  text-align: center;
  margin-top: 5rem;

`

const Comentario = styled.h2`
  margin: 2rem 0;
`

const ContenedorProducto = styled.div`
  @media(min-width: 768px){
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`

const Votos = styled.p`
  text-align: center;
`

const ProductoId = () => {

  const [producto, setProducto] = useState({})
  const [error, setError] = useState(false)

  const router = useRouter()
  const { query: { id } } = router

  const [usuario, auth] = useAutenticacion()

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        app.initializeApp(firebaseConfig)
        const db = app.firestore()
        const query = db.collection('productos').doc(id)
        const producto = await query.get()
        if (producto.exists) {
          setProducto(producto.data())
          setError(false)
        } else {
          setError(true)
        }
      }
      obtenerProducto()
    }
  }, [id])

  const { id: idProducto, creador, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos } = producto

  return (
    <Layout>
      {error && <Error404 />}

      <div className='contenedor'>
        <HMessage> {nombre}</HMessage>

        <ContenedorProducto>
          <div>
            <p>Publicado hace: {formatDistanceToNow(new Date(creado ? creado : null), {
              locale: es
            })}
            </p>
            <p>Por {creador?.nombre} de {empresa}</p>

            <img src={urlImagen} />

            <p>{descripcion}</p>

            { usuario && (
              <>
                <h2>Agrega tu comentario</h2>

                <form>
                  <Campo>
                    <input 
                      type='text'
                      name='mensaje'

                    />
                  </Campo>

                  <InputSubmit
                    type='submit'
                    value='Agregar comentario'
                  />
                </form>
              </>
            )}

            <Comentario>Comentarios</Comentario>

            {comentarios?.map(comentario => (
              <li>
                <p>{comentario.nombre}</p>
                <p>Escrito por: {comentario.usuarionNombre}</p>
              </li>
            ))}
          </div>

          <aside>
            <Boton target='_blank' bgColor='true' href={url}>Visitar URL</Boton>
            
            <Boton>Votar</Boton>
            <Votos>{votos} Votos</Votos>
          </aside>
        </ContenedorProducto>
      </div>
    </Layout>
  )
}

export default ProductoId
