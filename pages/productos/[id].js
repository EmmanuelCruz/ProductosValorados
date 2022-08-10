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

const LiItem = styled.li`
  border: 1px solid #e1e1e1;
  padding: 2rem;
`

const Span = styled.span`
  font-weight: bold;
`

const ProductoId = () => {

  const [producto, setProducto] = useState({})
  const [error, setError] = useState(false)
  const [comentario, setComentario] = useState({})

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

  const { id: idProducto, haVotado, creador, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos } = producto
  
  const votarProducto = () => {
    if(!usuario){
      return router.push('/login')
    }

    const nuevoTotal = votos + 1

    // Verificar si el usuario ya votó
    if(haVotado.includes(usuario.uid)){
      return
    }

    // Actualizar base
    app.initializeApp(firebaseConfig)
    const db = app.firestore()

    const votados = [...haVotado, usuario.uid]

    db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: votados})

    // Actualizar state
    setProducto({
      ...producto,
      votos: nuevoTotal,
      haVotado: votados
    })
  }

  const comentarioChange = e => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value
    })
  }

  const agregarComentario = e => {


    e.preventDefault()
    comentario.usuarioId = usuario.uid
    comentario.usuarioNombre = usuario.displayName

    const nuevosComentarios = [...comentarios, comentario]

    app.initializeApp(firebaseConfig)
    const db = app.firestore()

    db.collection('productos').doc(id).update({comentarios: nuevosComentarios})

    setProducto({
      ...producto,
      comentarios: nuevosComentarios
    })
  }

  const puedeBorrar = () => {
    if(!usuario){
      return false
    }

    if(creador?.id === usuario.uid){
      return true
    }

    return false
  }

  const eliminarProducto = async () => {
    if(!usuario){
      return router.push('/login')
    }
    if(creador?.id !== usuario.uid){
      return router.push('/')
    }
    try {
      app.initializeApp(firebaseConfig)
      const db = app.firestore()

      await db.collection('productos').doc(id).delete()

      router.push('/')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      {error ? (
        <Error404 />
      ): (
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

                  <form
                    onSubmit={agregarComentario}
                  >
                    <Campo>
                      <input 
                        type='text'
                        name='mensaje'
                        onChange={comentarioChange}
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

              {comentarios?.length === 0 && <p>Aún no hay comentarios</p>}

              <ul>
                {comentarios?.map((comentario, i) => (
                  <LiItem key={`${comentario.usuarioId}-${i}`}>
                    <p>{comentario.mensaje}</p>
                    <p>Escrito por: <Span>{comentario.usuarioNombre}</Span></p>
                  </LiItem>
                ))}
              </ul>

            </div>

            <aside>
              <Boton target='_blank' bgColor='true' href={url}>Visitar URL</Boton>
              {usuario && (
                <Boton onClick={votarProducto}>Votar</Boton>
              )}
              <Votos>{votos} Votos</Votos>
            </aside>
          </ContenedorProducto>

          {puedeBorrar() && (
            <Boton onClick={eliminarProducto}>Eliminar producto</Boton>
          )}
        </div>
      )}

    </Layout>
  )
}

export default ProductoId
